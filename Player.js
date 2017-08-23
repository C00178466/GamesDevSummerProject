var keysDown = {};

addEventListener("keydown", function(e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) {
	delete keysDown[e.keyCode];
}, false);

function Player(){
	var img;
	var xPos, yPos;
	var speed;
	var lives;
	var imgFrame;
	var oldTime;
	var fps;
}

Player.prototype.init = function(x, y){

	this.img = new Image();
	this.img.addEventListener("load", function()
	{
	}, false);
	this.img.src = 'Assets/Gameplay/player_right.png';

	this.xPos = x;
	this.yPos = y;
	this.speed = 16;
	this.lives = 2;

	this.imgFrame = 0;
	this.oldTime = Date.now();
	this.fps = 24;
}

Player.prototype.update = function(){

	app.ctx.drawImage(this.img, this.imgFrame*64, 0, 64, 90, this.xPos, this.yPos , 64, 90);

	this.Move();
	this.PlayerBoundary();
}

Player.prototype.Move = function()
{
	//Move the player
	if (38 in keysDown) 
	{ // Player holding up
		this.yPos -= this.speed * .5;

		this.img.src = 'Assets/Gameplay/player_up.png';

		//draw & animate the player
		if (Date.now() - this.oldTime > 1000 / fps)
		{
			if (this.imgFrame == 7)
			{
				this.imgFrame = 0;
			}

			this.imgFrame++;

			this.oldTime = Date.now();
			app.ctx.drawImage(this.img, this.imgFrame*70, 0, 70, 70, this.xPos, this.yPos, 64, 90);
		}
	}

	else if (40 in keysDown) 
	{ // Player holding down
		this.yPos += this.speed * .5;

		this.img.src = 'Assets/Gameplay/player_down.png';

		//draw & animate the player
		if (Date.now() - this.oldTime > 1000 / fps)
		{
			if (this.imgFrame == 7)
			{
				this.imgFrame = 0;
			}

			this.imgFrame++;

			this.oldTime = Date.now();
			app.ctx.drawImage(this.img, this.imgFrame*70, 0, 70, 70, this.xPos, this.yPos, 64, 90);
		}
	}

	else if (37 in keysDown) 
	{ // Player holding left

		this.img.src = 'Assets/Gameplay/player_left.png';

		this.xPos -= this.speed * .5;

		//draw & animate the player
		if (Date.now() - this.oldTime > 1000 / fps)
		{
			if (this.imgFrame == 7)
			{
				this.imgFrame = 0;
			}

			this.imgFrame++;

			this.oldTime = Date.now();
			app.ctx.drawImage(this.img, this.imgFrame*80, 0, 70, 70, this.xPos, this.yPos, 64, 90);
		}
	}

	else if (39 in keysDown) 
	{ // Player holding right

		this.img.src = 'Assets/Gameplay/player_right.png';

		this.xPos += this.speed * .5;

		//draw & animate the player
		if (Date.now() - this.oldTime > 1000 / fps)
		{
			if (this.imgFrame == 7)
			{
				this.imgFrame = 0;
			}

			this.imgFrame++;

			this.oldTime = Date.now();
			app.ctx.drawImage(this.img, this.imgFrame*80, 0, 70, 70, this.xPos, this.yPos, 64, 90);
		}
	}
}

Player.prototype.PlayerBoundary = function()
{
	if (this.xPos >= 896)
	{
		this.xPos -= 2;
		console.log("Collide");
 	}

 	else if(this.xPos <= 64)
 	{
 		this.xPos += 2;
 	}

 	else if (this.yPos <= 64)
 	{
 		this.yPos += 2;
 	}

 	else if (this.yPos >= 896)
 	{
 		this.yPos -= 2;
 	}


}