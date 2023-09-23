import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import * as BufferGeometryUtils  from "https://rawgit.com/mrdoob/three.js/r136/examples/jsm/utils/BufferGeometryUtils.js";

var cylinderMesh_quaternion = function( a, b, cylinder)
{
    // edge from X to Y
    
    // stick has length equal to distance between endpoints
    const distance = a.distanceTo( b )
   
    // stick endpoints define the axis of stick alignment
    const { x:ax, y:ay, z:az } = a
    const { x:bx, y:by, z:bz } = b
    const stickAxis = new THREE.Vector3(bx-ax, by-ay, bz-az).normalize()
    // Use quaternion to rotate cylinder from default to target orientation
    const quaternion = new THREE.Quaternion()
    const cylinderUpAxis = new THREE.Vector3( 0, 1, 0 )
    quaternion.setFromUnitVectors(cylinderUpAxis, stickAxis);


    cylinder.geometry.translate( -1 * cylinder.translate2.x, 
    	-1 * cylinder.translate2.y, 
    	-1 * cylinder.translate2.z
    	);
    cylinder.geometry.applyQuaternion(cylinder.quaternion2.invert());
    cylinder.geometry.applyQuaternion(quaternion);

    cylinder.quaternion2 = quaternion;
    // Translate oriented stick to location between endpoints
    cylinder.geometry.translate((bx+ax)/2, (by+ay)/2, (bz+az)/2);
    cylinder.translate2 = new THREE.Vector3((bx+ax)/2, (by+ay)/2, (bz+az)/2);
   
    return cylinder;
}

var cylinderMesh = function( a, b , color, stickRadius, opacity, use_basic_material)
{
    // edge from X to Y
    
    // stick has length equal to distance between endpoints
    const distance = a.distanceTo( b )
    const cylinder = new THREE.CylinderGeometry(stickRadius, stickRadius, distance)

    // stick endpoints define the axis of stick alignment
    const { x:ax, y:ay, z:az } = a
    const { x:bx, y:by, z:bz } = b
    const stickAxis = new THREE.Vector3(bx-ax, by-ay, bz-az).normalize()
    // Use quaternion to rotate cylinder from default to target orientation
    const quaternion = new THREE.Quaternion()
    const cylinderUpAxis = new THREE.Vector3( 0, 1, 0 )
    quaternion.setFromUnitVectors(cylinderUpAxis, stickAxis)
    cylinder.applyQuaternion(quaternion)

    // Translate oriented stick to location between endpoints
    cylinder.translate((bx+ax)/2, (by+ay)/2, (bz+az)/2);

    var material = new THREE.MeshLambertMaterial( { color: color , transparent: true} );
    if(use_basic_material){
    	material = new THREE.MeshBasicMaterial( { color: color , transparent: true, depthTest:false} );
    }
    
    if(opacity!= null){
    	material.opacity = opacity;
    }
    const mesh = new THREE.Mesh(cylinder, material);
    mesh.quaternion2 = quaternion;
    mesh.translate2 = new THREE.Vector3((bx+ax)/2, (by+ay)/2, (bz+az)/2); 
   
    return mesh;
}

var cubeMesh = function( a, b , color, stickRadius, opacity, use_basic_material)
{
    // edge from X to Y
    
    // stick has length equal to distance between endpoints
    const distance = a.distanceTo( b )
    console.log(distance)
    const cylinder = new THREE.BoxGeometry(distance , distance , distance)

    // stick endpoints define the axis of stick alignment
    const { x:ax, y:ay, z:az } = a
    const { x:bx, y:by, z:bz } = b
    const stickAxis = new THREE.Vector3(bx-ax, by-ay, bz-az).normalize()
    // Use quaternion to rotate cylinder from default to target orientation
    const quaternion = new THREE.Quaternion()
    const cylinderUpAxis = new THREE.Vector3( 0, 1, 0 )
    quaternion.setFromUnitVectors(cylinderUpAxis, stickAxis)
    cylinder.applyQuaternion(quaternion)

    // Translate oriented stick to location between endpoints
    cylinder.translate(bx, by, bz); //(bx+ax)/2, (by+ay)/2, (bz+az)/2)

    var material = new THREE.MeshLambertMaterial( { color: color , transparent: true} );
    if(use_basic_material){
    	material = new THREE.MeshBasicMaterial( { color: color , transparent: true, depthTest:false} );
    }
    if(opacity!= null){
    	material.opacity = true;
    }
    const mesh = new THREE.Mesh(cylinder, material);
   
    return mesh;
}

