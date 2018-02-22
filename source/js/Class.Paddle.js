class Paddle {
	// Function for creating paddles
	static Paddle(pos, width) {
		// identifier
		this.id = players.length;
		// Height and width
		this.h = 10;
		this.w = width || W / 10 + 50;

		// Paddle's position
		this.x = W / 2 - this.w / 2;
		this.y = (pos === "top") ? 0 : H - this.h;
	}

	static drawPaddles() {
		for (var i = 0; i < paddles.length; i++) {
			p = paddles[i];

			ctx.fillStyle = foregroundColor;
			ctx.fillRect(p.x, p.y, p.w, p.h);
		}
	}
}

export { Paddle as default };