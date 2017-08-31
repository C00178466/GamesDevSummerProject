var keysDown = {};

addEventListener("keydown", function(e) {
	keysDown[e.keyCode] = true;
}, false);

function LevelOne()
{
	var player;
	var enemy;
	var coins;
	var HUDcoin;
	var HUDLevel;

	var GameRunning;
	var GamePaused;
	var GameOver;

	var coinsCollected;
	var maxCoins;
	var sound_CoinCollect;

	var portalImg;
	var portalTimer;
	var portalEffect;
}

LevelOne.prototype.init = function()
{
	app.player = new Player();
	app.player.init(448, 448);

	this.enemy = [4];

	this.enemy[0] = new Enemy();
	this.enemy[0].init(196, 264);
	this.enemy[1] = new Enemy();
	this.enemy[1].init(576, 264);
	this.enemy[2] = new Enemy();
	this.enemy[2].init(196, 764);
	this.enemy[3] = new Enemy();
	this.enemy[3].init(576, 764);

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

	//HUD coin
	this.HUDCoin = new Coin();
	this.HUDCoin.init((canvas.width / 2) - 185, (canvas.height / 7) * 5);

	this.sound_CoinCollect = new Audio("Assets/Sound/collect_coin.wav");
	this.sound_CoinCollect.loop = false;

	this.HUDLevel = new Image();
	this.HUDLevel.src = "Assets/Gameplay/level_1.png";

	this.portalImg = new Image();
	this.portalImg.src = "Assets/Gameplay/portal.png";
	this.portalTimer = 0;
	this.portalEffect = [];

	for (i = 0; i < 200; i++)
	{
		this.portalEffect[i] = new Particle(Math.random() * canvas.width / 2, Math.random() * canvas.height / 2);
	}
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

				this.enemy[0].WalkAroundCoin();
				this.enemy[1].WalkAroundCoin();
				this.enemy[2].WalkAroundCoin();
				this.enemy[3].WalkAroundCoin();
			}
		}

		this.CheckLives();
		this.CheckCoins();
		this.PlayerBoundary();
	}
	else
	{
		this.CheckGameOver();

		//check if spacebar is pressed
		if (82 in keysDown)
		{
			this.LevelRestart();
			this.init();
		}
	}
	
	this.drawHUD();
}

LevelOne.prototype.drawHUD = function()
{
	app.ctx.fillStyle = "rgb(0, 0, 0)";
	app.ctx.font = "42px RalewayBlack";
	app.ctx.textAlign = "left";
	app.ctx.textBaseline = "top";

	//Level Number
	app.ctx.fillText("LEVEL 1", canvas.width / 2 - 50, canvas.height / 7 * 4.2);
	app.ctx.drawImage(this.HUDLevel, canvas.width / 2 - 200, (canvas.height / 7) * 4.2 - 30, 98, 98);

	//Draw and update Coin Icon
	this.HUDCoin.update();

	//Lives Icon
	app.ctx.drawImage(HUDLives, canvas.width / 2 - 185, (canvas.height / 7) * 5.5);

	//Score
	app.ctx.fillText("Coins: " +  app.coinsCollected + " / " + this.maxCoins, (canvas.width / 2) - 100, (canvas.height / 7) * 5.05);

	//Lives
	app.ctx.fillText("Lives Left: " + app.player.lives, (canvas.width / 2) - 100, (canvas.height / 7) * 5.55);
}

LevelOne.prototype.Reset = function()
{
	//reset player position
	app.player.xPos = 448;
	app.player.yPos = 448;
}

LevelOne.prototype.LevelRestart = function()
{
	//reset player position
	app.player.xPos = 448;
	app.player.yPos = 448;

	//reset the player lives
	app.player.lives = 2;
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
		app.ctx.font = "36px RalewayBlack";
		app.ctx.textAlign = "left";
		app.ctx.textBaseline = "top";
		app.ctx.fillText("Level 1 Complete", (canvas.width / 2) - 190, canvas.height / 7 - 40);
		app.ctx.fillText("Enter Level 2 through the portal", canvas.width / 5, canvas.height / 7);

		for (i = 0; i < this.enemy.length; i++)
		{
			delete this.enemy[i];
		}

		//Portal Particle Effect
		for (i = 0; i < 200; i++)
		{
		  //particles[i].attract(mouse.x, mouse.y);
		  this.portalEffect[i].attract(480, 480);
		  this.portalEffect[i].integrate();
		  this.portalEffect[i].draw();
		}

		app.ctx.drawImage(this.portalImg, 448, 448, 64, 64);
	}
}

LevelOne.prototype.CheckGameOver = function()
{
	app.ctx.fillStyle = "rgb(255, 255, 255)";
	app.ctx.font = "72px RalewayBlack";
	app.ctx.textAlign = "left";
	app.ctx.textBaseline = "top";
	app.ctx.fillText("GAME OVER", (canvas.width / 2) - 240, canvas.height / 2 - 200);
	app.ctx.fillText("Press R to restart", (canvas.width / 2) - 300, canvas.height / 2 - 100);
}

LevelOne.prototype.CollisionWithPortal = function()
{
	if (app.coinsCollected === this.maxCoins)
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
	
}

LevelOne.prototype.DeleteLevel = function()
{
	for (i = 0; i < this.enemy.length; i++)
	{
		delete this.enemy[i];
	}
}

LevelOne.prototype.PlayerBoundary = function()
{
	if (app.player.xPos >= 832)
	{
		app.player.lives = app.player.lives - 1;
		this.Reset();
 	}

 	else if(app.player.xPos <= 64)
 	{
 		app.player.lives = app.player.lives - 1;
 		this.Reset();
 	}

 	else if (app.player.yPos <= 64)
 	{
 		app.player.lives = app.player.lives - 1;
 		this.Reset();
 	}

 	else if (app.player.yPos >= 832)
 	{
 		app.player.lives = app.player.lives - 1;
 		this.Reset();
 	}
}