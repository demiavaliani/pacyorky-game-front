var Snow = function (options) {
	document.getElementById(options.id).style.position = "fixed";
	document.getElementById(options.id).style.top = 0;
	document.getElementById(options.id).style.left = 0;
	document.getElementById(options.id).style.zIndex = 1000;
	document.getElementById(options.id).style.pointerEvents = "none";

	//snowflake image to use
	if (options.image) {
		var snowflakeImage = document.createElement("img")
		snowflakeImage.src = options.image
		snowflakeImage.id = "snowflake"
		snowflakeImage.style.display = "none"
		document.body.appendChild(snowflakeImage)
	}

	//create canvas
	let canvas = document.createElement("canvas"); //add random number to change canvas id
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	document.getElementById(options.id).appendChild(canvas);

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

	let go = true;
	let snowflakes = []
	let animation;
	let context;

	let snowfall = function () {
		animation = requestAnimationFrame(() => snowfall());
		if (go) {
			//clear canvas
			context = canvas.getContext('2d');
			context.clearRect(0, 0, canvas.width, canvas.height);

			//update snowflakes
			for (var i = 0; i < 100; i++) {
				snowflakes.push(new Snowflake(canvas, snowflakeImage, min, max))
				snowflakes[i].update();
				snowflakes[i].show();

				if (snowflakes[i].y > canvas.height) {
					snowflakes[i].y = random(-20, -200);
				}
			}
		}
		else if (!go) {
			console.log("STILL GOING")
			// clear canvas
			context.clearRect(0, 0, canvas.width, canvas.height);

			for (var i = 0; i < 100; i++) {
				snowflakes[i].update();
				snowflakes[i].show();

				// stop spawning the snowflakes
				if (snowflakes[i].y > canvas.height) { }
			}
		}
	}

	snowfall();

	this.toggle = function () {
		go = !go;

		if (go) {
			// createSnowflakes()
			snowfall();
		} else if (!go) {
			setTimeout(() => {
				cancelAnimationFrame(animation)
				snowflakes = []
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

	canvas = canvas;

	this.show = function () {
		var ctx = canvas.getContext("2d");
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