var floorMesh = function( distance , a, b, floor, color, stickRadius, texture)
{
    // edge from X to Y
    
    // stick has length equal to distance between endpoints

    const cylinder = new THREE.BoxGeometry(distance , 0.01 , distance)

    // stick endpoints define the axis of stick alignment
    const { x:ax, y:ay, z:az } = a
	const { x:bx, y:by, z:bz } = b
    // Translate oriented stick to location between endpoints
    cylinder.translate((bx+ax)/2, floor, (by+ay)/2);
    const material = new THREE.MeshBasicMaterial()

    const mesh = new THREE.Mesh(cylinder, material);
   	
    return mesh;
}

var sphereMesh_quaternion = function( a, b , cylinder)
{
    // edge from X to Y
    
    // stick has length equal to distance between endpoints
    
    // stick endpoints define the axis of stick alignment
    const { x:ax, y:ay, z:az } = a
    const { x:bx, y:by, z:bz } = b
    const stickAxis = new THREE.Vector3(bx-ax, by-ay, bz-az).normalize()
    // Use quaternion to rotate cylinder from default to target orientation
    const quaternion = new THREE.Quaternion()
    const cylinderUpAxis = new THREE.Vector3( 0, 1, 0 )
    quaternion.setFromUnitVectors(cylinderUpAxis, stickAxis);


    cylinder.geometry.translate( -1 * cylinder.translate2.x, 
    	-1 * cylinder.translate2.y, 
    	-1 * cylinder.translate2.z
    	);
    cylinder.geometry.applyQuaternion(cylinder.quaternion2.invert());
    cylinder.geometry.applyQuaternion(quaternion);

    cylinder.quaternion2 = quaternion;
    // Translate oriented stick to location between endpoints
    cylinder.geometry.translate((bx+ax)/2, (by+ay)/2, (bz+az)/2);
    cylinder.translate2 = new THREE.Vector3((bx+ax)/2, (by+ay)/2, (bz+az)/2);
   
    return cylinder;
}

var sphereMesh = function( a, b , color, stickRadius, opacity, use_basic_material)
{
    // edge from X to Y
    
    // stick has length equal to distance between endpoints
    var distance = a.distanceTo( b )
    if(stickRadius > -1){
    	distance = stickRadius;
    }
    const cylinder = new THREE.SphereGeometry(distance , 5, 5);

    // stick endpoints define the axis of stick alignment
    const { x:ax, y:ay, z:az } = a
    const { x:bx, y:by, z:bz } = b
    const stickAxis = new THREE.Vector3(bx-ax, by-ay, bz-az).normalize()
    // Use quaternion to rotate cylinder from default to target orientation
    const quaternion = new THREE.Quaternion()
    const cylinderUpAxis = new THREE.Vector3( 0, 1, 0 )
    quaternion.setFromUnitVectors(cylinderUpAxis, stickAxis)
    cylinder.applyQuaternion(quaternion)

    // Translate oriented stick to location between endpoints
    cylinder.translate((bx+ax)/2, (by+ay)/2, (bz+az)/2)

    var material = new THREE.MeshLambertMaterial( { color: color, transparent: true } );
    if(use_basic_material){
    	material = new THREE.MeshBasicMaterial( { color: color, transparent: true, depthTest:false } );
    }
    
    if(opacity!= null){
    	material.opacity = opacity;
    }
    const mesh = new THREE.Mesh(cylinder, material);
    mesh.quaternion2 = quaternion;
    mesh.translate2 = new THREE.Vector3((bx+ax)/2, (by+ay)/2, (bz+az)/2); 
   
   
    return mesh;
}

