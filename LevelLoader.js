//Level variables
var level;
var bdr_Tree;
var groundTex;
var bdr_Warning;

var level2Map;
var bdr_Acid;
var groundTexLevel2;

//HUD Icons
var HUDLives;
var HUDCtrls;
var HUDLives;
var HUDPause;

//levels
var level_Tutorial;
var levelOne;
var levelTwo;

var levelT;
var level1;
var level2;

function Level(){

	LoadAssets();

	this.levelOne = true;
	this.levelTwo = false;
	this.level1 = new LevelOne();
	this.level1.init();
}

Level.prototype.update = function(){

	//Colour the canvas green
	app.ctx.beginPath();
	app.ctx.rect(0, 0, canvas.width, canvas.height);
	app.ctx.fillStyle = "green";
	app.ctx.fill();

	if (this.levelOne)
	{
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
			}
		}

		this.level1.update();

		if (this.level1.CollisionWithPortal())
		{
			this.levelOne = false;
			this.levelTwo = true;
			this.level1.DeleteLevel();
			this.level2 = new LevelTwo();
			this.level2.init();
		}

		//drawHUD();
	}

	if (this.levelTwo)
	{
		//loop through array and draw the map/level
		for (i = 0; i < 15; i++)
		{
			for (j = 0; j < 15; j++)
			{
				if (level2Map[i][j] === 0)
				{
					//draw ground
					app.ctx.drawImage(groundTexLevel2, j * 64, i * 64, 64, 64);
				}

				if (level2Map[i][j] === 1)
				{
					//draw hedge border images
					app.ctx.drawImage(bdr_Acid, j * 64, i * 64, 64, 64);
				}
			}
		}

		this.level2.update();

		//if (this.level2.CollisionWithPortal())
		//{
			//this.level2.DeleteLevel();
		//}
	}
	
}

function drawHUD()
{
	//Player Movement Buttons
	//app.ctx.drawImage(HUDCtrls, (canvas.width / 7) * 4, canvas.width + 200, 320, 320);

	//Pause Button
	//app.ctx.drawImage(HUDPause, canvas.width / 7, (canvas.height / 7) * 6, 216, 96);

	//Draw and update Coin Icon
	//HUDCoin.update();

	//Lives Icon
	//app.ctx.drawImage(HUDLives, canvas.width / 18, (canvas.height / 7) * 5.5);
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



	bdr_Acid = new Image();
	bdr_Acid.src = "Assets/Gameplay/Level2/Acid.png";

	groundTexLevel2 = new Image();
	groundTexLevel2.src = "Assets/Gameplay/Level2/ground.png";

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

	level2Map = [
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	];
}