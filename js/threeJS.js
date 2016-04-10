var camera, scene, renderer;

var cube, plane, pyramid;

var cubeContainer = document.getElementById("renderCube");
var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var windowHalfX = window.innerWidth / 4;
var windowHalfY = window.innerHeight / 4;
var current_shape = 'cube';

// function to render a cube
//renderCube(120);

// 3 segments for a 3-sided pyramid
//renderPyramid(100,100,3);

// 4 segments for a 4-sided pyramid
//renderPyramid(100,100,4);

//animate();

function renderCube(dimension) {
	

	current_shape = 'cube';

	container = document.createElement( 'div' );
	container.style.marginTop = "-65px";
	
	while (cubeContainer.firstChild) {
		console.log("cube removing child"+cubeContainer.firstChild);
		cubeContainer.removeChild(cubeContainer.firstChild);
	}
	
	cubeContainer.appendChild( container );
	
	camera = new THREE.PerspectiveCamera(50, window.innerWidth /window.innerHeight, 1, 700);
	camera.position.y = 300;
	camera.position.z = 250;

	scene = new THREE.Scene();

	// Cube
	//set the dimensions here using user input
	var geometry = new THREE.BoxGeometry(dimension, dimension, dimension);

	for (var i = 0; i < geometry.faces.length; i++) {
		geometry.faces[i].color.setHex(0x000000);
	}

	var material = new THREE.MeshBasicMaterial({
		overdraw: 0.5,
		wireframe: true,
		vertexColors: THREE.FaceColors
	});

	cube = new THREE.Mesh(geometry, material);
	// var wf = new THREE.WireframeHelper(cube);
	// wf.material.color.setRGB(0, 0, 0);
	cube.position.y = 300;

	var egh = new THREE.EdgesHelper(cube, 0x000000 );
	egh.material.linewidth = 5;
	//cube.position.x = -50;
	scene.add( egh );
	scene.add(cube);
	// scene.add(wf);

	// Plane
	geometry = new THREE.PlaneBufferGeometry(dimension, dimension);
	geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

	material = new THREE.MeshBasicMaterial({
		color: 0xe0e0e0,
		overdraw: 0.5
	});

	plane = new THREE.Mesh(geometry, material);
	plane.position.y = 200;
	scene.add(plane);

	renderer = new THREE.CanvasRenderer();
	renderer.setClearColor(0xffffff);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth/3, window.innerHeight/3);
	
	cubeContainer.appendChild(renderer.domElement);

	cubeContainer.addEventListener('mousedown', onDocumentMouseDown, false);
	cubeContainer.addEventListener('touchstart', onDocumentTouchStart, false);
	cubeContainer.addEventListener('touchmove', onDocumentTouchMove, false);

	window.addEventListener('resize', onWindowResize, false);

	animate();
}

function renderPyramid(bottomRadius,height,segments) {
	current_shape = 'pyramid';
	//cubeContainer = document.getElementById("pyramid"+segments);
	container = document.createElement( 'div' );
	container.style.marginTop = "-65px";
	
	while (cubeContainer.firstChild) {
		console.log("pyramid removing child"+cubeContainer.firstChild);
		cubeContainer.removeChild(cubeContainer.firstChild);
	}
	
	cubeContainer.appendChild( container );

	camera = new THREE.PerspectiveCamera(50, window.innerWidth /window.innerHeight, 1, 700);
	camera.position.y = 300;
	camera.position.z = 250;

	scene = new THREE.Scene();

	// Pyramid
	// CylinderGeometry(radiusTop,radiusBottom,height,segments,openEnded)
	var geometry = new THREE.CylinderGeometry(0,bottomRadius,height,segments,false);

	for (var i = 0; i < geometry.faces.length; i++) {
		geometry.faces[i].color.setHex(0x000000);
	}

	var material = new THREE.MeshBasicMaterial({
		overdraw: 0.5,
		wireframe: true,
		vertexColors: THREE.FaceColors
	});

	pyramid = new THREE.Mesh(geometry, material);
	pyramid.position.y = 300;
	var wf = new THREE.WireframeHelper( pyramid , 0x000000 );
	scene.add(pyramid);
	scene.add(wf);

	// Plane
	geometry = new THREE.PlaneBufferGeometry(1.5 * bottomRadius, 1.5 * bottomRadius);
	geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

	material = new THREE.MeshBasicMaterial({
		color: 0xe0e0e0,
		overdraw: 0.5
	});

	plane = new THREE.Mesh(geometry, material);
	plane.position.y = 200;
	scene.add(plane);

	renderer = new THREE.CanvasRenderer();
	//renderer.setIdAttribute("canvasID",true);
	renderer.setClearColor(0xffffff);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth/3, window.innerHeight/3);
	cubeContainer.appendChild(renderer.domElement);

	cubeContainer.addEventListener('mousedown', onDocumentMouseDown, false);
	cubeContainer.addEventListener('touchstart', onDocumentTouchStart, false);
	cubeContainer.addEventListener('touchmove', onDocumentTouchMove, false);

	window.addEventListener('resize', onWindowResize, false);

	animate();
}



function onWindowResize() {
	windowHalfX = window.innerWidth / 4;
	windowHalfY = window.innerHeight / 4;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth/3, window.innerHeight/3);

}


function onDocumentMouseDown(event) {

	event.preventDefault();

	cubeContainer.addEventListener('mousemove', onDocumentMouseMove, false);
	cubeContainer.addEventListener('mouseup', onDocumentMouseUp, false);
	cubeContainer.addEventListener('mouseout', onDocumentMouseOut, false);

	mouseXOnMouseDown = event.clientX - windowHalfX;
	targetRotationOnMouseDown = targetRotation;

}

function onDocumentMouseMove(event) {
	mouseX = event.clientX - windowHalfX;
	targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.02;
}

function onDocumentMouseUp(event) {
	cubeContainer.removeEventListener('mousemove', onDocumentMouseMove, false);
	cubeContainer.removeEventListener('mouseup', onDocumentMouseUp, false);
	cubeContainer.removeEventListener('mouseout', onDocumentMouseOut, false);
}

function onDocumentMouseOut(event) {

	cubeContainer.removeEventListener('mousemove', onDocumentMouseMove, false);
	cubeContainer.removeEventListener('mouseup', onDocumentMouseUp, false);
	cubeContainer.removeEventListener('mouseout', onDocumentMouseOut, false);

}

function onDocumentTouchStart(event) {

	if (event.touches.length === 1) {
		event.preventDefault();
		mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
		targetRotationOnMouseDown = targetRotation;

	}

}

function onDocumentTouchMove(event) {

	if (event.touches.length === 1) {
		event.preventDefault();
		mouseX = event.touches[0].pageX - windowHalfX;
		targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.05;
	}

}

//

function animate() {
	requestAnimationFrame(animate);
	render();
}

function render() {
	if(current_shape == 'cube')
	{
		plane.rotation.y = cube.rotation.y += (targetRotation - cube.rotation.y) * 0.05;	
	}
	else if (current_shape == 'pyramid') {
		plane.rotation.y = pyramid.rotation.y += (targetRotation - pyramid.rotation.y) * 0.05;
	}
	
	renderer.render(scene, camera);

}