var sphereMesh2 = function( a, b , color, stickRadius, opacity, use_basic_material)
{
    // edge from X to Y
    
    // stick has length equal to distance between endpoints
    var distance = a.distanceTo( b )
    if(stickRadius > -1){
    	distance = stickRadius;
    }
    const cylinder = new THREE.SphereGeometry(distance , 5, 5);
    // stick endpoints define the axis of stick alignment
    const { x:ax, y:ay, z:az } = a
    const { x:bx, y:by, z:bz } = b
    const stickAxis = new THREE.Vector3(bx-ax, by-ay, bz-az).normalize()
    // Use quaternion to rotate cylinder from default to target orientation
    const quaternion = new THREE.Quaternion()
    const cylinderUpAxis = new THREE.Vector3( 0, 1, 0 )
    quaternion.setFromUnitVectors(cylinderUpAxis, stickAxis)
    cylinder.applyQuaternion(quaternion)

    // Translate oriented stick to location between endpoints
    cylinder.translate(bx, by, bz);
    var material = new THREE.MeshLambertMaterial( { color: color, transparent:true } );
    if(use_basic_material){
    	material = new THREE.MeshBasicMaterial( { color: color, transparent:true , depthTest:false} );
    }
   
    if(opacity!= null){
    	material.opacity = opacity;
    }
    const mesh = new THREE.Mesh(cylinder, material);
    mesh.quaternion2 = quaternion;
    mesh.translate2 = new THREE.Vector3((bx+ax)/2, (by+ay)/2, (bz+az)/2); 
   
   
    return mesh;
}

var sphereMesh2_quaternion = function( a, b , cylinder)
{
    // edge from X to Y
    
    // stick has length equal to distance between endpoints
    
    // stick endpoints define the axis of stick alignment
    const { x:ax, y:ay, z:az } = a
    const { x:bx, y:by, z:bz } = b
    const stickAxis = new THREE.Vector3(bx-ax, by-ay, bz-az).normalize()
    // Use quaternion to rotate cylinder from default to target orientation
    const quaternion = new THREE.Quaternion()
    const cylinderUpAxis = new THREE.Vector3( 0, 1, 0 )
    quaternion.setFromUnitVectors(cylinderUpAxis, stickAxis)
    cylinder.geometry.translate( -1 * cylinder.translate2.x, 
    	-1 * cylinder.translate2.y, 
    	-1 * cylinder.translate2.z
    	);
    cylinder.geometry.applyQuaternion(cylinder.quaternion2.invert());
    cylinder.geometry.applyQuaternion(quaternion);

    cylinder.quaternion2 = quaternion;
    // Translate oriented stick to location between endpoints
    cylinder.geometry.translate((bx+ax)/2, (by+ay)/2, (bz+az)/2);
    cylinder.translate2 = new THREE.Vector3((bx+ax)/2, (by+ay)/2, (bz+az)/2);
   
   
    return cylinder;
}


var coneMesh = function( a, b , color, stickRadius, opacity, use_basic_material)
{
    // edge from X to Y
    
    // stick has length equal to distance between endpoints
    const distance = a.distanceTo( b )
    const cylinder = new THREE.ConeGeometry(stickRadius, distance, 5)

    // stick endpoints define the axis of stick alignment
    const { x:ax, y:ay, z:az } = a
    const { x:bx, y:by, z:bz } = b
    const stickAxis = new THREE.Vector3(bx-ax, by-ay, bz-az).normalize()
    // Use quaternion to rotate cylinder from default to target orientation
    const quaternion = new THREE.Quaternion()
    const cylinderUpAxis = new THREE.Vector3( 0, -1, 0 )
    quaternion.setFromUnitVectors(cylinderUpAxis, stickAxis)
    cylinder.applyQuaternion(quaternion)

    // Translate oriented stick to location between endpoints
    cylinder.translate((bx+ax)/2, (by+ay)/2, (bz+az)/2);

    var material = new THREE.MeshLambertMaterial( { color: color, transparent: true } );
    if(use_basic_material){
    	material = new THREE.MeshBasicMaterial( { color: color, transparent: true , depthTest:false} );
    }
    if(opacity!= null){
    	material.opacity = opacity;
    }
    const mesh = new THREE.Mesh(cylinder, material);
    mesh.quaternion2 = quaternion;
    mesh.translate2 = new THREE.Vector3((bx+ax)/2, (by+ay)/2, (bz+az)/2); 
   
   
    return mesh;
}

