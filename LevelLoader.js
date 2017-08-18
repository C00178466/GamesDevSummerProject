var level1;
var bdr_Tree;
var groundTex;
var bdr_Warning;
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

	app.player = new Player();
	app.player.init(canvas.width / 3, canvas.height / 3);

	app.enemy = [2];

	app.enemy[0] = new Enemy();
	app.enemy[0].init(200, 200);
	app.enemy[1] = new Enemy();
	app.enemy[1].init(400, 200);

	GameRunning = true;
	GameOver = false;
	GamePaused = false;

	app.coins = [2];

	app.coins[0] = new Coin();
	app.coins[0].init(300, 300);
	app.coins[1] = new Coin();
	app.coins[1].init((canvas.width / 7) - 100, (canvas.height / 7) * 5);

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

	//Colour the canvas green
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
				//draw hedge border images
				app.ctx.drawImage(bdr_Tree, j * 64, i * 64, 64, 64);
			}

			if (level1[i][j] === 2)
			{
				//draw warning border images
				app.ctx.drawImage(bdr_Warning, j * 64, i * 64, 64, 64);
			}

			if (level1[i][j] === 3)
			{
				
			}
		}
	}

	if (GameRunning)
	{
		app.enemy[0].update();
		app.enemy[1].update();
		app.player.update();
		app.enemy[0].FollowPlayer();
		CheckCoins();
		CheckLives();

		for (i = 0; i < app.coins.length; i++)
		{
			app.coins[i].update();
		}
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



function Reset()
{
	//reset player position
	app.player.xPos = canvas.width / 3;
	app.player.yPos = canvas.height / 3;

	app.enemy[0].xPos = 200;
	app.enemy[0].yPos = 200;

	app.enemy[1].xPos = 400;
	app.enemy[1].yPos = 200;
}

function CheckLives()
{	
	for (i = 0; i < app.enemy.length; i++)
	{
		if (app.enemy[i].CollisionPlayerToEnemy())
		{
			if (app.player.lives > 0)
			{
				app.player.lives = app.player.lives - 1;
				Reset();
			}
		}
	}	
	
	if (app.player.lives === 0)
	{
		GameOver = true;
		GameRunning = false;
	}
}

function CheckCoins()
{
	for (i = 0; i < app.coins.length; i++)
	{
		if (app.coins[i].xPos <= (app.player.xPos + 64)
		&& app.player.xPos <= (app.coins[i].yPos + 64)
		&& app.coins[i].yPos <= (app.player.yPos + 64)
		&& app.player.yPos <= (app.coins[i].yPos + 64)) 
		{
			//++monstersCaught;
			console.log("Coin Collide");

			//remove the coin from the array
			app.coins.splice(i, 1);
		}
	}
}

function CheckGameOver()
{
	app.ctx.fillStyle = "rgb(255, 255, 255)";
	app.ctx.font = "72px Helvetica";
	app.ctx.textAlign = "left";
	app.ctx.textBaseline = "top";
	app.ctx.fillText("GAME OVER", (canvas.width / 2) - 240, canvas.height / 2);
}