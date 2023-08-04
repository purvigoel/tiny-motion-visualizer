import {SceneWrapper} from "./scenewrapper.js"
import {ThreeWrapper} from "./threewrapper.js";
import {VisualExplorer_Gallery} from './visual_explorer_gallery.js';

var FRAMES = 100;
var numvis = 1;
var scenewrapper = 0;
var clusterwrapper = null;
var canvas = 0;
var threewrapper = 0;
var clusters = 0;
var scene_width = -1;
var scene_height = -1;
var visual_explorer_gallery = null;

export class Viewer {
constructor() {
	this.start_paused = false;
	var global = this;
	this.name_to_frames = null;
	document.addEventListener('keyup', function(e) {
		e = e || window.event;
		if(e.keyCode == 80){
			global.start_paused = !global.start_paused;
			if(global.start_paused) {
				
			}
		}
		e.preventDefault();
		return false;
	});

	this.global_spacebars = [];
}

set_up_scene_visual(is_single, camloc){
	threewrapper = new ThreeWrapper(scene_width, scene_height);
	visual_explorer_gallery = new VisualExplorer_Gallery(0,0, is_single, camloc);
	
}

onKeyPress(event, global){
	if(event.code == 'Space'){
		global.start_paused = !global.start_paused;
		if(global.start_paused) {
			if(name_to_frames){

			}
			//reassign frames
		}
	}
}


set_up_data(){
	var numvis = 1;
	scenewrapper = new SceneWrapper(scene_width, scene_height, numvis, FRAMES, false, threewrapper);
//	scenewrapper.make_motion_sample(scenewrapper, data, numvis, visual_explorer_gallery);

}

load(data, name_to_frames, labels, flash_frames) {
        console.log(data, name_to_frames, flash_frames)
	this.name_to_frames = name_to_frames;
        scenewrapper.make_motion_sample(scenewrapper, data, numvis, visual_explorer_gallery, name_to_frames, labels, flash_frames);
}

log_spacebar() {
	var current_frames = visual_explorer_gallery.get_current_frame();
	this.global_spacebars.push(current_frames[0]);
	console.log(this.global_spacebars)
	var text = "";
	for(var i = 1; i < this.global_spacebars.length; i++){
		text += "("+ this.global_spacebars[i-1].toString() + " " + this.global_spacebars[i].toString() + ") ";
	}
	document.getElementById("intervals").value = text;
}

clear_list() {
	document.getElementById("intervals").value = "";
	this.global_spacebars = [];
}

restart() {
	visual_explorer_gallery.restart();
}

serve(is_single, start_paused){
	scene_width = 300;
	scene_height = 300;
	this.start_paused = start_paused;
//	set_up_scene_visual(is_single);
//	set_up_data(data.pose, scene_width, scene_height, 1);
	var global = this;
	var fps = 30;
	var fpsInterval = 1000 / fps;
	var then = Date.now();
	var startTime = then;
	var proceed = true;

	function animate() {
		requestAnimationFrame( animate );
		
                var now = Date.now();
		var elapsed = now - then;
		if ( elapsed > fpsInterval && proceed ) {
			then = now - (elapsed % fpsInterval);
		        visual_explorer_gallery.step(global.start_paused);
		}
	};
	animate();

}

}
