class Object {
	// Join Button object
	joinBtn = {
		w: 100,
		h: 50,
		x: W / 2 - 50,
		y: H / 2 + 25,

		draw: function () {
			ctx.strokeStyle = foregroundColor;
			ctx.lineWidth = "2";
			ctx.strokeRect(this.x, this.y, this.w, this.h);

			ctx.font = '18px' + defaultFont;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillStyle = foregroundColor;
			ctx.fillText("Join", W / 2, H / 2 + 50);
		}
	};

	// Start Button object
	startBtn = {
		w: 100,
		h: 50,
		x: W / 2 - 50,
		y: H / 2 - 50,

		draw: function () {
			ctx.strokeStyle = foregroundColor;
			ctx.lineWidth = "2";
			ctx.strokeRect(this.x, this.y, this.w, this.h);

			ctx.font = '18px' + defaultFont;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillStyle = foregroundColor;
			ctx.fillText("Start", W / 2, H / 2 - 25);
		}
	};

	// Restart Button object
	restartBtn = {
		w: 100,
		h: 50,
		x: W / 2 - 50,
		y: H / 2 - 50,

		draw: function () {
			ctx.strokeStyle = foregroundColor;
			ctx.lineWidth = "2";
			ctx.strokeRect(this.x, this.y, this.w, this.h);

			ctx.font = '18px' + defaultFont;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillStlye = foregroundColor;
			ctx.fillText("Restart", W / 2, H / 2 - 25);
		}
	};

	// Ball object
	ball = {
		x: W / 15,
		y: H / 15,
		r: 10,
		c: foregroundColor,
		vx: 4,
		vy: 8,

		// Function for drawing ball on canvas
		draw: function () {
			ctx.beginPath();
			ctx.fillStyle = this.c;
			ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
			ctx.fill();
		}
	};
}