import {GalleryRenderer} from './gallery_renderer.js';
export class VisualExplorer_Gallery {
	constructor(width, height, is_single){
		this.width = width;
		this.height = height;
		is_single = false;
		this.is_single = is_single;
		this.div = document.getElementById("explore");
		this.gallery_renderer = new GalleryRenderer("explore-gallery");
		this.samples = [];
	}
	
	restart() {
		for(var i =0; i < this.samples.length; i++){
			this.gallery_renderer.visible_samples[i].counter = 0;
		}
	}

	get_current_frame() {
		var current_frames = [];
		for( var i = 0; i < this.samples.length; i++) {
		
			current_frames.push(this.gallery_renderer.visible_samples[i].counter);
		}
		return current_frames;
	}

	add_class_panel(x, y, width, height, offsety, offsetx, paddingy, paddingx, sample) {
		var newdiv = document.createElement("div");
		newdiv.className = "sample_explore";
		newdiv.style.top = (y + offsety + paddingy).toString() + "px";
		newdiv.style.left = (x + offsetx + paddingx).toString() + "px";
		newdiv.style.width = width.toString() + "px";
		newdiv.style.height = height.toString() + "px";
		
		if(sample){
			newdiv.sample = sample.copy();
		}
		
		const att = document.createAttribute("explore-gallery");
		newdiv.setAttributeNode(att);

		var global = this;

		this.div.appendChild(newdiv);
		return newdiv;
	}

	add_gallery_panel(newdiv, x, y, width, height, offsety, offsetx, paddingy, paddingx, sample, id) {
		newdiv.style.top = (y + offsety + paddingy).toString() + "px";
                newdiv.style.left = (x + offsetx + paddingx).toString() + "px";
                newdiv.style.width = width.toString() + "px";
                newdiv.style.height = height.toString() + "px";
                if(sample){
                        newdiv.sample = sample.copy();
                }

                const att = document.createAttribute("explore-gallery");
                newdiv.setAttributeNode(att);
		return newdiv;

	}

	show(show_sample) {
		console.log("show")
                var samples = this.samples;
		var width = 125;
		var height = 175;
		var cols = 4;
		var paddingx = 30;
		var paddingy = 30;

		var counter = 0;
		var divs = [];
		var render_info = [];

		//var total = samples.length
		//total = Math.min(total, 16);
		//var gallery_rows = Math.ceil(Math.sqrt(total));
		//if(total == 1){
		//	gallery_rows = 1;
		//}
		//cols = gallery_rows;
		if(this.is_single){
			var width_dynamic = document.getElementById("explore").offsetWidth * 0.75 / gallery_rows;
			var height_dynamic = document.getElementById("explore").offsetHeight* 0.75 / gallery_rows;
			width_dynamic = document.getElementById("explore").offsetWidth;
			height_dynamic = document.getElementById("explore").offsetHeight;
		
		} else {
			width_dynamic = 250;
			height_dynamic = 325;
		}
		var paddingx_dynamic = (paddingx / width) * width_dynamic;
		var paddingy_dynamic = (paddingy / height) * height_dynamic;
		paddingx_dynamic = 10;
		paddingy_dynamic = 10;
		for(var j = 0; j < samples.length; j++) {

			var sample = samples[j];
			
			var row = Math.floor( counter / cols);
			var col = counter % cols;

			if(samples.length == 1){
			var div = this.add_class_panel( (width_dynamic + paddingx_dynamic) * col, 
				(height_dynamic + paddingy_dynamic) * row, 
				width_dynamic, height_dynamic, 
				20, 5, paddingy_dynamic, paddingx_dynamic,
				sample);
			} else {
				console.log(sample.file)
				var div = this.add_gallery_panel(document.getElementById(sample.file), (width_dynamic + paddingx_dynamic) * col,
                                (height_dynamic + paddingy_dynamic) * row,
                                width_dynamic, height_dynamic,
                                20, 5, paddingy_dynamic, paddingx_dynamic,
                                sample, j);
			}
			counter += 1;

			divs.push(div);
			render_info.push({use_basic_material: true, color: "blue", pause:false, opacity: 1.0})
		}
		console.log(render_info.length)
		this.gallery_renderer.show(divs, render_info);
	}

	removeChildren() {
		const boxes = document.querySelectorAll('.sample_explore');

		boxes.forEach(box => {
		  box.remove();
		});

		this.gallery_renderer.cleanup_gallery();
	}

	hide() {
  		if(this.shown){
  			this.removeChildren();
  			this.shown = false;
  		}
  	}

  	show_canvas(show_sample) {
  		//if(!this.shown){
  			this.show(show_sample);
  			this.shown = true;
  		//}
  	}

  	step(force_pause) {
  		if(this.shown){
			this.gallery_renderer.step(force_pause);
		}
  	}
}

