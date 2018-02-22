class Function {
	// Function to paint canvas
	static paintCanvas() {
		ctx.fillStyle = backgroundColor;
		ctx.fillRect(0, 0, W, H);
	}

	// Push two new paddles into the paddles[] array
	/*paddles.push(new Paddle("bottom", 10));
	paddles.push(new Paddle("top", 10));*/

	// Function for game room full
	static gameFull() {
		alert('No more players can join');
	}

	// Function for telling there's not enough players
	static needPlayers() {
		alert('There\'s not enough players in the room');
	}

	// Function for player join
	static joinRoom() {
		if (players.length === 0) {
			console.log('Player one joined');

			// Set the player id to be the latest paddle added (id 1)
			players[0] = new Player(paddles.length, 0);

			// Spawn player one paddle
			paddles.push(new Paddle("bottom"));

		}	else if (players.length === 1) {
			console.log('Player two joined');

			// Set the player id to be the latest paddle added (id 2)
			players[1] = new Player(paddles.length, 0);

			// Spawn player two paddle
			paddles.push(new Paddle('top'));
		} else {
			return gameFull();
		}

		Paddle.drawPaddles();
	}
}

export { Function as default };