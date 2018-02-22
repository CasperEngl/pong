import Button from 'Class.Button';

// Initialize canvas and required variables
var canvas = document.getElementById("canvas"),
		ctx = canvas.getContext("2d"), // Create canvas context
		W = window.innerWidth, // Window's width
		H = window.innerHeight, // Window's height
		particles = [], // Array containing particles
		players = [], // Player count
		joinBtn = {}, // Join object
		ball = {}, // Ball object
		paddles = [2], // Array containing two paddles
		gamePoints = 0, // Varialbe to store points
		mouse = {}, // Mouse object to store it's current position
		mouseLastPosition = {}, // Save the last position of the mouse to determine ball direction
		//mouseMultiplier = points * 0.3 * points, // multiplier in case paddle can't move fast enough
		fps = 60, // Max FPS (frames per second)
		particlesCount = 20, // Number of sparks when ball strikes the paddle
		flag = 0, // Flag variable which is changed on collision
		particlePos = {}, // Object to contain the position of collision
		multipler = 1, // Varialbe to control the direction of sparks
		startBtn = {}, // Start button object
		restartBtn = {}, // Restart button object
		over = 0, // flag variable, changed when the game is over
		init, // variable to initialize animation
		paddleHit,

		// Styling
		defaultFont = ' \'Source Code Pro\', monospace',
		backgroundColor = 'hsla(200, 19%, 5%, 1)',
		foregroundColor = 'hsla(120, 100%, 50%, 1)'; // white: hsla(0, 100%, 100%, 1);

mouse = {
	x: W / 2
};

// Add mousemove and mousedown events to the canvas
// Mouse tracking
['mousemove', 'touchmove'].map(function (e) {
	canvas.addEventListener(e, trackPosition, true);
});
// Arrow key tracking
// document.addEventListener('keydown', trackPosition, true);
canvas.addEventListener("mousedown", Button, true);

// Initialise the collision sound
collision = document.getElementById("collide");

// Set the canvas's height and width to full screen
canvas.width = W;
canvas.height = H;

// Resize game window if user resizes their window
/*
window.addEventListener('optimizedResize', function () {
	W = window.innerWidth,
		H = window.innerHeight,
		canvas.width = W,
		canvas.height = H;
});
*/

import Paddle from 'Class.Paddle';
import Function from 'Class.Function';



// Function for creating particles object
function createParticles(x, y, m) {
	this.x = x || 0;
	this.y = y || 0;

	this.radius = 1.2;

	this.vx = -1.5 + Math.random() * 3;
	this.vy = m * Math.random() * 1.5;
}

// Draw everything on canvas
function draw() {
	Function.paintCanvas();
	Paddle.drawPaddles();

	Object.ball.draw();
	update();
}

// Function to increase speed after every 5 points
function increaseSpd() {
	if (gamePoints % 4 == 0) {
		if (Math.abs(ball.vx) < 15) {
			ball.vx += (ball.vx < 0) ? -1 : 1;
			ball.vy += (ball.vy < 0) ? -2 : 2;
		}
	}
}

// Track the position of mouse cursor
function trackPosition(event) {
	mouse.x = event.pageX;
	mouse.y = event.pageY;

	//check to make sure there is data to compare against
	if (typeof(mouseLastPosition.x) != 'undefined') {

		//get the change from last position to this position
		var deltaX = mouseLastPosition.x - mouse.x,
				deltaY = mouseLastPosition.y - mouse.y;

		//check which direction had the highest amplitude and then figure out direction by checking if the value is greater or less than zero
		if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) {
			//left
		} else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) {
			//right
		} else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) {
			//up
		} else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < 0) {
			//down
		}
	}

	//set the new last position to the current for next time
	mouseLastPosition = {
		x: mouse.x,
		y: mouse.y,
		vx: deltaX,
		vy: deltaY
	};

	/*
	switch(e.which) {
		case 37: // left
			if (mouse.x < W && mouse.x > 0 || mouse.x > W)
				mouse.x -= 30 + mouseMultiplier;
			break;

		case 39: // right
			if (mouse.x < W && mouse.x > 0 || mouse.x < 0)
				mouse.x += 30 + mouseMultiplier;
			break;

		default: return; // exit this handler for other keys
	}
	*/
}

