var stage;
var wallpaper;
var player;
var keys = [false, false, false, false];

function Player(path){
	createjs.Bitmap.call(this, path);
	// var bounds = this.getBounds();
	this.width = 40;
	this.height = 40;
	this.isMoving = false;
	this.vel = 5;

	this.update = function(){

		var i, aux = 0;
		var auxvel = this.vel;

		for (i = 0; i < 4; ++i)
			if (keys[i])
				++aux;
		
		if (!aux){
			isMoving = false;
			return;
			//not moving
		}
		else if (aux <2)
			auxvel = Math.sqrt(2 * this.vel * this.vel);

		if (keys[0]) this.x -= auxvel;
		if (keys[1]) this.y -=auxvel;
		if (keys[2]) this.x += auxvel;
		if (keys[3]) this.y +=auxvel;

		if (this.x < 0)
			this.x = 0;
		if (this.y < 0)
			this.y = 0;
		if (this.x + this.width > 800)
			this.x = 800 - this.width;
		if (this.y + this.height > 600)
			this.y = 600 - this.height;
		// console.log(this.getBounds());
	};
	this.collidedWith = function(object){
		console.log("Collided");
	};
}
Player.prototype = Object.create(createjs.Bitmap.prototype); 
Player.prototype.constructor = Player;

$(document).keydown(function(e){
	if (e.which >= 37 && e.which <=40){
		keys[e.which - 37] = true;
	}
});
$(document).keyup(function(e){
	if (e.which >= 37 && e.which <=40){
		keys[e.which - 37] = false;
	}
});


function init(){
	stage = new createjs.Stage("canvas");
	player = new Player('assets/player.png');
	// stage.addEventListener("added", function(){console.log(player.getBounds());});
	stage.addChild(player);

	console.log(player.getBounds());
	
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", update);
}

function update(){
	player.update();
	stage.update();
}