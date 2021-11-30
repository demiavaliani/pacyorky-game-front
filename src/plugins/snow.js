var Snow = function (options) {
	document.getElementById(options.id).style.position = "fixed";
	document.getElementById(options.id).style.top = 0;
	document.getElementById(options.id).style.left = 0;
	document.getElementById(options.id).style.zIndex = 1000;
	document.getElementById(options.id).style.pointerEvents = "none";
	// var snowflakeImage;

	//snowflake image to use
	if (options.image) {
		this.snowflakeImage = document.createElement("img")
		this.snowflakeImage.src = options.image
		this.snowflakeImage.id = "snowflake"
		this.snowflakeImage.style.display = "none"
		document.body.appendChild(this.snowflakeImage)
	}

	// console.log("snow flake image", snowflakeImage)

	//create canvas
	this.canvas = document.createElement("canvas"); //add random number to change canvas id
	this.canvas.width = window.innerWidth;
	this.canvas.height = window.innerHeight;
	document.getElementById(options.id).appendChild(this.canvas);

	//change size
	var min = 2;
	var max = 7;
	if (!isNaN(options.min_size)) {
		min = options.min_size;
	}
	if (!isNaN(options.max_size)) {
		max = options.max_size;
	}

	function random(min, max) {
		return Math.random() * (max - min) + min;
	}

	this.go = false;
	this.snowflakes = []
	this.animation;
	this.context;

	this.snowfall = function () {
		console.log("SNOWFALL block")
		this.animation = requestAnimationFrame(() => this.snowfall());
		if (this.go) {
			console.log("GO block")
			//clear canvas
			this.context = this.canvas.getContext('2d');
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

			//update snowflakes
			for (var i = 0; i < 100; i++) {
				this.snowflakes.push(new Snowflake(this.canvas, this.snowflakeImage, min, max))
				this.snowflakes[i].update();
				this.snowflakes[i].show();

				if (this.snowflakes[i].y > this.canvas.height) {
					this.snowflakes[i].y = random(-20, -200);
				}
			}
		}
		else if (!this.go) {
			console.log("!GO block")
			// clear canvas
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

			for (var i = 0; i < 100; i++) {
				this.snowflakes[i].update();
				this.snowflakes[i].show();

				// stop spawning the snowflakes
				if (this.snowflakes[i].y > this.canvas.height) { }
			}
		}
	}

	// snowfall();

	this.toggle = function () {
		// console.log("this", this)
		// console.log(snowflakeImage)
		console.log("GO before", this.go)
		this.go = !this.go;
		console.log("GO after", this.go)

		if (this.go) {
			this.snowfall();
		} else if (!this.go) {
			setTimeout(() => {
				cancelAnimationFrame(this.animation)
				this.snowflakes = []
				this.snowflakeImage.remove()
			}, 30000)
		}
	}
}

//snowflakes to use in snow
var Snowflake = function (canvas, image, min, max) {
	//snowflake elements
	this.radius = random(min, max);
	this.x = random(0, canvas.width);
	this.y = random(-20, -800);
	this.Vy = random(1, 2)

	//set default
	this.color = "#FFF"

	this.canvas = canvas;

	this.show = function () {
		var ctx = this.canvas.getContext("2d");
		if (image) {
			ctx.drawImage(image, this.x, this.y, this.radius, this.radius)
		} else {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
			ctx.closePath();
			ctx.fillStyle = "this.color";
			ctx.fill();
		}
	}

	this.update = function () {
		this.y += this.Vy;
	}

	function random(min, max) {
		return Math.random() * (max - min) + min;
	}
}

export default Snow;