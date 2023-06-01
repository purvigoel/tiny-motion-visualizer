import * as THREE from 'three';
import { FirstPersonControls } from 'FirstPersonControls';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';

import { EffectComposer } from 'three/addons/postprocessing//EffectComposer.js';

import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';

import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';

import { CopyShader } from 'three/addons/shaders/CopyShader.js';

export class GalleryRenderer {
	constructor(div_attr, sample_attr) {
		this.pause = false;
		this.visible_samples = [];
		this.sceneObjects = [];
		this.sceneElements = [];
		this.div_attr = div_attr;
		this.skeleton_radius = 0.01;
		//this.pairs =  [2, 1, 21, 3 ,21, 5, 6, 7, 21 ,9 ,10 ,11 ,1 ,13 ,14 ,15, 1, 17 ,18 ,19 ,2 ,8 ,8 ,12, 12];
		//this.pairs = [ [15, 13], [13,11], [16,14], [14,12],[11,12], [5,11], [6,12],[5,6],[5,7],[6,8],[7,9],[8,10],[1,2],[0,1],[0,2],[1,3],[2,4],[3,5],[4,6]]
		this.pairs = [[0, 2], [2, 5], [5, 8], [8, 11], [0, 1], [1, 4], [4, 7], [7, 10], [0, 3], [3,6],[6,9],[9,14], [14,17],[17,19],[19,21],[9,13],[13,16],[16,18],[18,20],[9, 12], [12,15]]
                var canvas = document.createElement('canvas');
		this.renderer = new THREE.WebGLRenderer({canvas, alpha: true, antialias:true});
		this.renderer.setScissorTest(true);

		this.sceneInitFunctionsByName = {
		    'single': (elem, sample) => {
		      const {scene, camera, controls, drop} = this.makeScene(elem, sample);
		      var c = 1;
		      return (time, rect, pause) => {
		      	//if(!pause){
	      			for(var k =0; k < sample.add_test.length; k++){
						scene.add(sample.add_test[k]);
					}

	      			sample.step(pause);
			        var curr_frame = sample.counter;

					for(var k =0; k < sample.add.length; k++){
						scene.add(sample.add[k]);
					}
					for(var k =0; k < sample.delete.length; k++){
						scene.remove(sample.delete[k]);
					}
			        camera.aspect = rect.width / rect.height;
			        camera.updateProjectionMatrix();
			        controls.update();

			        this.renderer.render(scene, camera);
					return this.renderer.domElement;
			//    }
		      };
		    },
		}
	}


	cleanup_gallery() {
		this.pause = true;

		if(Array.isArray(this.visible_samples)) {
			for(var i = 0; i < this.visible_samples.length; i++){
				for(var j = 0; j < this.visible_samples[i].length; j++){
					var rm = this.visible_samples[i][j].counter - 1;
					if (rm - 1 < 0){
						rm = this.visible_samples[i][j].frames - 1;
					}
					this.visible_samples[i][j].clear(rm);
					this.visible_samples[i][j].cleanup();

					for(var k =0; k < this.visible_samples[i][j].delete.length; k++){
						this.sceneObjects[i].remove(this.visible_samples[i][j].delete[k]);
					}
				}
			}

		} else {
			for(var i = 0; i < this.visible_samples.length; i++){
				var rm = this.visible_samples[i].counter - 1;
				if (rm - 1 < 0){
					rm = this.visible_samples[i].frames - 1;
				}
				this.visible_samples[i].clear(rm);
				this.visible_samples[i].cleanup();

				for(var k =0; k < this.visible_samples[i].delete.length; k++){
					this.sceneObjects[i].remove(this.visible_samples[i].delete[k]);
				}
			}
		}

		this.visible_samples = [];
		this.sceneElements = [];
		this.sceneObjects = [];

		document.querySelectorAll("[" + this.div_attr + "]").forEach((elem, i) => {
		    elem.remove();
		  });
		

		this.pause = false;
	}

	addScene(elem, fn) {
	    const ctx = document.createElement('canvas').getContext('2d');
	    elem.appendChild(ctx.canvas);
	    this.sceneElements.push({elem, ctx, fn});
	}

	add_scene_gallery(){
		var global = this;
		document.querySelectorAll("[" + this.div_attr + "]").forEach((elem, i) => {

			const sceneName = "single";
		    const sceneInitFunction = this.sceneInitFunctionsByName[sceneName];
		    const sceneRenderFunction = sceneInitFunction(elem, this.visible_samples[i]);
		    global.addScene(elem, sceneRenderFunction);

		});
	}

