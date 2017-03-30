window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

var
	canvas = document.getElementById("c"),
	ctx = canvas.getContext("2d"),
	w = canvas.width = window.innerWidth,
	h = canvas.height = window.innerHeight,
	logoParticles = [],
	particleIndex = 0,
	logo = new Image(),
	hue = 0;


function Particle(x, y){
	this.origX = this.x = x;
	this.origY = this.y = y;
	this.color = "white";
	this.maxLife = this.random(20);
	this.life = 0;
	this.vx = this.random(-1, 1);
	this.vy = this.random(-1, 1);
	this.grav = .04;
	this.index = particleIndex;
	logoParticles[particleIndex] = this;
	particleIndex++;
}

Particle.prototype = {

	constructor: Particle,

	draw: function(){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, 2, 2);
		this.update();
	},

	update: function(){
		if(this.life >= this.maxLife){
			logoParticles[this.index].reset();
		}
		this.x += this.vx;
		this.y += this.vy;
		this.vy += this.grav;
		this.life++;
	},

	reset: function(){
		this.x = this.origX;
		this.y = this.origY;
		this.life = 0;
		this.color = "hsl("+hue+", 100%, 50%)";
		this.vx = this.random(-1, 1);
		this.vy = this.random(-1, 1);
	},

	random: function(){
	  var 
	  	min = arguments.length == 1 ? 0 : arguments[0],
	  	max = arguments.length == 1 ? arguments[0] : arguments[1];
	  return Math.random() * (max - min) + min;
	}

};

logo.src = "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTyLlIFxtXqKunFD_MLJ0acsGYlFmv-9FFkM48scM6cvzykJiEh5g";

logo.onload = function(){
	var 
		posX = (w - this.width)/2,
	    posY = (h - this.height)/2;

	ctx.drawImage(this, posX, posY);

	var 
		imgData = ctx.getImageData(0, 0, w, h),
		pixels = imgData.data;

	for(var y = 0; y < imgData.height; y+=3) {
	  for(var x = 0; x < imgData.width; x+=3) {
	    var alpha = pixels[((imgData.width * y) + x) * 4 + 3];
	    if(alpha > 0){
	    	logoParticles.push(new Particle(x, y));
	    }
	  }
	}

	setTimeout(function(){
		animate();
	}, 800);

};

function animate(){
	ctx.fillStyle = "rgba(0,0,0,.1)";
	ctx.fillRect(0,0,w,h);

	for(var i in logoParticles){
		logoParticles[i].draw();
	}
	
	hue += 1;
	window.requestAnimationFrame(animate);
}