var coneMesh_quaternion = function( a, b , cylinder)
{
    // edge from X to Y
    
    // stick has length equal to distance between endpoints
    const distance = a.distanceTo( b )
    
    // stick endpoints define the axis of stick alignment
    const { x:ax, y:ay, z:az } = a
    const { x:bx, y:by, z:bz } = b
    const stickAxis = new THREE.Vector3(bx-ax, by-ay, bz-az).normalize()
    // Use quaternion to rotate cylinder from default to target orientation
    const quaternion = new THREE.Quaternion()
    const cylinderUpAxis = new THREE.Vector3( 0, -1, 0 )
    quaternion.setFromUnitVectors(cylinderUpAxis, stickAxis)
    
    cylinder.geometry.translate( -1 * cylinder.translate2.x, 
    	-1 * cylinder.translate2.y, 
    	-1 * cylinder.translate2.z
    	);
    cylinder.geometry.applyQuaternion(cylinder.quaternion2.invert());
    cylinder.geometry.applyQuaternion(quaternion);

    cylinder.quaternion2 = quaternion;
    // Translate oriented stick to location between endpoints
    cylinder.geometry.translate((bx+ax)/2, (by+ay)/2, (bz+az)/2);
    cylinder.translate2 = new THREE.Vector3((bx+ax)/2, (by+ay)/2, (bz+az)/2);
   
    return cylinder;
}

var texture =  new THREE.TextureLoader().load( "/static/checkerboard.png");
var floor_texture = function() {
	
	texture.wrapS =  THREE.RepeatWrapping ;
	texture.wrapT =  THREE.RepeatWrapping ;
	texture.repeat = new THREE.Vector2(50, 50);
	return texture;
}

var texture = floor_texture();


export class MeshSample {
	constructor(file, ind, frames, joints, pause_on_frame, root, mesh_diffs){
		this.file = file;
		this.ind = ind;
		this.frames = frames;
		this.tot_frames = frames;
		this.joints = joints;
		this.minx = 0;
		this.maxx = 0;
		this.miny = 0;
		this.maxy = 0;
		this.minz = 0;
		this.maxz = 0;
		this.centerx = 0;
		this.centery = 0;
		this.centerz = 0;
                this.miny_floor = -1.145793;
		this.groups = [];
		this.pause_counter = 0;
		this.pause = false;
		this.one_cycle_done = false;
		this.pause_on_frame = pause_on_frame;
		this.add = [];
		this.delete = [];
                this.label = "";
		this.roots = root;
		this.pairs = [];
		this.ims = [];
                this.diff_start = 1;//ind * 1240200;
		for(var i = 0; i < this.tot_frames; i++){
			this.ims.push(null);
		}
		this.get_mins_maxs();
		this.joints_per_pose = 22;
		this.meshes = [];
		this.counter = 0;
		this.color = "";
		this.c = 1;
		this.add_test = [];
                this.flash_frame = -1;
                this.joint_diffs = [];
		self = this;
                this.manager = new THREE.LoadingManager();
		this.manager.onLoad = function () {
			self.loadModel(self);
		}
		this.object;
		this.mapping = {};
		this.set_floor = false;
	}

	copy() {
		var n = new MeshSample(this.file, this.ind, this.frames, this.joints, this.embed);
		n.joint_diffs = this.joint_diffs;
		n.one_cycle_done = this.one_cycle_done;
		//n.ims = this.ims;
		n.counter = this.counter;
		n.pause = this.pause;
		n.roots = this.roots;
		n.pause_on_frame = this.pause_on_frame;
	        n.label = this.label;
                n.flash_frame = this.flash_frame;
        	return n;
	}

	clear_ims(){
		for(var i = 0; i < this.tot_frames; i++){
			this.ims[i] = null;
		}
	}

	get_mins_maxs(){
		var minx = 10000;
		var miny = 10000;
		var minz = 10000;

		var maxx = -10000;
		var maxy = -10000;
		var maxz = -10000;
		for(var i = 0; i < this.joints.length; i += 1){
                   for(var j = 0; j < this.joints[i].length; j += 1){
                      
			var x = this.joints[i][j][0];
			var y = this.joints[i][j][1];
			var z = this.joints[i][j][2];

			minx = Math.min(x, minx);
			miny = Math.min(y, miny);
			minz = Math.min(z, minz);

			maxx = Math.max(x, maxx);
			maxy = Math.max(y, maxy);
			maxz = Math.max(z, maxz);
                    }
		}

		this.minx = minx;
		this.miny = miny;
		this.minz = minz;

		this.maxx = maxx;
		this.maxy = maxy;
		this.maxz = maxz;

		this.centerx = (minx + maxx) / 2;
		this.centery = (miny + maxy) / 2;
		this.centerz = (minz + maxz) / 2;
		this.og;
	        //console.log(this.joints)
        }


