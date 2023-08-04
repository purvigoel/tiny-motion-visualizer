import * as THREE from 'three';

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

var floorMesh = function( distance , a, b, color, stickRadius, texture)
{
    // edge from X to Y
    
    // stick has length equal to distance between endpoints

    const cylinder = new THREE.BoxGeometry(distance , 0.01 , distance)

    // stick endpoints define the axis of stick alignment
    const { x:ax, y:ay, z:az } = a
	const { x:bx, y:by, z:bz } = b
    // Translate oriented stick to location between endpoints
    cylinder.translate((bx+ax)/2, -1, (by+ay)/2);
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


export class MotionSample {
	constructor(file, ind, frames, joints, pause_on_frame, root){
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
	}

	copy() {
		var n = new MotionSample(this.file, this.ind, this.frames, this.joints, this.embed);
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
	        //console.log(this.joints)
        }

	make_human(spheres, pairs, color, opacity, use_basic_material) {
                console.log(spheres)
		var jointcolor = new THREE.Color().copy(color);
		jointcolor = jointcolor.lerp(new THREE.Color("#FFF"), .0);
		// head 
		var chest = 2;
		var head = 3;
		var headmesh = sphereMesh(spheres[chest].position, spheres[head].position, color, -1, opacity, use_basic_material);


		var midchest = 20;
		var neckmesh = sphereMesh(spheres[midchest].position, spheres[chest].position, jointcolor, 0.05, opacity, use_basic_material);

		var endtorso = 0;
		var torsomesh = coneMesh(spheres[endtorso].position, spheres[midchest].position, color, 0.1, opacity, use_basic_material);


		var midtorso = 1;
		var torsomesh2 = coneMesh(spheres[midtorso].position, spheres[endtorso].position, color, 0.1, opacity, use_basic_material);

		var lefthip = 16;
		var leftknee = 17;
		var leftquadmesh = coneMesh(spheres[leftknee].position, spheres[lefthip].position, color, 0.05, opacity, use_basic_material);

		var righthip = 12;
		var rightknee = 13;
		var rightquadmesh = coneMesh(spheres[rightknee].position, spheres[righthip].position, color, 0.05, opacity, use_basic_material);
		
		var leftshoulder = 8;
		var leftelbow = 9;
		var leftforearm_mesh = coneMesh(spheres[leftelbow].position, spheres[leftshoulder].position, color, 0.04, opacity, use_basic_material);

		var rightshoulder = 4;
		var rightelbow = 5;
		var rightforearm_mesh = coneMesh(spheres[rightelbow].position, spheres[rightshoulder].position, color, 0.04, opacity, use_basic_material);

		var right_collarbone = sphereMesh2(spheres[midchest].position, spheres[rightshoulder].position, jointcolor, 0.05, opacity, use_basic_material);
		var left_collarbone = sphereMesh2(spheres[midchest].position, spheres[leftshoulder].position, jointcolor, 0.05, opacity, use_basic_material)

		var right_hip = sphereMesh2(spheres[endtorso].position, spheres[righthip].position, jointcolor, 0.03, opacity, use_basic_material);
		var left_hip = sphereMesh2(spheres[endtorso].position, spheres[lefthip].position, jointcolor, 0.03, opacity, use_basic_material)

		

		return [headmesh, neckmesh, torsomesh, torsomesh2, leftquadmesh, rightquadmesh, leftforearm_mesh, rightforearm_mesh,
		right_collarbone, left_collarbone, right_hip, left_hip];
	}

	move_human(body, body_index) {
		
		// head 
		var chest = 2;
		var head = 3;

		var headmesh = sphereMesh_quaternion(body[chest].position, body[head].position, body[body_index]);
		body_index+=1;

		var midchest = 20;
		var neckmesh = sphereMesh_quaternion(body[midchest].position, body[chest].position, body[body_index]);
		body_index+=1;
		var endtorso = 0;
		var torsomesh = coneMesh_quaternion(body[endtorso].position, body[midchest].position, body[body_index]);
		body_index+=1;

		var midtorso = 1;
		var torsomesh2 = coneMesh_quaternion(body[midtorso].position, body[endtorso].position,body[body_index]);
		body_index+=1;
		
		var lefthip = 16;
		var leftknee = 17;
		var leftquadmesh = coneMesh_quaternion(body[leftknee].position, body[lefthip].position, body[body_index]);
		body_index+=1;
		var righthip = 12;
		var rightknee = 13;
		var rightquadmesh = coneMesh_quaternion(body[rightknee].position, body[righthip].position,body[body_index]);
		body_index+=1;
		var leftshoulder = 8;
		var leftelbow = 9;
		var leftforearm_mesh = coneMesh_quaternion(body[leftelbow].position, body[leftshoulder].position,body[body_index]);
		body_index+=1;
		var rightshoulder = 4;
		var rightelbow = 5;
		var rightforearm_mesh = coneMesh_quaternion(body[rightelbow].position, body[rightshoulder].position, body[body_index]);
		body_index+=1;
		var right_collarbone = sphereMesh2_quaternion(body[midchest].position, body[rightshoulder].position, body[body_index]);
		body_index+=1;
		var left_collarbone = sphereMesh2_quaternion(body[midchest].position, body[leftshoulder].position, body[body_index])
		body_index+=1;
		var right_hip = sphereMesh2_quaternion(body[endtorso].position, body[righthip].position,body[body_index]);
		body_index+=1;
		
		var left_hip = sphereMesh2_quaternion(body[endtorso].position, body[lefthip].position,body[body_index]);
		

		return [headmesh, neckmesh, torsomesh, torsomesh2, leftquadmesh, rightquadmesh, leftforearm_mesh, rightforearm_mesh,
		right_collarbone, left_collarbone, right_hip, left_hip, ];
	}

	make_floor(spheres) {
		var leftankle = 8;
		var rightankle = 7;
        	var floor = floorMesh(100, spheres[leftankle].position, spheres[rightankle].position);
		floor.material.map = texture;
  	        floor.material.map.needsUpdate = true;

		return [floor];
	}

	joints_to_objects_vis_dep( radius, pairs, color, opacity, use_basic_material){
		var counter = 0;
		var meshes = [];

		var spheres_frame0 = [];
		for(var a = 0; a < 1; a++){
		//for(var a = 0; a < this.frames; a++){
			this.groups.push(new THREE.Group());
			
			var spheres = [];
			meshes.push([]);
			for(var i = a * this.joints_per_pose; i < a * this.joints_per_pose + this.joints_per_pose; i++){
				const geometry = new THREE.SphereGeometry( radius, 1, 1 );
				var material = new THREE.MeshLambertMaterial( { color: color, transparent:true} );
				if(use_basic_material){
					material = new THREE.MeshBasicMaterial( { color: color, transparent:true} );
				}
				
				if(opacity != null){
					material.opacity = opacity;
				}
				const sphere = new THREE.Mesh( geometry, material );
				
				sphere.position.set(this.joints[counter], this.joints[counter + 1], this.joints[counter + 2]);
				
				spheres.push( sphere );
				if(a == 0){
					spheres_frame0.push(sphere);
				}
				this.groups[a].add(sphere);				
				counter += 3;
			}
			for(var j = 0; j < pairs.length; k++){
			//for(var j = 0; j < this.joints_per_pose; j++){
			//	var ind0 = j ;
			//	var ind1 = pairs[j] - 1;
			//	if(ind0 == 0  || ind1 == 0){
			//		continue;
			//	}
                                var ind0 = pairs[j][0];
                                var ind1 = pairs[j][1];
				var cylinder = cylinderMesh(spheres[ind0].position, spheres[ind1].position, tmpcolor, 0.01, opacity, use_basic_material);
				spheres.push(cylinder);
				this.groups[a].add(cylinder);			
			}
			var threejs_color = new THREE.Color(color);
			var human_meshes = this.make_human(spheres, pairs, threejs_color, opacity, use_basic_material);

			for(var j = 0; j < human_meshes.length; j++){
				spheres.push(human_meshes[j]);
				this.groups[a].add(human_meshes[j]);
			}
			
			meshes[a] = spheres;
		}
        this.groups.push(new THREE.Group());
        var floor = this.make_floor(spheres_frame0);
        //console.log(floor)
        this.groups[1].add(floor[0]);
        
		this.meshes = meshes;
		this.pairs = pairs;
		this.add_test = [this.groups[0], this.groups[1]];
        return meshes;
	}

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
            
            this.groups[0].add(sphere);             
        }
        
        // this.pairs = [[0, 2], [2, 5], [5, 8], [8, 11], [0, 1], [1, 4], [4, 7], [7, 10], [0, 3], [3,6],[6,9],[9,14], [14,17],[17,19],[19,21],[9,13],[13,16],[16,18],[18,20],[9, 12], [12,15]]
        var LEFT_BONES = [ [0,2],[2,5],[5,8],[8,11],[9,14],[14,17],[17,19],[19,21]]
        var RIGHT_BONES = [ [0,1],[1,4],[4,7],[7,10],[9,13],[13,16],[16,18],[18,20]]
        var MID_BONES = [[0,3],[3,6],[6,9],[9,12]]
	//var MID_BONES = [[11, 12]]
	//var LEFT_BONES = [[0,1], [1,3],[3,5],[5, 0], [7, 5], [9, 7], [11, 5], [13, 11], [15, 13]];
	//var RIGHT_BONES = [[0,2],[2,4],[4,6],[6, 0], [8, 6], [10, 8], [12, 6], [14, 12], [16, 14]];

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
             this.groups[0].add(cylinder);           
        }

         
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
		// group.translateX(-1 * matchpos.x);
		// group.translateY(-1 * matchpos.y);
		// group.translateZ(-1 * matchpos.z);

		group.scale.set(scale, scale, scale);

		var newpos = new THREE.Vector3();
		if(group.children.length > 0){
			group.children[mtind].getWorldPosition(newpos);
			// group.translateX(-1 * newpos.x + x);
			// group.translateY(-1 * newpos.y + y);
			// group.translateZ(-1 * newpos.z - 0.1);
		}
	}

	uncenter_and_unscale(group, matchpos, scale, mtind) {
		var y = 0;
		var x = 0;
		var newpos = new THREE.Vector3();
		if(group.children.length > 0){
			group.children[mtind].getWorldPosition(newpos);
			// group.translateX( newpos.x + x);
			// group.translateY( newpos.y + y);
			// group.translateZ( newpos.z + 0.1);
		}
		group.scale.set(1.0 / scale, 1.0 / scale, 1.0 / scale);

		// group.translateX( matchpos.x);
		// group.translateY( matchpos.y);
		// group.translateZ( matchpos.z);
	}

	joints_to_objects_vis2( frame, pairs){
        this.add_test = [];
		
		var meshes = [];
		
		var spheres_frame0 = [];
		var a = frame;
		var counter = (a * this.joints_per_pose) * 3;
		var body = this.groups[0].children;
		//this.uncenter_and_unscale(this.groups[0], new THREE.Vector3(this.joints[3], this.joints[4], this.joints[5]), 0.75, 1); 

		var body_index = 0;
		for(var i = 0; i < this.joints_per_pose; i++){
                               body[body_index].position.set(this.joints[frame][i][0], this.joints[frame][i][1], this.joints[frame][i][2]);
	  		body_index += 1;
		}
                
                for(var j = 0; j < pairs.length; j++){
			var ind0 = pairs[j][0];
			var ind1  =pairs[j][1];		
		// for(var j = 0; j < this.joints_per_pose; j++){
		// 	var ind0 = j ;
		// 	var ind1 = pairs[j] - 1;
		// 	if(ind0 == 0  || ind1 == 0){
		// 		continue;
		// 	}
                        //if(frame == 0){
                        //    body[body_index].material.color.set("red");
                        //} else if(frame == this.flash_frame){
                        //    body[body_index].material.color.set("blue");
                        //} else {
                        //    body[body_index].material.color.set(body[body_index].limb_color);
                        //}

                       

		 	body[body_index] = cylinderMesh_quaternion(body[ind0].position, body[ind1].position, body[body_index]);
		 	body_index += 1;	
		}
		//this.center_and_scale(this.groups[0], new THREE.Vector3(this.joints[3], this.joints[4], this.joints[5]), 0.75, 1); 
		//this.move_human(body, body_index)

		
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
		//if(this.pause){
		//	return;
		//}
		var add_timestep = this.counter;
		this.joints_to_objects_vis2(this.counter, this.pairs)
		
		var delete_timestep = this.counter - 1;
		if (this.counter - 1 < 0){
			delete_timestep = this.tot_frames - 1;
		}

		//if(this.pause){
		//	return;
		//}
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
