var player;
var playerXPos, playerYPos;
var speed;
var playerImgFrame = 0;
var playerOldTime = Date.now();

var keysDown = {};

addEventListener("keydown", function(e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) {
	delete keysDown[e.keyCode];
}, false);

function Player(x, y){

	player = new Image();
	player.addEventListener("load", function()
	{
		console.log("Player Loaded")
	}, false);
	player.src = 'Assets/Gameplay/officer_walk_strip.png';

	app.playerXPos = canvas.width / 2;
	app.playerYPos = canvas.height / 2;
	speed = 16;
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
		app.ctx.clearRect(0, 0, canvas.width, canvas.height);
		app.ctx.drawImage(player,playerImgFrame*64, 0, 64, 90, app.playerXPos, app.playerYPos , 64, 90);
	}

	//Move the player
	if (38 in keysDown) { // Player holding up
		app.playerYPos -= speed * .5;
	}
	if (40 in keysDown) { // Player holding down
		app.playerYPos += speed * .5;
	}
	if (37 in keysDown) { // Player holding left
		app.playerXPos -= speed * .5;
	}
	if (39 in keysDown) { // Player holding right
		app.playerXPos += speed * .5;
	}
}