	make_floor(spheres) {
		var leftankle = 10;
		var rightankle = 11;
        	var floor = floorMesh(100, spheres[leftankle].position, spheres[rightankle].position, 0.0);
		floor.material.map = texture;
  	        floor.material.map.needsUpdate = true;

		return [floor];
	}

    loadModel(scope) {
        //const material = new THREE.MeshLambertMaterial({color: 0xFFC0CB})
	//scope.object.traverse( function ( child ) {
  	//	child.material = material;

	//} );

    }

   

    load(manager,self, i, onProgress, onError){
        const loader = new OBJLoader( manager );
        
	self.object = new THREE.BoxGeometry(5, 5, 5);
	const material = new THREE.MeshBasicMaterial()

        const mesh = new THREE.Mesh(self.object, material);
	
        loader.load( '/static/meshes/' + i.toString() + '.obj', function ( obj ) {
        	self.object = obj;

                // DELETE NORMALS
                let attr = self.object.children[0].geometry.getAttribute("normal");
                delete attr.array;
                delete self.object.children[0].geometry.attributes["normal"];

                // SWITCH TO INDEX GEOM
		self.object.children[0].geometry = BufferGeometryUtils.mergeVertices(self.object.children[0].geometry);

		self.object.children[0].geometry.computeVertexNormals();		

                const material = new THREE.MeshLambertMaterial({color: 0x049ef4})
                self.object.traverse( function ( child ) {
                    child.material = material;
        
                } );
		// ADD TO SCENE
		self.groups[0].add(self.object);

		// MAKE TEMPLATE
		self.og = self.object.children[0].geometry.getAttribute("position").clone();
		self.index_obj(self);
		//self.load_diffs(self);
                self.load_binary_diffs(self)
	}, onProgress, onError );
    }

    load_diffs(self){
        console.log("load diffs");
	var client = new XMLHttpRequest();
        client.open('GET', '/static/mesh_diffs.txt');
        client.onreadystatechange = function() {
            let text = client.responseText.split("\n");
            let counter = 0;
            let frames = []; 
	    for(var i = 0; i < 60; i++){
                for(var j = 0; j < 6890; j++) {
                    frames.push( parseFloat(text[counter]));
		    frames.push( parseFloat(text[counter + 1]));
		    frames.push( parseFloat(text[counter + 2]));
		    counter += 3;
                }
            }
            
	    self.joint_diffs = frames;
        }
        client.send();
    }

    load_binary_diffs(self){
        var file = "/static/data/meshdiff" + self.ind.toString() + ".bn"
	var float_data = [];
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, true);
	rawFile.responseType = "arraybuffer";
	rawFile.overrideMimeType('text\/plain; charset=x-user-defined');