// Function to update positions, score and everything.
// Basically, the main game logic is defined here
function update() {

	// Update scores
	updateScore();

	// Move the paddles on mouse move
	if (mouse.x && mouse.y) {
		// Move both paddles
		/*
		for (var i = 1; i < paddles.length; i++) {
			p = paddles[i];
			p.x = mouse.x - p.w / 2;
		}
		*/

		// Move one player paddle
		p = paddles[players[0].id];
		p.x = mouse.x - p.w / 2;
	}

	// Move the ball
	ball.x += ball.vx;
	ball.y += ball.vy;

	// Collision with paddles
	p1 = paddles[1];
	p2 = paddles[2];

	// If the ball strikes with paddles,
	// invert the y-velocity vector of ball,
	// increment the points, play the collision sound,
	// save collision's position so that sparks can be
	// emitted from that position, set the flag variable,
	// and change the multiplier
	if (players.length > 0) {
		if (collides(ball, p1)) {
			collideAction(ball, p1);
		}

		else if (collides(ball, p2)) {
			collideAction(ball, p2);
		}

		else {
			// Collide with walls, If the ball hits the top/bottom,
			// walls, run gameOver() function
			if (ball.y + ball.r > H) {
				ball.y = H - ball.r;
				gameOver();
			}

			else if (ball.y < 0) {
				ball.y = ball.r;
				gameOver();
			}

			// If ball strikes the vertical walls, invert the
			// x-velocity vector of ball
			if (ball.x + ball.r > W) {
				ball.vx = -ball.vx;
				ball.x = W - ball.r;
			}

			else if (ball.x - ball.r < 0) {
				ball.vx = -ball.vx;
				ball.x = ball.r;
			}
		}
	}

	// If flag is set, push the particles
	if (flag == 1) {
		for (var k = 0; k < particlesCount; k++) {
			particles.push(new createParticles(particlePos.x, particlePos.y, multiplier));
		}
	}

	// Emit particles/sparks
	emitParticles();

	// reset flag
	flag = 0;
}

//Function to check collision between ball and one of
//the paddles
function collides(b, p) {
	if (b.x + ball.r >= p.x && b.x - ball.r <= p.x + p.w) {
		if (b.y >= (p.y - p.h) && p.y > 0) {
			paddleHit = 1;
			return true;
		}

		else if (b.y <= p.h && p.y == 0) {
			paddleHit = 2;
			return true;
		}

		else return false;
	}
}

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

//Do this when collides == true
function collideAction(ball, p) {
	ball.vy = -ball.vy;
	ball.vx = ball.vx - mouseLastPosition.vx / 5; // Add friction

	if (paddleHit == 1) {
		ball.y = p.y - p.h;
		particlePos.y = ball.y + ball.r;
		multiplier = -1;
	}

	else if (paddleHit == 2) {
		ball.y = p.h + ball.r;
		particlePos.y = ball.y - ball.r;
		multiplier = 1;
	}

	if (players[0] && paddleHit === players[0].id)
		players[0].points++;
	else if (players[1] && paddleHit === players[1].id)
		players[1].points++;

	gamePoints++;

	increaseSpd();

	if (collision) {
		if (gamePoints > 0)
			collision.pause();

		collision.currentTime = 0;
		collision.play();
	}

	particlePos.x = ball.x;
	flag = 1;
}

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

// Function for emitting particles
function emitParticles() {
	for (var j = 0; j < particles.length; j++) {
		par = particles[j];

		ctx.beginPath();
		ctx.fillStyle = 'white';
		if (par.radius > 0) {
			ctx.arc(par.x, par.y, par.radius, 0, Math.PI * 2, false);
		}
		ctx.fill();

		par.x += par.vx;
		par.y += par.vy;

		// Reduce radius so that the particles die after a few seconds
		par.radius = Math.max(par.radius - 0.05, 0.0);

	}
}

// Function for updating score
function updateScore() {
	if (players[0]) {
		ctx.fillStlye = foregroundColor;
		ctx.font = '16px' + defaultFont;
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText("Score: " + players[0].points, 20, 20);
	}
}

// Function to run when the game overs
function gameOver() {
	ctx.fillStlye = foregroundColor;
	ctx.font = '20px' + defaultFont;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText("Game Over - You scored " + players[0].points + " points!", W / 2, H / 2 + 25);

	// Stop the Animation
	cancelRequestAnimFrame(init);

	// Set the over flag
	over = 1;

	// Show the restart button
	restartBtn.draw();
}

// Function for running the whole animation
function animloop() {
	init = requestAnimFrame(animloop);
	draw();
}

// Function to execute at startup
function startScreen() {
	draw();
	startBtn.draw();
	joinBtn.draw();
}

// Show the start screen
startScreen();