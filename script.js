
var scene, camera, renderer, car, cars = [], kar, box, water,wall,wal, Froggroup;
var ambientLight, light;
var score=0;
init();
update();
function init() {
	scene = new THREE.Scene();
	scene.background = new THREE.TextureLoader().load('skyyyy.png');
	ambientLight = new THREE.AmbientLight(0xffffff, 0.4); //(white color, intensity)
	scene.add(ambientLight);

	light = new THREE.PointLight(0xffffff, 0.8, 1000); //(color,intensity,distance,decay)
	light.position.set(-3, 10, -20);

	scene.add(light);
	

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.set(0, 4, 6.5);
	
////////Textures/////////////
	var walltexture = new THREE.TextureLoader().load('c.png');
	var textur = new THREE.TextureLoader().load('road.jpg');
	var textu = new THREE.TextureLoader().load('water.jpg');
	var Frogtex = new THREE.TextureLoader().load('Frogtex.jpg');
	var texture = new THREE.TextureLoader().load('grassss.jpg');
	
	
	  
	 //frog mesh
	const froggeo = new THREE.BoxGeometry(1, 1, 1);
	const frogmaterial = new THREE.MeshPhongMaterial({ map: Frogtex });
	box = new THREE.Mesh(froggeo, frogmaterial);
	box.position.set(0, 1, 0);
	scene.add(box);
	
	//////frog eyes//////
	const eyegeo = new THREE.BoxGeometry(0.3, 0.3, 0.2);
	const eyematerial = new THREE.MeshPhongMaterial({ color: new THREE.Color('black') });
	box33 = new THREE.Mesh(eyegeo, eyematerial);
	box33.position.set(0.2, 1.6, 0);
	const eye1geo = new THREE.BoxGeometry(0.3, 0.3, 0.2);
	box13 = new THREE.Mesh(eye1geo, eyematerial);
	box13.position.set(-0.2, 1.6, 0);
	
	
	//////////////frog legs/////////////
	const leggeo = new THREE.BoxGeometry(0.3, 1,0.1);
	box1 = new THREE.Mesh(leggeo, frogmaterial);
	box1.position.set(-0.5,0.1, 0);
	box1.rotation.x+=180;
	
	
	const leg1geo = new THREE.BoxGeometry(0.3, 1,0.1);
	box2 = new THREE.Mesh(leg1geo, frogmaterial);
	box2.position.set(0.5,0.1, 0);
	box2.rotation.x+=180;
	
	
	//////////Froog group//////////////
	 Froggroup = new THREE.Group();
Froggroup.add( box1 );
Froggroup.add( box2 );
Froggroup.add( box13 );
Froggroup.add( box33 );
scene.add(Froggroup);




	const Pgeometry = new THREE.PlaneGeometry(128, 2, 0);
	const Pgeomet = new THREE.PlaneGeometry(50, 50, 0);
	const wallmaterial = new THREE.MeshPhongMaterial({ map: walltexture });
	const grassmaterial = new THREE.MeshPhongMaterial({ map: texture });
	//grass//
	var plane = new THREE.Mesh(Pgeometry, grassmaterial);
	
	//wall//
 wal = new THREE.Mesh(Pgeomet, wallmaterial);
 wall = new THREE.Mesh(Pgeomet, wallmaterial);
 
	plane.rotation.x = ((Math.PI / 2) + Math.PI);
	wal.rotation.y = ((Math.PI / 2) + Math.PI);
	wall.rotation.y = (Math.PI / 2);
	wal.position.set(25, 25.5, -24.7);
	wall.position.set(-25, 25.5, -24.7);
	scene.add(wal);
	scene.add(wall);
	
	//road//
	const Pgeometr = new THREE.PlaneGeometry(128, 7, 0);
	const Pmateria = new THREE.MeshPhongMaterial({ map: textur });
	//water//
	const Pmateri = new THREE.MeshPhongMaterial({ map: textu });
	var plan = new THREE.Mesh(Pgeometr, Pmateria);
	water = new THREE.Mesh(Pgeometr, Pmateri);
	plan.rotation.x = ((Math.PI / 2) + Math.PI);
	water.rotation.x = ((Math.PI / 2) + Math.PI);
	water.position.z = -49;
	scene.add(water);
	plane.position.set(0,0,0.5);
	scene.add(plane);
	
	
	////street and road cloning////
	let zpos = 0;
	for (let i = 0; i < 5; i++) {


		const planez = plane.clone();
		const planezz = plan.clone();
		// carz.position.x=10;
		//carz.position.z=zpos;
		planez.position.set(0, 0, zpos - 8.5);
		planezz.position.set(0, 0, zpos - 4);
		//car.add(carz);
		scene.add(planezz);

		scene.add(planez);
		console.log(planezz.position.z);
		zpos = zpos - 9;

	}


//car grouping//
	let czpos = 2, xpos = -20;
	car = new THREE.Group();
	kar = new THREE.Group();
	const clgeo = new THREE.BoxGeometry(4, 1, 1);
	const cugeo = new THREE.BoxGeometry(2, 1, 1);
	
	 
	 ///car cloning///
	 	var bmaterial = new THREE.MeshPhongMaterial({ color: new THREE.Color('blue') });
		var rmaterial = new THREE.MeshPhongMaterial({ color: new THREE.Color('red') });
	for (let i = 0; i <= 16; i += 4) {
	
		cars[i] = new THREE.Mesh(cugeo, bmaterial);
		cars[i + 1] = new THREE.Mesh(clgeo, bmaterial);

		cars[i].position.set(xpos + 50, 1.5, czpos - 8);
		cars[i + 1].position.set(xpos + 50, 0.5, czpos - 8);

		scene.add(cars[i]);
		scene.add(cars[i + 1]);
		
		console.log( (i + 1) + "!" + i);

		
		
		cars[i + 2] = new THREE.Mesh(cugeo, rmaterial);
		cars[i + 3] = new THREE.Mesh(clgeo, rmaterial);


		cars[i + 2].position.set(xpos, 1.5, czpos - 4.5);
		cars[i + 3].position.set(xpos, 0.5, czpos - 4.5);
		scene.add(cars[i + 2]);
		scene.add(cars[i + 3]);
	
		czpos -= 9;
		
	}

	

	document.addEventListener("keydown", onDocumentKeyDown, false);

/////key listeners////

	function onDocumentKeyDown(event) {
		var keyCode;
		switch (keyCode = event.which) {
			case 87: {
				box.position.z -= 0.1;
				Froggroup.position.z -= 0.1;
				camera.position.z -= 0.1;
score+=100;
				console.log(box.position.z);
				break;
			}
			case 83: {
				box.position.z += 0.1;
				Froggroup.position.z += 0.1;
				camera.position.z += 0.1;
				break;
			}
			case 65: {
				box.position.x -= 0.1;
				Froggroup.position.x -= 0.1;
				camera.position.x -= 0.1;
				break;
			}
			case 68: {
				box.position.x += 0.1;
				Froggroup.position.x += 0.1;
				camera.position.x += 0.1;
				break;
			}
			default:
			
		}


	}
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
}
function update() {
	renderer.render(scene, camera);
	document.getElementById("score").innerHTML = score;
	
	///collision conditions//
	if ((box.position.z >= cars[1].position.z - 0.9 && box.position.z <= cars[1].position.z + 0.9) && (box.position.x <= cars[1].position.x + 2.5 && box.position.x >= cars[1].position.x - 2.5)) {

		alert("GAME OVER");
		///  die();

	}
	if ((box.position.z - 0.9 >= cars[3].position.z-0.9 && box.position.z <= cars[3].position.z + 0.9) && (box.position.x <= cars[3].position.x + 2.5 && box.position.x >= cars[3].position.x - 2.5)) {

		alert("GAME OVER");
		///  die();

	}
	if ((box.position.z >= cars[5].position.z - 0.9 && box.position.z <= cars[5].position.z + 0.9) && (box.position.x <= cars[5].position.x + 2.5 && box.position.x >= cars[5].position.x - 2.5)) {

		alert("GAME OVER");
		///  die();

	}
	if ((box.position.z >= cars[7].position.z - 0.9 && box.position.z <= cars[7].position.z + 0.9) && (box.position.x <= cars[7].position.x + 2.5 && box.position.x >= cars[7].position.x - 2.5)) {

		alert("GAME OVER");
		///  die();

	}
	if ((box.position.z >= cars[9].position.z - 0.9 && box.position.z <= cars[9].position.z + 0.9) && (box.position.x <= cars[9].position.x + 2.5 && box.position.x >= cars[9].position.x - 2.5)) {

		alert("GAME OVER");
		///  die();

	}
	if ((box.position.z >= cars[11].position.z - 0.9 && box.position.z <= cars[11].position.z + 0.9) && (box.position.x <= cars[11].position.x + 2.5 && box.position.x >= cars[11].position.x - 2.5)) {

		alert("GAME OVER");
		///  die();

	}
	if ((box.position.z >= cars[13].position.z - 0.9 && box.position.z <= cars[13].position.z + 0.9) && (box.position.x <= cars[13].position.x + 2.5 && box.position.x >= cars[13].position.x - 2.5)) {

		alert("GAME OVER");
		///  die();

	}
	if ((box.position.z >= cars[15].position.z - 0.9 && box.position.z <= cars[15].position.z + 0.9) && (box.position.x <= cars[15].position.x + 2.5 && box.position.x >= cars[15].position.x - 2.5)) {

		alert("GAME OVER");
		///  die();

	} if ((box.position.z >= cars[17].position.z - 0.9 && box.position.z <= cars[17].position.z + 0.9) && (box.position.x <= cars[17].position.x + 2.5 && box.position.x >= cars[17].position.x - 2.5)) {

		alert("GAME OVER");
		///  die();

	}
	if ((box.position.z >= cars[19].position.z - 0.9 && box.position.z <= cars[19].position.z + 0.9) && (box.position.x <= cars[19].position.x + 2.5 && box.position.x >= cars[19].position.x - 2.5)) {

		alert("GAME OVER");
		///  die();

	}
// car speeds///*
	cars[0].position.x -= Math.random();
	cars[1].position.x = cars[0].position.x;
	cars[2].position.x += Math.random();
	cars[3].position.x = cars[2].position.x;
	cars[4].position.x -= Math.random();
	cars[5].position.x = cars[4].position.x;
	cars[6].position.x += Math.random();
	cars[7].position.x = cars[6].position.x;
	cars[8].position.x -= Math.random();
	cars[9].position.x = cars[8].position.x;
	cars[10].position.x += Math.random();
	cars[11].position.x = cars[10].position.x;
	cars[12].position.x -= Math.random();
	cars[13].position.x = cars[12].position.x;
	cars[14].position.x += Math.random();
	cars[15].position.x = cars[14].position.x;
	cars[16].position.x -= Math.random();
	cars[17].position.x = cars[16].position.x;
	cars[18].position.x += Math.random();
	cars[19].position.x = cars[18].position.x;


// re-entering of cars//
	if (cars[1].position.x <= -40) {

		cars[0].position.x = 25;
cars[1].position.x = 25;


	}
	if (cars[3].position.x >= 40) {

				cars[2].position.x = -20;
cars[3].position.x = -20;

	}if (cars[5].position.x <= -40) {

				cars[5].position.x = 25;
cars[4].position.x = 25;

	}if (cars[7].position.x >= 40) {

				cars[7].position.x = -20;
cars[6].position.x = -20;

	}if (cars[9].position.x <= -40) {

				cars[9].position.x = 25;
cars[8].position.x = 25;

	}if (cars[11].position.x >= 40) {

			cars[11].position.x = -20;
cars[10].position.x = -20;
	}if (cars[13].position.x <= -40) {

				cars[13].position.x = 25;
cars[12].position.x = 25;

	}if (cars[15].position.x >= 40) {

				cars[15].position.x = -20;
cars[14].position.x = -20;

	}if (cars[17].position.x <= -40) {

				cars[17].position.x = 25;
cars[16].position.x = 25;

	}if (cars[19].position.x >= 40) {

				cars[19].position.x = -20;
cars[18].position.x = -20;
	}
	
	//frog sinkin//
	 if ((box.position.z>=water.position.z-4&&box.position.z<=water.position.z +4)) {
box.position.y -= 0.05;
Froggroup.position.y -=0.05; 
}		
if(box.position.z<=-46){
	alert("you have reached the water,you won! :"+score);
	}
	///boundss of game///
	 if (box.position.x >= wal.position.x ) {

		box.position.x -= 1;
		camera.position.x -= 1;
		Froggroup.position.x -=1;
		

	}
	 if (box.position.x <= wall.position.x ) {

		box.position.x += 1;
		camera.position.x += 1;
		Froggroup.position.x +=1;

	}
	 if (box.position.z>-0.4 ) {

		box.position.z -= 0.1;
		camera.position.z -= 0.1;
		Froggroup.position.z -=0.1;

	}
	requestAnimationFrame(update);
}
