import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';

//import { EffectComposer } from 'three/addons/postprocessing//EffectComposer.js';

//import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

//import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';

//import { CopyShader } from 'three/addons/shaders/CopyShader.js';

export class ThreeWrapper {
	constructor(width, height){
		this.width = width;
		this.height = height;
		this.camera = 0;
		this.renderer = 0;
		this.controls = 0;

		this.composer = 0;
		this.outlinePass = 0;
		this.outlinePass2 = 0;
		this.div = "select"
		//this.init_scene();
	}

	init_scene() {
		this.init_scene_object();
		this.init_scene_background();

		this.composer = new EffectComposer(this.renderer);
		this.composer.setSize( this.width,this.height );

        var renderPass = new RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);

        this.outlinePass = new OutlinePass(new THREE.Vector2(this.width, this.height), this.scene, this.camera);
        this.outlinePass.edgeStrength = 5;
        this.outlinePass.edgeThickness = 1;
        this.outlinePass.visibleEdgeColor.set("#ffffff");
        this.outlinePass.hiddenEdgeColor.set("#ffffff");
        this.outlinePass.overlayMaterial.blending = THREE.SubtractiveBlending;

        this.composer.addPass(this.outlinePass);

        this.outlinePass2 = new OutlinePass(new THREE.Vector2(this.width, this.height), this.scene, this.camera);
        this.outlinePass2.edgeStrength = 5;
        this.outlinePass2.edgeThickness = 1;
        this.outlinePass2.visibleEdgeColor.set("#ffff00");
        this.outlinePass2.hiddenEdgeColor.set("#ffff00");
        this.outlinePass2.overlayMaterial.blending = THREE.SubtractiveBlending;

        this.composer.addPass(this.outlinePass2);

        var outputPass = new ShaderPass( CopyShader );
        outputPass.renderToScreen = true;
		this.composer.addPass( outputPass );
	}

	init_scene_object(){
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color( "white" );
	}

	cleanup(){

	}

	init_light() {
		const light = new THREE.PointLight(0xffffff, 1)
		light.position.set(0, -30, 3)
		this.scene.add(light);
	}

	init_camera(width, height, div) {
		this.camera = new THREE.PerspectiveCamera( 45, width / height, 0.1, 1000 );

		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize( width, height );
		document.getElementById(div).appendChild( this.renderer.domElement );
		
		this.camera.position.y = 0;
		this.camera.position.x = 0;
		this.camera.position.z = -1;

		this.camera.lookAt(new THREE.Vector3(0, 0, 0));
		this.camera.up = new THREE.Vector3(0, 1, 0);

		this.controls = new OrbitControls( this.camera, this.renderer.domElement );
		this.controls.enableDamping = true;
		this.controls.target.set( 0, 0, 0 );
		this.controls.enablePan = false;

	}
	init_scene_background() {
		this.init_light();
		this.init_camera(this.width, this.height, this.div);
	}

}
