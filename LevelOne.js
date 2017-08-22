function LevelOne()
{
	var player;
	var enemy;
	var coins;

	var GameRunning;
	var GamePaused;
	var GameOver;

	var coinsCollected;
	var maxCoins;
	var sound_CoinCollect;

	var portalImg;
}

LevelOne.prototype.init = function()
{
	app.player = new Player();
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

	app.coins = [this.maxCoins];

	//Gameplay Coins
	app.coins[0] = new Coin();
	app.coins[0].init(250, 200);
	app.coins[1] = new Coin();
	app.coins[1].init(640, 200);
	app.coins[2] = new Coin();
	app.coins[2].init(250, 700);
	app.coins[3] = new Coin();
	app.coins[3].init(640, 700);

	app.coinsCollected = 0;
	this.maxCoins = 4;

	this.sound_CoinCollect = new Audio("Assets/Sound/collect_coin.wav");
	this.sound_CoinCollect.loop = false;

	this.portalImg = new Image();
	this.portalImg.src = "Assets/Gameplay/portal.png";
}

LevelOne.prototype.update = function()
{
	if (this.GameRunning)
	{
		app.player.update();

		for (i = 0; i < app.coins.length; i++)
		{
			app.coins[i].update();
		}

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
		this.CheckCoins();
	}
	else
	{
		this.CheckGameOver();
	}
	
	this.drawHUD();
}

LevelOne.prototype.drawHUD = function()
{
	//Score
	app.ctx.fillStyle = "rgb(0, 0, 0)";
	app.ctx.font = "42px Helvetica";
	app.ctx.textAlign = "left";
	app.ctx.textBaseline = "top";
	app.ctx.fillText("Coins: " +  app.coinsCollected + " / " + this.maxCoins, (canvas.width / 7), (canvas.height / 7) * 5.05);

	//Lives
	app.ctx.fillText("Lives Left: " + app.player.lives, (canvas.width / 7), (canvas.height / 7) * 5.55);
}

LevelOne.prototype.Reset = function()
{
	//reset player position
	app.player.xPos = 448;
	app.player.yPos = 448;

	//reset position of enemy following the player
	this.enemy[0].xPos = 400;
	this.enemy[0].yPos = 200;
}

LevelOne.prototype.CheckLives = function()
{	
	for (i = 0; i < this.enemy.length; i++)
	{
		if (this.enemy[i] != null)
		{
			if (this.enemy[i].CollisionPlayerToEnemy())
			{
				if (app.player.lives > 0)
				{
					//app.player.lives = app.player.lives - 1;
					//this.Reset();
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

LevelOne.prototype.CheckCoins = function()
{
	for (i = 0; i < app.coins.length; i++)
	{
		if (app.coins[i].xPos <= (app.player.xPos + 64)
		&& app.player.xPos <= (app.coins[i].xPos + 64)
		&& app.coins[i].yPos <= (app.player.yPos + 64)
		&& app.player.yPos <= (app.coins[i].yPos + 64)) 
		{
			++app.coinsCollected;
			this.sound_CoinCollect.play();

			//remove the coin from the array
			app.coins.splice(i, 1);
		}
	}

	if (app.coinsCollected === this.maxCoins)
	{
		app.ctx.fillStyle = "rgb(255, 255, 255)";
		app.ctx.font = "36px Helvetica";
		app.ctx.textAlign = "left";
		app.ctx.textBaseline = "top";
		app.ctx.fillText("Level 1 Complete", (canvas.width / 2) - 190, canvas.height / 7 - 40);
		app.ctx.fillText("Enter Level 2 through the portal", canvas.width / 5, canvas.height / 7);

		for (i = 0; i < this.enemy.length; i++)
		{
			delete this.enemy[i];
		}

		//////////////
		//Draw particles for portal here
		//////////////

		app.ctx.drawImage(this.portalImg, 448, 448, 64, 64);
	}
}

LevelOne.prototype.CheckGameOver = function()
{
	app.ctx.fillStyle = "rgb(255, 255, 255)";
	app.ctx.font = "72px Helvetica";
	app.ctx.textAlign = "left";
	app.ctx.textBaseline = "top";
	app.ctx.fillText("GAME OVER", (canvas.width / 2) - 240, canvas.height / 2 - 100);
}

LevelOne.prototype.CollisionWithPortal = function()
{
	if (448 <= (app.player.xPos + 64)
	&& app.player.xPos <= (512)
	&& 448 <= (app.player.yPos + 64)
	&& app.player.yPos <= (512)) 
	{
		console.log("Portal Hit");
		return true;
	}
}

LeveOne.prototype.DeleteLevel = function()
{
	delete app.player;

	for (i = 0; i < this.enemy.length; i++)
	{
		delete this.enemy[i];
	}
}