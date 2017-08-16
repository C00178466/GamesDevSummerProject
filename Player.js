var playerTex;
var playerXPos, playerYPos;
var speed;
var lives;
var playerImgFrame = 0;
var playerOldTime = Date.now();
var fps = 24;

var keysDown = {};

addEventListener("keydown", function(e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) {
	delete keysDown[e.keyCode];
}, false);

function Player(x, y){
	playerTex = new Image();
	playerTex.addEventListener("load", function()
	{
	}, false);
	playerTex.src = 'Assets/Gameplay/officer_walk_strip_right.png';

	this.playerXPos = x;
	this.playerYPos = y;
	speed = 16;
	this.lives = 2;
}

Player.prototype.update = function(){

	app.ctx.drawImage(playerTex, playerImgFrame*64, 0, 64, 90, this.playerXPos, this.playerYPos , 64, 90);

	//Move the player
	if (38 in keysDown) 
	{ // Player holding up
		this.playerYPos -= speed * .5;
	}

	else if (40 in keysDown) 
	{ // Player holding down
		this.playerYPos += speed * .5;
	}

	else if (37 in keysDown) 
	{ // Player holding left

		playerTex.src = 'Assets/Gameplay/officer_walk_strip_left.png';

		this.playerXPos -= speed * .5;

		//draw & animate the player
		if (Date.now() - playerOldTime > 1000 / fps)
		{
			if (playerImgFrame == 7)
			{
				playerImgFrame = 0;
			}

			playerImgFrame++;

			playerOldTime = Date.now();
			app.ctx.drawImage(playerTex ,playerImgFrame*64, 0, 64, 90, this.playerXPos, this.playerYPos , 64, 90);
		}
	}

	else if (39 in keysDown) 
	{ // Player holding right

		playerTex.src = 'Assets/Gameplay/officer_walk_strip_right.png';

		this.playerXPos += speed * .5;

		//draw & animate the player
		if (Date.now() - playerOldTime > 1000 / fps)
		{
			if (playerImgFrame == 7)
			{
				playerImgFrame = 0;
			}

			playerImgFrame++;

			playerOldTime = Date.now();
			app.ctx.drawImage(playerTex ,playerImgFrame*64, 0, 64, 90, this.playerXPos, this.playerYPos , 64, 90);
		}
	}
}

function CheckLives()
{
	
}