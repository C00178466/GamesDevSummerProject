function Enemy(){

	var swirl;
	var swirlImgFrame;
	var swirlOldTime;
	var swirlXPos, swirlYPos;

	var img;
	var imgFrame;
	var oldTime;
	var xPos, yPos;
	var right, left, up, down;
	var stopRight, stopLeft, stopUp, stopDown;
	var fps;

	var tempRight, tempLeft, tempUp, tempDown;
}

Enemy.prototype.init = function(x, y){

	this.swirl = new Image();
	this.swirl.src = 'Assets/Gameplay/swirleffect.png';

	this.swirlImgFrame = 0;
	this.swirlOldTime = Date.now();

	this.img = new Image();
	this.img.src = 'Assets/Gameplay/enemy_walk_right.png';

	this.imgFrame = 0;
	this.oldTime = Date.now();

	this.xPos = x;
	this.yPos = y;

	this.tempRight = x + 128;
	this.tempLeft = x;
	this.tempUp = y - 150;
	this.tempDown = y;

	this.swirlXPos = this.xPos;
	this.swirlYPos = this.yPos;

	this.right = true;
	this.left = false;
	this.up = false;
	this.down = false;

	this.stopRight = 0;
	this.stopLeft = 128;
	this.stopUp = 0;
	this.stopDown = 128;

	this.fps = 24;
}

Enemy.prototype.update = function(){

	app.ctx.drawImage(this.swirl, this.swirlImgFrame*72, 0, 72, 72, this.swirlXPos, this.swirlYPos, 64, 90);

	//play the swirl effect
	if (Date.now() - this.swirlOldTime > 1000 / this.fps)
	{
		if (this.swirlImgFrame < 6)
		{
			this.swirlImgFrame++;
		}

		this.swirlOldTime = Date.now();
		app.ctx.drawImage(this.swirl, this.swirlImgFrame*72, 0, 72, 72, this.swirlXPos, this.swirlYPos, 64, 90);
	}

	//draw & animate the enemy when the swirl has finished
	if (this.swirlImgFrame === 6)
	{
		app.ctx.drawImage(this.img, this.imgFrame*90, 0, 90, 90, this.xPos, this.yPos, 64, 90);

		if (this.right === true)
		{
			this.img.src = 'Assets/Gameplay/enemy_walk_right.png';

			if (Date.now() - this.oldTime > 1000 / this.fps)
			{
				if (this.imgFrame == 7)
				{
					this.imgFrame = 0;
				}

				this.imgFrame++;

				this.oldTime = Date.now();
				app.ctx.drawImage(this.img, this.imgFrame*90, 0, 90, 90, this.xPos, this.yPos, 64, 90);
			}
		}

		if (this.left === true)
		{
			this.img.src = 'Assets/Gameplay/enemy_walk_left.png';

			if (Date.now() - this.oldTime > 1000 / this.fps)
			{
				if (this.imgFrame == 7)
				{
					this.imgFrame = 0;
				}

				this.imgFrame++;

				this.oldTime = Date.now();
				app.ctx.drawImage(this.img, this.imgFrame*90, 0, 90, 90, this.xPos, this.yPos, 64, 90);
			}
		}

		if (this.up)
		{
			this.img.src = 'Assets/Gameplay/enemy_walk_up.png';

			if (Date.now() - this.oldTime > 1000 / this.fps)
			{
				if (this.imgFrame == 7)
				{
					this.imgFrame = 0;
				}

				this.imgFrame++;

				this.oldTime = Date.now();
				app.ctx.drawImage(this.img, this.imgFrame*90, 0, 90, 90, this.xPos, this.yPos, 64, 90);
			}
		}

		if (this.down)
		{
			this.img.src = 'Assets/Gameplay/enemy_walk_down.png';

			if (Date.now() - this.oldTime > 1000 / this.fps)
			{
				if (this.imgFrame == 7)
				{
					this.imgFrame = 0;
				}

				this.imgFrame++;

				this.oldTime = Date.now();
				app.ctx.drawImage(this.img, this.imgFrame*90, 0, 90, 90, this.xPos, this.yPos, 64, 90);
			}
		}
		
		//this.FollowPlayer();
		//this.CollisionPlayerToEnemy();
	}
}

Enemy.prototype.FollowPlayer = function()
{

	if (app.player.yPos < this.yPos) //up
	{
		this.yPos = this.yPos - .5;

		this.right = false;
		this.left = false;
		this.up = true;
		this.down = false;
	}

	else if (app.player.yPos > this.yPos) //down
	{
		this.yPos = this.yPos + .5

		this.right = false;
		this.left = false;
		this.up = false;
		this.down = true;
	}

	else if (app.player.xPos > this.xPos) //right
	{
		this.xPos = this.xPos + .5;

		this.right = true;
		this.left = false;
		this.up = false;
		this.down = false;
	}

	else if (app.player.xPos < this.xPos) //left
	{
		this.xPos = this.xPos - .5;

		this.right = false;
		this.left = true;
		this.up = false;
		this.down = false;
	}
}

Enemy.prototype.CollisionPlayerToEnemy = function()
{
	if (app.player.xPos <= (this.xPos + 64)
	&& this.xPos <= (app.player.xPos + 64)
	&& app.player.yPos <= (this.yPos + 64)
	&& this.yPos <= (app.player.yPos + 64)) 
	{
		//++monstersCaught;
		console.log("Collide");
		return true;
	}

	else
	{
		return false;
	}
}

Enemy.prototype.WalkAroundCoin = function()
{
	if (this.right)
	{
		if (this.xPos <= this.tempRight)
		{
			this.xPos += .8;
		}
		else
		{
			this.up = true;
			this.right = false;
		}	
	}

	else if (this.up)
	{
		if (this.yPos >= this.tempUp)
		{
			this.yPos -= .8;
		}
		else
		{
			this.left = true;
			this.up = false;
		}	
	}

	else if (this.left)
	{
		if (this.xPos >= this.tempLeft)
		{
			this.xPos -= .8;
		}
		else
		{
			this.down = true;
			this.left = false;
		}
	}

	else if (this.down)
	{
		if (this.yPos <= this.tempDown)
		{
			this.yPos += .8;
		}
		else
		{
			this.right = true;
			this.down = false;
		}	
	}
}