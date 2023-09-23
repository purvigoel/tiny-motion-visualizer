#mporting flask module in the project is mandatory
# An object of Flask class is our WSGI application.
from flask import Flask
from flask import (Flask, Response, send_file, render_template, jsonify,
                   request)
#from flask_compress import Compress
import argparse
import pickle
#import cv2
from io import BytesIO
from PIL import Image
import os
import random
import numpy as np
from util.io import load_gz_json, load_pickle, store_gz_json
from util.body import Pose
import cv2

def get_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('-d', '--dataset_name', default='poses.npy')
    parser.add_argument('-p', '--port', type=int, default=9000)
    parser.add_argument('-c', '--camloc', type=float, default=6.0)
    parser.add_argument('--allow_upload', action='store_true')
    return parser.parse_args()

class Dataset:
    def __init__(self, data_dir):
        self.samples_np = np.load(data_dir)
        self.samples = []
        self.length = self.samples_np.shape[0]
        for i in range(self.samples_np.shape[0]):
            self.samples.append(self.samples_np[i])

        self.meshes_np = np.fromfile("../meshdiff.bn", dtype=np.float32).tolist()
        print("len", len(self.meshes_np))
        self.meshes = []

        self.edit_names = []
        with open("../edit_names.txt", "r") as f:
            lines = f.readlines()
            for line in lines:
                self.edit_names.append(line)
        
        self.labels = []
                     
        print(data_dir + "_labels.txt")
        if os.path.exists(data_dir + "_labels.txt"):
            with open( data_dir + "_labels.txt", "r") as f:
                lines = f.readlines()
                for line in lines:
                    self.labels.append(line)

    def get(self,id):
        return self.samples[id]
    
    def get_sequence(self, id, splice=False):
        seq = self.samples[int(id)]
        root_fake = np.zeros((self.samples_np.shape[1], 3))
        
        return {"pose": seq.tolist(), "root": root_fake.tolist()}

def build_app(args):
    app = Flask(__name__, template_folder='templates',
                static_folder='static')


    data_root = "train"
    ds = Dataset(args.dataset_name)
    global dataset
    dataset = ds
    corrections = {}
    @app.route('/')
    # ‘/’ URL is bound with hello_world() function.
    def hello_world():
        sequences = []
        for ind, seq in enumerate(dataset.samples):
            sequences.append( (ind, ind) )
        return render_template(
            "root.html",
            sequences = sequences)


    @app.route('/data/sequence/<id>')
    def get_seq( id):
        id = int(id)
        seq = dataset.get_sequence(id)
        label = id #dataset.edit_names[ id % 16 ] 
        flash_frame = -1
        if len(dataset.labels) > 0:
            label = dataset.labels[id]
            flash_frame = -1 #label.split()
            #if(len(flash_frame) == 4):
            #    flash_frame = int(flash_frame[3])
            #else:
            #    flash_frame = -1
        return jsonify( [{"pose": seq["pose"], "root": seq["root"], "id": id, "label": label, "flash_frame": flash_frame}])

    @app.route('/view/sequence/<id>')
    def view_data(id):
        id = int(id)
        return render_template("sequence.html", num=1, index=id)
   
    @app.route('/gallery')
    def gallery():
        print(dataset.length)
        return render_template("gallery.html", num=dataset.length, camloc = args.camloc)

    @app.route('/edit')
    def edit():
        print(dataset.length)
        return render_template("anim_edit.html", num=dataset.length, camloc = args.camloc, diffs=1)

    @app.route('/pose_gallery')
    def pose_gallery():
        print(dataset.length)
        return render_template("pose_gallery.html", num=dataset.length, camloc = args.camloc)

    @app.route('/gallery_viewer')
    def gallery_viewer():
        print(dataset.length)
        return render_template("gallery_viewer.html", num=dataset.length, camloc = args.camloc)

    return app


def main(args):
    app = build_app(args)
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.run(debug=True, port=args.port, host='0.0.0.0',
            threaded=False, processes=os.cpu_count())


if __name__ == '__main__':
    main(get_args())
