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
	}, false);
	player.src = 'Assets/Gameplay/officer_walk_strip_right.png';

	playerXPos = x;
	playerYPos = y;
	speed = 16;
}

Player.prototype.update = function(){

	//app.ctx.clearRect(0, 0, canvas.width, canvas.height);
	//app.ctx.clearRect(20,0,72,72);
	app.ctx.drawImage(player,playerImgFrame*64, 0, 64, 90, playerXPos, playerYPos , 64, 90);
	console.log(playerXPos, playerYPos);

	//Move the player
	if (38 in keysDown) 
	{ // Player holding up
		playerYPos -= speed * .5;
	}

	else if (40 in keysDown) 
	{ // Player holding down
		playerYPos += speed * .5;
	}

	else if (37 in keysDown) 
	{ // Player holding left

		player.src = 'Assets/Gameplay/officer_walk_strip_left.png';

		playerXPos -= speed * .5;

		//draw & animate the player
		if (Date.now() - playerOldTime > 1000 / fps)
		{
			if (playerImgFrame == 7)
			{
				playerImgFrame = 0;
			}

			playerImgFrame++;

			playerOldTime = Date.now();
			app.ctx.drawImage(player,playerImgFrame*64, 0, 64, 90, playerXPos, playerYPos , 64, 90);
		}
	}

	else if (39 in keysDown) 
	{ // Player holding right

		player.src = 'Assets/Gameplay/officer_walk_strip_right.png';

		playerXPos += speed * .5;

		//draw & animate the player
		if (Date.now() - playerOldTime > 1000 / fps)
		{
			if (playerImgFrame == 7)
			{
				playerImgFrame = 0;
			}

			playerImgFrame++;

			playerOldTime = Date.now();
			app.ctx.drawImage(player,playerImgFrame*64, 0, 64, 90, playerXPos, playerYPos , 64, 90);
		}
	}
}