	get_motion_sample_objs(motion_sample, render_info){
		var y = 0;
		var x = 0;
		var scale = 0.75;
		var mtind = 1;

		motion_sample.joints_to_objects_vis(this.skeleton_radius,
		 this.pairs, render_info.color, render_info.opacity, render_info.use_basic_material);

		motion_sample.pause = render_info.pause;
		return motion_sample;
	}

	show(all_motion_samples, render_info){
		for(var i = 0; i < all_motion_samples.length; i++){
			var motion_sample = this.get_motion_sample_objs(all_motion_samples[i].sample, render_info[i]);
			this.visible_samples.push(motion_sample);
		}
		
		this.add_scene_gallery();
	}

	step(pause){
		this.pause = pause;
		//if(this.pause){
		//	return;
		//}

		var time = 1;
	    for (const {elem, fn, ctx} of this.sceneElements) {
	      // get the viewport relative position opf this element
	      const rect = elem.getBoundingClientRect();
	      const {left, right, top, bottom, width, height} = rect;
	      const rendererCanvas = this.renderer.domElement;

	      const isOffscreen =
	          bottom < 0 ||
	          top > window.innerHeight ||
	          right < 0 ||
	          left > window.innerWidth;

	      if (!isOffscreen) {

	        this.renderer.setSize(width, height, false);
	        //}

	        // make sure the canvas for this area is the same size as the area
	        if (ctx.canvas.width !== width || ctx.canvas.height !== height) {
	          ctx.canvas.width = width;
	          ctx.canvas.height = height;
	        }

	        this.renderer.setScissor(0, 0, width, height);
	        this.renderer.setViewport(0, 0, width, height);

	        var img = fn(time, rect, this.pause);
	        if(img){
	        	ctx.clearRect(0, 0, width, height);
			    ctx.drawImage(img,
				    0, 0, img.width, img.height,  // src rect
		            0, 0, width, height);
			} 
	      }
	    }
	}

	make_composer(renderer, scene, camera, width, height) {
		this.renderer.setSize(width, height, false);
		var composer = new EffectComposer(this.renderer);
		composer.setSize( width,height );

        var renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);

        var outlinePass = new OutlinePass(new THREE.Vector2(width, height), scene, camera);
        outlinePass.edgeStrength = 3;
        outlinePass.edgeThickness = 1;
        outlinePass.visibleEdgeColor.set("#ff0000");
        outlinePass.hiddenEdgeColor.set("#ff0000");
        //outlinePass.overlayMaterial.blending = THREE.SubtractiveBlending;

        composer.addPass(outlinePass);


        var fxaaPass = new ShaderPass( FXAAShader );

		var pixelRatio = renderer.getPixelRatio();
		var uniforms = fxaaPass.material.uniforms;

		uniforms[ 'resolution' ].value.x = 1 / ( width * pixelRatio );
		uniforms[ 'resolution' ].value.y = 1 / ( height * pixelRatio );
		fxaaPass.renderToScreen = true;
        //var outputPass = new ShaderPass( CopyShader );
        //outputPass.renderToScreen = true;
		composer.addPass( fxaaPass );
		return composer;
	}

	makeScene(elem, sample) {
	    const scene = new THREE.Scene();
	    
	    const fov = 45;
	    const aspect = 1;  // the canvas default
	    const near = 0.1;
	    const far = 10;
	    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	    //camera.position.set(0, 1, 6.0);
	    //camera.lookAt(0, 1, 0);
            console.log(sample.centerx, sample.centery, sample.centerz);
            camera.position.set( sample.centerx, sample.centery , sample.centerz + 6);
            camera.lookAt(sample.centerx, sample.centery, sample.centerz);

	    scene.add(camera);
	    this.sceneObjects.push(scene);
	    const controls = new OrbitControls(camera, elem);
	    controls.noPan = true;
	    controls.target = new THREE.Vector3(sample.centerx, sample.centery, sample.centerz); //new THREE.Vector3(0, 1, 0);
            controls.update();

	    {
	      const color = 0xFFFFFF;
	      const intensity = 1;
	      const light = new THREE.DirectionalLight(color, intensity);
	      light.position.set(-1, 2, -4);
	      scene.add(light);
	    }

	    const rect = elem.getBoundingClientRect();
	    const {left, right, top, bottom, width, height} = rect;
	    var composer = this.make_composer(this.renderer, scene, camera, width, height); 
	    return {scene, camera, controls, composer};
	}
}
