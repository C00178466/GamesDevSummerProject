var player;
var xPos, yPos;
var speed;
var playerImgFrame = 0;
var playerOldTime = Date.now();

var keysDown = {};

function Player(x, y){

	player = new Image();
	player.addEventListener("load", function()
	{
		console.log("Player Loaded")
	}, false);
	player.src = 'Assets/Gameplay/officer_walk_strip.png';

	xPos = x;
	yPos = y;
	speed = 10;
}

Player.prototype.update = function(){

	//draw & animate the player
	if (Date.now() - playerOldTime > 1000 / fps)
	{
		if (playerImgFrame == 7)
		{
			playerImgFrame = 0;
		}

		playerImgFrame++;

		playerOldTime = Date.now();
		app.ctx.clearRect(20,0,72,72);
		//app.ctx.clearRect(0, 0, canvas.width, canvas.height);
		app.ctx.drawImage(player,playerImgFrame*64, 0, 64, 90, 100 , 100 , 64, 90);
	}

	//Move the player
	if (38 in keysDown) { // Player holding up
		player.y -= player.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		player.y += player.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		player.x -= player.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		player.x += player.speed * modifier;
	}
}