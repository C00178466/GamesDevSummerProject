var level1;
var bdr_Tree;
var groundTex;
var bdr_Warning;
var coin1;
var HUDcoin;
var HUDCtrls;
var HUDLives;
var HUDPause;

var player;

var enemy;

var coins;

var GameRunning;
var GamePaused;
var GameOver;

function Level(){

	coin1 = new Coin(300, 300);
	HUDcoin = new Coin((canvas.width / 7) - 100, (canvas.height / 7) * 5);
	app.player = new Player(canvas.width / 3, canvas.height / 3);
	app.enemy = new Enemy(200, 200);

	GameRunning = true;
	GameOver = false;
	GamePaused = false;

	//coins = [coin1, HUDcoin];

	//coins[0] = new Coin(300, 300);
	//coins[1] = new Coin((canvas.width / 7) - 100, (canvas.height / 7) * 5);

	bdr_Tree = new Image();
	bdr_Tree.addEventListener("load", function()
	{

	}, false);
	bdr_Tree.src = 'Assets/Gameplay/border_hedge.png';

	bdr_Warning = new Image();
	bdr_Warning.addEventListener("load", function()
	{

	}, false);
	bdr_Warning.src = 'Assets/Gameplay/radioactive.png';

	groundTex = new Image();
	groundTex.addEventListener("load", function()
	{

	}, false);
	groundTex.src = 'Assets/Gameplay/ground.png';

	HUDCtrls = new Image();
	HUDCtrls.addEventListener("load", function()
	{

	}, false);
	HUDCtrls.src = 'Assets/Gameplay/HUD/Screen_btns.png';

	HUDLives = new Image();
	HUDLives.addEventListener("load", function()
	{

	}, false);
	HUDLives.src = 'Assets/Gameplay/HUD/Lives.png';

	HUDPause = new Image();
	HUDPause.addEventListener("load", function()
	{

	}, false);
	HUDPause.src = 'Assets/Gameplay/HUD/Pause_btn.png';


	level1 = [
		[1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
		[2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1]
	];
}

Level.prototype.update = function(){

	app.ctx.beginPath();
	app.ctx.rect(0, 0, canvas.width, canvas.height);
	app.ctx.fillStyle = "green";
	app.ctx.fill();

	//loop through array and draw the map/level
	for (i = 0; i < 15; i++)
	{
		for (j = 0; j < 15; j++)
		{
			if (level1[i][j] === 0)
			{
				//draw ground
				app.ctx.drawImage(groundTex, j * 64, i * 64, 64, 64);
			}

			if (level1[i][j] === 1)
			{
				//draw border
				app.ctx.drawImage(bdr_Tree, j * 64, i * 64, 64, 64);
			}

			if (level1[i][j] === 2)
			{
				app.ctx.drawImage(bdr_Warning, j * 64, i * 64, 64, 64);
			}

			if (level1[i][j] === 3)
			{
				
			}
		}
	}

	if (GameRunning)
	{
		app.enemy.update();
		app.player.update();
		coin1.update();
		CollisionPlayerToEnemy();
		app.enemy.FollowPlayer();
		CheckLives();
	}
	else
	{
		CheckGameOver();
	}

	
	drawHUD();
}

function drawHUD(){

	//Score
	app.ctx.fillStyle = "rgb(0, 0, 0)";
	app.ctx.font = "42px Helvetica";
	app.ctx.textAlign = "left";
	app.ctx.textBaseline = "top";
	app.ctx.fillText("Coins: " + " 0 / 2", (canvas.width / 7), (canvas.height / 7) * 5.05);

	//Lives
	app.ctx.drawImage(HUDLives, canvas.width / 18, (canvas.height / 7) * 5.5);
	app.ctx.fillStyle = "rgb(0, 0, 0)";
	app.ctx.font = "42px Helvetica";
	app.ctx.textAlign = "left";
	app.ctx.textBaseline = "top";
	app.ctx.fillText("Lives Left: " + app.player.lives, (canvas.width / 7), (canvas.height / 7) * 5.55);

	//Player Movement Buttons
	app.ctx.drawImage(HUDCtrls, (canvas.width / 7) * 4, canvas.width + 100, 320, 320);

	//Pause Button
	app.ctx.drawImage(HUDPause, canvas.width / 7, (canvas.height / 7) * 6, 216, 96);
}

function CollisionPlayerToEnemy()
{
	if (app.player.playerXPos <= (app.enemy.enemyXPos + 64)
	&& app.enemy.enemyXPos <= (app.player.playerXPos + 64)
	&& app.player.playerYPos <= (app.enemy.enemyYPos + 64)
	&& app.enemy.enemyYPos <= (app.player.playerYPos + 64)) 
	{
		//++monstersCaught;
		
		console.log("Collide");

		if (app.player.lives > 0)
		{
			app.player.lives = app.player.lives - 1;
			Reset();
		}
	}
}

function Reset()
{
	//reset player position
	app.player.playerXPos = canvas.width / 3;
	app.player.playerYPos = canvas.height / 3;

	app.enemy.enemyXPos = 200;
	app.enemy.enemyYPos = 200;
}

function CheckLives()
{
	if (app.player.lives === 0)
	{
		GameOver = true;
		GameRunning = false;
	}
}

function CheckGameOver()
{
	app.ctx.fillStyle = "rgb(0, 0, 0)";
	app.ctx.font = "42px Helvetica";
	app.ctx.textAlign = "left";
	app.ctx.textBaseline = "top";
	app.ctx.fillText("GAME OVER", (canvas.width / 2) - 126, canvas.height / 2);
}