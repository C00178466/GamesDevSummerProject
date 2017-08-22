//Level variables
var level;
var bdr_Tree;
var groundTex;
var bdr_Warning;

//HUD Icons
var HUDLives;
var HUDCtrls;
var HUDLives;
var HUDPause;

var level_Tutorial;
var levelOne;
var levelTwo;

var levelT;
var level1;

function Level(){

	this.levelOne=true;
	this.level_Tutorial = false;

	if (this.level_Tutorial)
	{
		this.levelT = new TutorialLevel();
		this.levelT.init();
	}

	if (this.levelOne) //if level one is showing
	{
		this.level1 = new LevelOne();
		this.level1.init();
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
	
	if (this.levelT)
	{
		this.levelT.update();
	}

	if (this.levelOne)
	{
		this.level1.update();
	}
	
	drawHUD();
}

function drawHUD()
{
	//Player Movement Buttons
	app.ctx.drawImage(HUDCtrls, (canvas.width / 7) * 4, canvas.width + 200, 320, 320);

	//Pause Button
	app.ctx.drawImage(HUDPause, canvas.width / 7, (canvas.height / 7) * 6, 216, 96);

	//Draw and update Coin Icon
	HUDCoin.update();

	//Lives Icon
	app.ctx.drawImage(HUDLives, canvas.width / 18, (canvas.height / 7) * 5.5);
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

	//HUD coin
	HUDCoin = new Coin();
	HUDCoin.init((canvas.width / 7) - 100, (canvas.height / 7) * 5);

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