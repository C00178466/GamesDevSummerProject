var enemyTex;
var enemyImgFrame = 0;
var enemyOldTime = Date.now();
var enemyXPos, enemyYPos;
var right, left, up, down;

var swirl;
var swirlImgFrame = 0;
var swirlOldTime = Date.now();
var swirlXPos, swirlYPos;

function Enemy(x, y){
	swirl = new Image();
	swirl.addEventListener("load", function()
	{
	}, false);
	swirl.src = 'Assets/Gameplay/swirleffect.png';

	enemyTex = new Image();
	enemyTex.addEventListener("load", function()
	{

	}, false);
	enemyTex.src = 'Assets/Gameplay/player_walk_strip_right.png';

	this.enemyXPos = x;
	this.enemyYPos = y;

	swirlXPos = this.enemyXPos;
	swirlYPos = this.enemyYPos;

	right = true;
	left = false;
	up = false;
	down = false;
}

Enemy.prototype.update = function(){

	app.ctx.drawImage(swirl, swirlImgFrame*72, 0, 72, 72, swirlXPos, swirlYPos, 64, 90 );

	//play the swirl effect
	if (Date.now() - swirlOldTime > 1000 / fps)
	{
		if (swirlImgFrame == 6)
		{
		//	swirlImgFrame = 0;
		}

		if (swirlImgFrame < 6)
		{
			swirlImgFrame++;
		}

		swirlOldTime = Date.now();
		//app.ctx.clearRect(20,0,72,72);
		app.ctx.drawImage(swirl,swirlImgFrame*72, 0,72, 72, swirlXPos, swirlYPos ,64,90 );
	}

	//
	//draw & animate the enemy when the swirl has finished
	if (swirlImgFrame === 6)
	{
		app.ctx.drawImage(enemyTex, enemyImgFrame*35, 0, 35, 57, this.enemyXPos, this.enemyYPos, 64, 90 );

		if (right === true)
		{
			enemyTex.src = 'Assets/Gameplay/player_walk_strip_right.png';

			if (Date.now() - enemyOldTime > 1000 / fps)
			{
				if (enemyImgFrame == 5)
				{
					enemyImgFrame = 0;
				}

				enemyImgFrame++;

				enemyOldTime = Date.now();
				//app.ctx.clearRect(20,0,72,72);
				//app.ctx.clearRect(0, 0, canvas.width, canvas.height);
				app.ctx.drawImage(enemyTex,enemyImgFrame*35, 0, 35, 57, this.enemyXPos, this.enemyYPos,64,90 );
			}
		}

		if (left === true)
		{
			enemyTex.src = 'Assets/Gameplay/player_walk_strip_left.png';

			if (Date.now() - enemyOldTime > 1000 / fps)
			{
				if (enemyImgFrame == 5)
				{
					enemyImgFrame = 0;
				}

				enemyImgFrame++;

				enemyOldTime = Date.now();
				//app.ctx.clearRect(20,0,72,72);
				//app.ctx.clearRect(0, 0, canvas.width, canvas.height);
				app.ctx.drawImage(enemyTex,enemyImgFrame*35, 0, 35, 57, this.enemyXPos, this.enemyYPos,64,90 );
			}
		}
		

		this.FollowPlayer();
	}
}

Enemy.prototype.FollowPlayer = function()
{
	if (app.player.playerXPos > this.enemyXPos) //right
	{
		this.enemyXPos = this.enemyXPos + 1;

		right = true;
		left = false;
		up = false;
		down = false;
	}

	else if (app.player.playerXPos < this.enemyXPos) //left
	{
		this.enemyXPos = this.enemyXPos - 1;

		right = false;
		left = true;
		up = false;
		down = false;
	}

	else if (app.player.playerYPos > this.enemyYPos) //up
	{
		this.enemyYPos = this.enemyYPos + 1;

		right = false;
		left = false;
		up = true;
		down = false;
	}

	else if (app.player.playerYPos < this.enemyYPos) //down
	{
		this.enemyYPos = this.enemyYPos - 1;

		right = false;
		left = false;
		up = false;
		down = true;
	}
}

Enemy.prototype.CollisionPlayerToEnemy = function()
{
	if (app.player.playerXPos <= (this.enemyXPos + 64)
	&& this.enemyXPos <= (app.player.playerXPos + 64)
	&& app.player.playerYPos <= (this.enemyYPos + 64)
	&& this.enemyYPos <= (app.player.playerYPos + 64)) 
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