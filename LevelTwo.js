function LevelTwo()
{
	var player;
	var enemy;
	var coins;

	var GameRunning;
	var GamePaused;
	var GameOver;

	var itemsCollected;
	var maxItems;
	var sound_CoinCollect;
}

LevelTwo.prototype.init = function() {

	//app.player = new Player();
	app.player.init(448, 448);

	this.enemy = [5];

	this.enemy[0] = new Enemy();
	this.enemy[0].init(400, 200);
	this.enemy[1] = new Enemy();
	this.enemy[1].init(196, 264);
	this.enemy[2] = new Enemy();
	this.enemy[2].init(576, 264);
	this.enemy[3] = new Enemy();
	this.enemy[3].init(196, 764);
	this.enemy[4] = new Enemy();
	this.enemy[4].init(576, 764);

	this.GameRunning = true;
	this.GameOver = false;
	this.GamePaused = false;

	this.maxItems = 3;
	this.itemsCollected = 0;

	this.sound_CoinCollect = new Audio("Assets/Sound/collect_coin.wav");
	this.sound_CoinCollect.loop = false;
}

LevelTwo.prototype.update = function()
{
	if (this.GameRunning)
	{
		app.player.update();

		for (i = 0; i < this.enemy.length; i++)
		{
			if (this.enemy[i] != null)
			{
				this.enemy[i].update();

				this.enemy[0].FollowPlayer();
				this.enemy[1].WalkAroundCoin();
				this.enemy[2].WalkAroundCoin();
				this.enemy[3].WalkAroundCoin();
				this.enemy[4].WalkAroundCoin();
			}	
		}

		this.CheckLives();
	}
	else
	{
		this.CheckGameOver();
	}

	this.drawHUD;
}

LevelTwo.prototype.drawHUD = function()
{
	//Score
	app.ctx.fillStyle = "rgb(0, 0, 0)";
	app.ctx.font = "42px Helvetica";
	app.ctx.textAlign = "left";
	app.ctx.textBaseline = "top";
	app.ctx.fillText("Toxic Waste: " +  this.itemsCollected + " / " + this.maxItems, (canvas.width / 7), (canvas.height / 7) * 5.05);

	//Lives
	app.ctx.fillText("Lives Left: " + app.player.lives, (canvas.width / 7), (canvas.height / 7) * 5.55);
}

LevelTwo.prototype.CheckLives = function()
{	
	for (i = 0; i < this.enemy.length; i++)
	{
		if (this.enemy[i] != null)
		{
			if (this.enemy[i].CollisionPlayerToEnemy())
			{
				if (app.player.lives > 0)
				{
					app.player.lives = app.player.lives - 1;
					this.Reset();
				}
			}
		}
	}	
	
	if (app.player.lives === 0)
	{
		this.GameOver = true;
		this.GameRunning = false;
	}
}

LevelTwo.prototype.CheckGameOver = function()
{
	app.ctx.fillStyle = "rgb(255, 255, 255)";
	app.ctx.font = "72px Helvetica";
	app.ctx.textAlign = "left";
	app.ctx.textBaseline = "top";
	app.ctx.fillText("GAME OVER", (canvas.width / 2) - 240, canvas.height / 2 - 100);
}

LevelTwo.prototype.Reset = function()
{
	//reset player position
	app.player.xPos = 448;
	app.player.yPos = 448;

	//reset position of enemy following the player
	this.enemy[0].xPos = 400;
	this.enemy[0].yPos = 200;
}