var level;
var bdr_Tree;
var groundTex;
var bdr_Warning;
var HUDCtrls;
var HUDLives;
var HUDPause;

var level_Tutorial;
var levelOne;
var levelTwo;

var level1;

function Level(){

	this.levelOne=true;
	if (this.levelOne) //if level one is showing
	{
		this.level1 = new LevelOne();
		this.level1.init();
		//app.player = new Player();
		//app.player.init(canvas.width / 3, canvas.height / 3);

		//app.enemy = [2];

		//app.enemy[0] = new Enemy();
		//app.enemy[0].init(200, 200);
		//app.enemy[1] = new Enemy();
		//app.enemy[1].init(400, 200);

		//GameRunning = true;
		//GameOver = false;
		//GamePaused = false;

		//app.coins = [4];

		//HUD coin
		//app.coins[0] = new Coin();
		//app.coins[0].init((canvas.width / 7) - 100, (canvas.height / 7) * 5);

		//Gameplay Coins
		//app.coins[1] = new Coin();
		//app.coins[1].init(300, 300);
		//app.coins[2] = new Coin();
		//app.coins[2].init(500, 300);
		//app.coins[3] = new Coin();
		//app.coins[3].init(300, 700);

		//app.coinsCollected = 0;
	}

	LoadAssets();
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
			if (level[i][j] === 0)
			{
				//draw ground
				app.ctx.drawImage(groundTex, j * 64, i * 64, 64, 64);
			}

			if (level[i][j] === 1)
			{
				//draw hedge border images
				app.ctx.drawImage(bdr_Tree, j * 64, i * 64, 64, 64);
			}

			if (level[i][j] === 2)
			{
				//draw warning border images
				app.ctx.drawImage(bdr_Warning, j * 64, i * 64, 64, 64);
			}

			if (level[i][j] === 3)
			{
				
			}
		}
	}
	

	//if (GameRunning)
	//{
		//app.player.update();
		//CheckCoins();
		//CheckLives();

		if (this.levelOne)
		{
			this.level1.update();
			//for (i = 0; i < app.coins.length; i++)
			//{
			//	app.coins[i].update();
			//}

			//for (i = 0; i < app.enemy.length; i++)
			//{
			//	app.enemy[i].update();
			//}
			//app.enemy[0].FollowPlayer();
			//app.enemy[1].WalkAroundCoin();
		}
	//}
	//else
	//{
		//CheckGameOver();
		//this.level1.CheckGameOver();
	//}

	
	drawHUD();
}

function drawHUD()
{
	//Player Movement Buttons
	app.ctx.drawImage(HUDCtrls, (canvas.width / 7) * 4, canvas.width + 100, 320, 320);

	//Pause Button
	app.ctx.drawImage(HUDPause, canvas.width / 7, (canvas.height / 7) * 6, 216, 96);
}

function Reset()
{

}

function CheckLives()
{	
	
}

function CheckCoins()
{
	
}

function CheckGameOver()
{
	
}

function LoadAssets()
{
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

	level = [
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