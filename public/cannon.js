
// Setup our world
var world = new CANNON.World();
world.gravity.set(0, 0, -30); // m/s²

var groundMaterial = new CANNON.Material("groundMaterial");
var cannonMaterial = new CANNON.Material("cannonMaterial");
var wallMaterial = new CANNON.Material("wallMaterial");



// Adjust constraint equation parameters for ground/ground contact
var ground_cannon_cm = new CANNON.ContactMaterial(groundMaterial, cannonMaterial, {
    friction: 1e8,
    restitution: 0.7,
    contactEquationStiffness: 1e8,
    contactEquationRelaxation: 3,
    frictionEquationStiffness: 1e8,
    frictionEquationRegularizationTime: 0,
});

var wall_cannon_cm = new CANNON.ContactMaterial(wallMaterial, cannonMaterial, {
    restitution: 0.4,
});

// Add contact material to the world
world.addContactMaterial(ground_cannon_cm);
world.addContactMaterial(wall_cannon_cm);

// Create a sphere
var radius = 1; // m
var sphereBody = new CANNON.Body({
    mass: 5, // kg
    position: new CANNON.Vec3(-14, 0, 11), // m
    shape: new CANNON.Sphere(radius),
    material: cannonMaterial

});
sphereBody.linearDamping = 0.42;
sphereBody.angularDamping = 0.8;

sphereBody.velocity.set(18, 0, 0);
world.addBody(sphereBody);

var wallBody = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3(8, 0, 5),
    shape: new CANNON.Box(new CANNON.Vec3(1, 20, 10)),
    material: wallMaterial
});
world.addBody(wallBody);

// Create a plane
var groundBody = new CANNON.Body({
    mass: 0, // mass == 0 makes the body static
    material: groundMaterial
});
var groundShape = new CANNON.Plane();
groundBody.addShape(groundShape);
world.addBody(groundBody);

var fixedTimeStep = 1.0 / 60.0; // seconds
var maxSubSteps = 3;

// Start the simulation loop
window.addEventListener('load', (event) => {


    var lastTime;
    const cannon = document.querySelector(".cannon");

    (function simloop(time) {
        requestAnimationFrame(simloop);
        if (lastTime !== undefined) {
            var dt = (time - lastTime) / 1000;
            world.step(fixedTimeStep, dt, maxSubSteps);
        }

        let coordZ = sphereBody.position.z * 5 + 45;
        let coordY = sphereBody.position.x * 5 + 23.72;

        if (!cannon.classList.contains("big")) {
            cannon.style.bottom = coordZ.toString() * 0.01 * window.innerHeight + "px"; //fix for mobile vh
            cannon.style.left = coordY.toString() + "vw";
        } else {
            cannon.style.transitionProperty = "width, height, blur, bottom, left";
            let halfHeight = window.innerHeight * 0.01 * 50; //fix for mobile vh
            cannon.style.bottom = halfHeight.toString() + "px";

            cannon.style.left = "50vw"
        }



        lastTime = time;
    })();
});




