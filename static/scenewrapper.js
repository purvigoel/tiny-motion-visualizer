import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {readBinaryFile} from "./filehandler.js";
import {MotionSample} from "./motion_sample.js";
import {ThreeWrapper} from "./threewrapper.js";

export class SceneWrapper {
	constructor(width, height, numvis, frames, threewrapper){
		this.width = width;
		this.height = height;
		this.camera = threewrapper.camera;
		this.renderer = threewrapper.renderer;
		this.controls = threewrapper.controls;
		this.scene = threewrapper.scene;
		this.currvis = 0;
		
		this.pause = false;
		this.mouse = {x : 0, y : 0};
		this.numsamples = 0;
		this.samples = [];
		this.visible_samples = [];
		this.drawn = false;

		//this.pairs =  [2, 1, 21, 3 ,21, 5, 6, 7, 21 ,9 ,10 ,11 ,1 ,13 ,14 ,15, 1, 17 ,18 ,19 ,2 ,8 ,8 ,12, 12];
		//this.pairs = [ [15, 13], [13,11], [16,14], [14,12], [11,12], [5,11], [6,12],[5,6],[5,7],[6,8],[7,9],[8,10],[1,2],[0,1],[0,2],[1,3],[2,4],[3,5],[4,6]]
                this.pairs = [[0, 2], [2, 5], [5, 8], [8, 11], [0, 1], [1, 4], [4, 7], [7, 10], [0, 3], [3,6],[6,9],[9,14], [14,17],[17,19],[19,21],[9,13],[13,16],[16,18],[18,20],[9, 12], [12,15]]
		this.skeleton_color = "blue";
		this.skeleton_radius = 0.01;

	}

	cleanup_walkers(){
		this.pause = true;
		for(var i = 0; i < this.visible_samples.length; i++){
			var rm = this.visible_samples[i].counter - 1;
			if (rm - 1 < 0){
				rm = this.visible_samples[i].frames - 1;
			}
			this.visible_samples[i].clear(rm);
			this.visible_samples[i].cleanup();
			for(var k =0; k < this.visible_samples[i].delete.length; k++){
				this.scene.remove(this.visible_samples[i].delete[k]);
			}
		}
		this.visible_samples = [];
		this.pause = false;
	}
	
	get_current_frame() {
		var current_frames = [];
		for(var i = 0; i < this.visible_samples.length; i++){
			current_frames.push(this.visible_samples[i].counter);
		}
		return current_frames;
	}	

	step(){

		if(!this.pause){
			for(var i = 0; i < this.visible_samples.length; i++){
				this.visible_samples[i].step();

				for(var k =0; k < this.visible_samples[i].add.length; k++){

					this.scene.add(this.visible_samples[i].add[k]);

				}
				
				for(var k =0; k < this.visible_samples[i].delete.length; k++){
					this.scene.remove(this.visible_samples[i].delete[k]);
				}
			}
			this.renderer.render( this.scene, this.camera );
		}
	}

	bytes_to_joints(bytes, numsamples, gallery){
		var counter = 0;
		for (var j = 0; j < numsamples; j++){
			var frames = bytes[counter];
			counter += 1;
			var jointnum = bytes[counter];
			counter += 1;
			var drop = bytes[counter];
			counter += 1;
			var joints = [];
			var advance = 0;
			
			for(var i = counter; i < counter + frames * jointnum * 3; i++){
				joints.push(bytes[i]);
				advance += 1;
			}
			counter += advance;
			
			var motion_sample = new MotionSample(j, j, frames, joints);
			
			this.numsamples += 1;

		
			motion_sample.joints_to_objects_vis(this.skeleton_radius, this.pairs, this.skeleton_color);
                        motion_sample.label = "hello"
                        this.visible_samples.push(motion_sample);
			
			this.samples.push(motion_sample);
			
		}
		gallery.samples = this.samples;
		gallery.show_canvas();
		return {"frames": bytes[0], "joints": joints}
	}

	data_to_joints(pose, numsamples, gallery, name_to_frame, labels, flash_frames){
		var counter = 0;
                //var frames = pose.length;
		var jointnum = pose[0].pose[0].length;
                console.log("numsamples:" + numsamples)
                console.log(pose.length)
	        console.log("jointnum:" + jointnum)
                console.log(flash_frames)	
                for (var j = 0; j < numsamples; j++){
	 		var frames = pose[j].pose.length;
			var joints = pose[j].pose;
			for(var r = 0; r < frames; r++)
				for(var n = 0; n < joints[r].length; n++){{
					joints[r][n][0] += pose[j].root[r][0];
					joints[r][n][1] += pose[j].root[r][1];
					joints[r][n][2] += pose[j].root[r][2];
					if(name_to_frame){
						var pause_on_frame = name_to_frame[pose[j].id];
						joints[r][n][0] -= pose[j].root[pause_on_frame][0];
						joints[r][n][1] -= pose[j].root[pause_on_frame][1];
						joints[r][n][2] -= pose[j].root[pause_on_frame][2];
					
					}
				}
			}
			var motion_sample = new MotionSample(pose[j].id, j, frames, joints, pose[j].root);
			
			this.numsamples += 1;

		
			motion_sample.joints_to_objects_vis(this.skeleton_radius, this.pairs, this.skeleton_color);
			if(name_to_frame){
				var pause_on_frame = name_to_frame[pose[j].id];
				motion_sample.counter = pause_on_frame;
				motion_sample.pause = true;
				motion_sample.pause_on_frame = pause_on_frame;
			}
                        if(labels == null){
  				var label = "";
			} else {
				var label = labels[j];
			}
                        if(flash_frames != null){
                               motion_sample.flash_frame = flash_frames[j];
                        }
                        motion_sample.label = label;
			this.visible_samples.push(motion_sample);
			
			this.samples.push(motion_sample);
			
		}
		gallery.samples = this.samples;
		gallery.show_canvas();
		if(name_to_frame){
			gallery.pause = true;
		}
		return {"frames": frames, "joints": joints}
	}

	bytes_to_joints_callback(global, bn_file, numsamples, gallery, show_sample){
		var motion_samples = global.bytes_to_joints(bn_file, numsamples, gallery, show_sample);
	}

	make_motion_sample(global, data, numsamples, gallery, show_sample, labels, flash_frames){
		global.data_to_joints(data, data.length, gallery, show_sample, labels, flash_frames);
	}

	hide(){
		this.scene.visible = false;
	}

	show() {
		this.scene.visible = true;
	}
}
