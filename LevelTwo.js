var keysDown = {};

addEventListener("keydown", function(e) {
	keysDown[e.keyCode] = true;
}, false);

function LevelTwo()
{
	var player;
	var enemy;
	var power;

	var HUDPower;
	var HUDLevel;

	var GameRunning;
	var GamePaused;
	var GameOver;

	var itemsCollected;
	var maxItems;
	var sound_powerCollect;
}

LevelTwo.prototype.init = function() {

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

	this.maxItems = 4;
	this.itemsCollected = 0;

	this.sound_powerCollect = new Audio("Assets/Sound/collect_power.wav");
	this.sound_powerCollect.loop = false;

	this.HUDLevel = new Image();
	this.HUDLevel.src = "Assets/Gameplay/level_2.png";

	this.power = [4];
	this.power[0] = new PowerBank();
	this.power[0].init(250, 200);
	this.power[1] = new PowerBank();
	this.power[1].init(640, 200);
	this.power[2] = new PowerBank();
	this.power[2].init(250, 700);
	this.power[3] = new PowerBank();
	this.power[3].init(640, 700);

	//HUD Power
	this.HUDPower = new PowerBank();
	this.HUDPower.init((canvas.width / 2) - 270, (canvas.height / 7) * 5 - 15);
}

LevelTwo.prototype.update = function()
{
	if (this.GameRunning)
	{
		app.player.update();

		for (i = 0; i < this.power.length; i++)
		{
			this.power[i].update();
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

LevelTwo.prototype.drawHUD = function()
{
	//Score
	app.ctx.fillStyle = "rgb(0, 0, 0)";
	app.ctx.font = "42px RalewayBlack";
	app.ctx.textAlign = "left";
	app.ctx.textBaseline = "top";
	app.ctx.fillText("Power Banks: " +  this.itemsCollected + " / " + this.maxItems, (canvas.width / 2) - 180, (canvas.height / 7) * 5.05);

	//Lives
	app.ctx.fillText("Lives Left: " + app.player.lives, (canvas.width / 2) - 100, (canvas.height / 7) * 5.55);
	app.ctx.drawImage(HUDLives, canvas.width / 2 - 185, (canvas.height / 7) * 5.5);

	this.HUDPower.update();

	//Level Number
	app.ctx.fillText("LEVEL 2", canvas.width / 2 - 50, canvas.height / 7 * 4.2);
	app.ctx.drawImage(this.HUDLevel, canvas.width / 2 - 200, (canvas.height / 7) * 4.2 - 30, 98, 98);
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
	app.ctx.font = "72px RalewayBlack";
	app.ctx.textAlign = "left";
	app.ctx.textBaseline = "top";
	app.ctx.fillText("GAME OVER", (canvas.width / 2) - 240, (canvas.height / 2 - 200));
	app.ctx.fillText("Press R to restart", (canvas.width / 2) - 290, (canvas.height / 2 - 100));
}

LevelTwo.prototype.LevelRestart = function()
{
	//reset player position
	app.player.xPos = 448;
	app.player.yPos = 448;

	//reset the player lives
	app.player.lives = 2;
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

LevelTwo.prototype.CheckCoins = function()
{
	for (i = 0; i < this.power.length; i++)
	{
		if (this.power[i].xPos <= (app.player.xPos + 64)
		&& app.player.xPos <= (this.power[i].xPos + 64)
		&& this.power[i].yPos <= (app.player.yPos + 64)
		&& app.player.yPos <= (this.power[i].yPos + 64)) 
		{
			++this.itemsCollected;
			this.sound_powerCollect.play();

			//remove the coin from the array
			this.power.splice(i, 1);
		}
	}

	if (this.itemsCollected === this.maxItems)
	{
		app.ctx.fillStyle = "rgb(255, 255, 255)";
		app.ctx.font = "48px RalewayBlack";
		app.ctx.textAlign = "left";
		app.ctx.textBaseline = "top";
		app.ctx.fillText("Level 2 Complete", (canvas.width / 2) - 190, canvas.height / 7 - 40);
		app.ctx.fillText("You have saved the universe", canvas.width / 5 - 30, canvas.height / 7 + 10);
		app.ctx.fillText("Press SPACE to return ", canvas.width / 5 + 50, canvas.height / 7 * 3);
		app.ctx.fillText("to the main menu", canvas.width / 5 + 100, canvas.height / 7 * 3 + 50);

		//when space is pressed, go back to main menu and restart the levels
		if (32 in keysDown)
		{
			app.bMenu = true;
			app.bPlay = false;
			app.levelLdr.init();
		}

		for (i = 0; i < this.enemy.length; i++)
		{
			delete this.enemy[i];
		}
	}
}

LevelTwo.prototype.PlayerBoundary = function()
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