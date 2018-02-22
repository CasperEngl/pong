class Button {
	// On button click (Restart and start)
	constructor(e) {

		// Variables for storing mouse position on click
		var mx = e.pageX,
			my = e.pageY;

		/*
		console.log('mx, my', mx, my);
		console.log('');
		console.log('joinBtn.y, joinBtn.y + joinBtn.h', joinBtn.y, joinBtn.y + joinBtn.h);
		console.log('');
		console.log('startBtn.y, startBtn.y + startBtn.h', startBtn.y, startBtn.y + startBtn.h);
		*/

		// Click start button
		if (my >= startBtn.y && my <= startBtn.y + startBtn.h) {
			if (players.length > 0) {
				// If no second player joins
				if (players.length === 1) {
					paddles.push(new Paddle('top', W * 5));
				}

				// Delete the start button after clicking it
				startBtn = {};
				joinBtn = {};

				animloop();
			} else {
				needPlayers();
			}

			//console.log('Players', players);
			//console.log('Paddles', paddles);
		}

		// Click join button
		if (my >= joinBtn.y && my <= joinBtn.y + joinBtn.h) {
			joinRoom();

			// Delete the join button after clicking it
			//joinBtn = {};
		}

		// If the game is over, and the restart button is clicked
		if (over == 1) {
			if (mx >= restartBtn.x && mx <= restartBtn.x + restartBtn.w) {
				ball.x = 20;
				ball.y = 20;
				gamePoints = 0;
				players = [];
				ball.vx = 4;
				ball.vy = 8;
				animloop();

				over = 0;
			}
		}
	}
}

export { Button as default };