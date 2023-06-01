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

    parser.add_argument('--allow_upload', action='store_true')
    return parser.parse_args()

class Dataset:
    def __init__(self, data_dir):
        self.samples_np = np.load(data_dir)
        self.samples = []
        self.length = self.samples_np.shape[0]
        for i in range(self.samples_np.shape[0]):
            self.samples.append(self.samples_np[i])

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
        return jsonify( [{"pose": seq["pose"], "root": seq["root"], "id": id}])

    @app.route('/view/sequence/<id>')
    def view_data(id):
        id = int(id)
        return render_template("sequence.html", num=1, index=id)
   
    @app.route('/gallery')
    def gallery():
        print(dataset.length)
        return render_template("gallery.html", num=dataset.length)

    @app.route('/gallery_viewer')
    def gallery_viewer():
        print(dataset.length)
        return render_template("gallery_viewer.html", num=dataset.length)

    return app


def main(args):
    app = build_app(args)
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.run(debug=True, port=args.port, host='0.0.0.0',
            threaded=False, processes=os.cpu_count())


if __name__ == '__main__':
    main(get_args())