	rawFile.onreadystatechange = function (){
            if(rawFile.readyState === 4){
                if(rawFile.status === 200 || rawFile.status == 0){
                    var buf = rawFile.response;
                    float_data = new Float32Array(buf);
                    self.joint_diffs = float_data;     
	        }
            }
        }
	rawFile.send(null);
	return float_data;
 
    }


    index_obj(self){
	console.log("indexing object")
        var client = new XMLHttpRequest();
        
        client.open('GET', '/static/template_obj.txt');
        client.onreadystatechange = function() {
            let text = client.responseText.split("\n");
            let counter = 0;
            let obj_verts = {};
            let precision = 4; 
	    for (var i = 0; i < text.length; i+=3) {
		let x = parseFloat(text[i]);
		let y = parseFloat(text[i + 1]);
		let z = parseFloat(text[i + 2]);
		obj_verts[ x.toFixed(precision) + "_" + y.toFixed(precision) + "_"+ z.toFixed(precision) ] = i / 3
 	    }
            const positionAttribute = self.object.children[0].geometry.attributes.position;
            const vertex = new THREE.Vector3();
	    let threejs_verts = {}
            for (let vertexIndex = 0; vertexIndex < positionAttribute.count; vertexIndex ++) {
                vertex.fromBufferAttribute(positionAttribute, vertexIndex);
	        let key = vertex.x.toFixed(precision) + "_" + vertex.y.toFixed(precision) + "_" + vertex.z.toFixed(precision);
	        threejs_verts[key] = vertexIndex;
		if(obj_verts[key]){ self.mapping[vertexIndex] = obj_verts[key]; };
	    }
	}
        client.send();

    }

    onProgress( xhr ) {

	if ( xhr.lengthComputable ) {

		const percentComplete = xhr.loaded / xhr.total * 100;
		console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );

		}

	}

    onError(msg) { console.log(msg) }

    joints_to_objects_vis( radius, pairs, color, opacity, use_basic_material){
        var counter = 0;
        var meshes = [];
        var spheres_frame0 = [];
       
        this.groups.push(new THREE.Group());
	var spheres = [];
        meshes.push([]);

        for(var i = 0; i < this.joints_per_pose; i++){
            const geometry = new THREE.SphereGeometry( radius, 1, 1 );
            var material = new THREE.MeshLambertMaterial( { color: color, transparent:true} );
            if(use_basic_material){
                material = new THREE.MeshBasicMaterial( { color: color, transparent:true} );
            }
            
            if(opacity != null){
                material.opacity = opacity;
            }
            const sphere = new THREE.Mesh( geometry, material );
            
            sphere.position.set(this.joints[0][i][0], this.joints[0][i][2], this.joints[0][i][1]);
            spheres.push( sphere );
            spheres_frame0.push(sphere);
        }
        
        var LEFT_BONES = [ [0,2],[2,5],[5,8],[8,11],[9,14],[14,17],[17,19],[19,21]]
        var RIGHT_BONES = [ [0,1],[1,4],[4,7],[7,10],[9,13],[13,16],[16,18],[18,20]]
        var MID_BONES = [[0,3],[3,6],[6,9],[9,12]]
	
        for(var j = 0; j < pairs.length; j++){
             var ind0 = pairs[j][0] ;
             var ind1 = pairs[j][1];
		var tmpcolor = color;
		
		for(var k = 0; k < LEFT_BONES.length; k++){
			if(ind0 == LEFT_BONES[k][0] && ind1 == LEFT_BONES[k][1]){
				tmpcolor = "orange";
				break;
			} else if (ind1 == LEFT_BONES[k][0] && ind0 == LEFT_BONES[k][1]){
				tmpcolor = "orange";
				break;
			}
		}	
		for(var k = 0; k < RIGHT_BONES.length; k++){
                        if(ind0 == RIGHT_BONES[k][0] && ind1 ==RIGHT_BONES[k][1]){
                                tmpcolor = "green";
                                break;
                        } else if (ind1 == RIGHT_BONES[k][0] && ind0 == RIGHT_BONES[k][1]){
                                tmpcolor = "green";
                                break;
                        }
                }
		 for(var k = 0; k < MID_BONES.length; k++){
                        if(ind0 == MID_BONES[k][0] && ind1 ==MID_BONES[k][1]){
                                tmpcolor = "pink";
                                break;
                        } else if (ind1 == MID_BONES[k][0] && ind0 == MID_BONES[k][1]){
                                tmpcolor = "pink";
                                break;
                        }
                }
            var cylinder = cylinderMesh(spheres[ind0].position, spheres[ind1].position, tmpcolor, 0.01, opacity, use_basic_material);
             cylinder.limb_color = tmpcolor;
             spheres.push(cylinder);
        }
        this.load(this.manager,this,  0, this.onProgress, this.onError);
        meshes[0] = spheres;

        this.groups.push(new THREE.Group());
        var floor = this.make_floor(spheres_frame0);
        this.groups[1].add(floor[0]);

        this.meshes = meshes;
        this.pairs = pairs;
        this.add_test = [this.groups[0], this.groups[1]];
	return meshes;
    }

	center_and_scale(group, matchpos, scale, mtind){
		var y = 0;
		var x = 0;
		
		group.scale.set(scale, scale, scale);

		var newpos = new THREE.Vector3();
		if(group.children.length > 0){
			group.children[mtind].getWorldPosition(newpos);
		}
	}

	uncenter_and_unscale(group, matchpos, scale, mtind) {
		var y = 0;
		var x = 0;
		var newpos = new THREE.Vector3();
		if(group.children.length > 0){
			group.children[mtind].getWorldPosition(newpos);
		}
		group.scale.set(1.0 / scale, 1.0 / scale, 1.0 / scale);

	}

	joints_to_objects_vis2( frame, pairs){
                this.add_test = [];
		var meshes = [];
		if( this.joint_diffs[0] && !this.set_floor){
			this.set_floor = true;
			this.groups[1].children[0].position.set(0, this.joint_diffs[0], 0);        
		}
		if(this.joint_diffs.length == 1240201 && Object.keys(self.mapping).length >= 6800){
			const positionAttribute = this.object.children[0].geometry.attributes.position;
	                const vertex = new THREE.Vector3();
			const og_vertex = new THREE.Vector3();
			//frame = 0;
			let start = 6890 * 3 * frame + this.diff_start;
			let counter = 0
                        for (let vertexIndex = 0; vertexIndex < positionAttribute.count; vertexIndex ++) {
				og_vertex.fromBufferAttribute(this.og, vertexIndex);
				vertex.fromBufferAttribute(positionAttribute, vertexIndex);
			 	// check mapping from vertex -> obj_vertex
				let obj_vert = this.mapping[vertexIndex];
				if (!obj_vert){
					obj_vert = this.mapping[0];
					//continue;
				}
				// get obj_vertex index from joint_diffs
				let obj_vertex_index = start + obj_vert * 3
				
				if( isNaN(this.joint_diffs[obj_vertex_index ]) || isNaN(this.joint_diffs[obj_vertex_index + 1]) || isNaN(this.joint_diffs[obj_vertex_index + 2]) ){
					
					break;
				}
				positionAttribute.setXYZ(vertexIndex, og_vertex.x + this.joint_diffs[obj_vertex_index ],
				     og_vertex.y + this.joint_diffs[obj_vertex_index + 1], og_vertex.z + this.joint_diffs[obj_vertex_index +2]);
			}
			positionAttribute.needsUpdate = true;

          	}

		

		/**	
		var spheres_frame0 = [];
		var a = frame;
		var counter = (a * this.joints_per_pose) * 3;
		var body = this.groups[0].children;
		
		var body_index = 0;
		for(var i = 0; i < this.joints_per_pose; i++){
                    body[body_index].position.set(this.joints[frame][i][0], this.joints[frame][i][1], this.joints[frame][i][2]);
	  		body_index += 1;
		}
                
                for(var j = 0; j < pairs.length; j++){
			var ind0 = pairs[j][0];
			var ind1  =pairs[j][1];		
		
		 	body[body_index] = cylinderMesh_quaternion(body[ind0].position, body[ind1].position, body[body_index]);
		 	body_index += 1;	
		}
		**/
		return meshes;
	}


	cleanup(){
		for(var rm = 0; rm < this.groups.length; rm++){
			for(var k =0; k < this.groups[rm].children.length; k++){
				this.groups[rm].children[k].geometry.dispose();
				this.groups[rm].children[k].material.dispose();
				this.groups[rm].remove(this.groups[rm].children[k]);
			}
			this.delete.push(this.groups[rm]);
		}
		this.groups = [];
		this.meshes = [];
	}

	update(timestep) {
		if(this.meshes[timestep] == 0){
			return;
		}

		this.add = [this.groups[timestep]];
	}

	clear(rm) {
		rm = 0;
		this.delete = [];
		for(var k =0; k < this.groups[rm].children.length; k++){
			this.groups[rm].children[k].geometry.dispose();
			this.groups[rm].children[k].material.dispose();
		}
		this.delete.push(this.groups[rm]);
	}

	step(force_pause){
		var add_timestep = this.counter;
		this.joints_to_objects_vis2(this.counter, this.pairs)
		
		var delete_timestep = this.counter - 1;
		if (this.counter - 1 < 0){
			delete_timestep = this.tot_frames - 1;
		}

		if(!force_pause){
			this.counter += 1;
		} else if(force_pause && this.pause_on_frame) {
			this.counter = this.pause_on_frame;
		}
		if(this.counter >= this.tot_frames) {
			this.pause_counter += 1;
			if(this.pause_counter > 10 ){
				this.pause_counter = 0;
				this.counter = 0;
				this.one_cycle_done = true;
			} else {
				this.counter -= 1;
			}
		}
	}

	step_logical(){

		var add_timestep = this.counter;
		
		if(this.pause){
			return;
		}

		this.counter += 1;
		if(this.counter >= this.tot_frames) {
			this.pause_counter += 1;
			if(this.pause_counter > 10 ){
				this.pause_counter = 0;
				this.counter = 0;
			} else {
				this.counter -= 1;
			}
		}
		
	}
}
