var keysDown = {};

addEventListener("keydown", function(e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) {
	delete keysDown[e.keyCode];
}, false);

function TutorialLevel(){
	var player;
	var coin;
	var helpText, helpTextLine2;
	var timer1, timer2;
	var coinsCollected;
	var helpImg;
	var portalImg;
	var part1, part2;

	var sound_CoinCollect;

	var check_Right;
	var check_Left;
	var check_Up;
	var check_Down;

	//Level variables
	var level;
	var bdr_Tree;
	var groundTex;
	var bdr_Warning;

	//HUD Icons
	var HUDLives;
}

TutorialLevel.prototype.init = function()
{
	this.LoadAssets();

	this.player = new Player();
	this.player.init(canvas.width / 3, canvas.height / 3);

	this.helpImg = new Image();
	this.helpImg.src = "Assets/Gameplay/Tutorial/info_icon.png";

	this.portalImg = new Image();
	this.portalImg.src = "Assets/Gameplay/portal.png";

	this.sound_CoinCollect = new Audio("Assets/Sound/collect_coin.wav");
	this.sound_CoinCollect.loop = false;

	this.coin = new Coin();
	this.coin.init(300, 100);

	this.coinsCollected = 0;
	this.timer1 = 0;
	this.timer2 = 0;
	this.part1 = true;
	this.part2 = false;

	this.helpText = "";
	this.helpTextLine2 = "";

	this.check_Right = false;
	this.check_Left = false;
	this.check_Up = false;
	this.check_Down = false;
}

TutorialLevel.prototype.update = function()
{
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
		}
	}

	if (this.part1 === true)
	{
		this.timer1++;

		if (this.timer1 < 180) // 3 seconds
		{
			this.helpText = "Welcome to the Tutorial Level";
		}

		if (this.timer1 >= 180 && this.timer1 < 360)
		{
			this.helpText = "Learn how to play the game here";
		}

		if (this.timer1 >= 360 && this.timer1 < 540)
		{
			this.helpText = "Move your player by using the";
			this.helpTextLine2 = "directional keys on your keyboard";
		}

		if (this.timer1 > 540)
		{
			this.helpText = "Move your player to the right";
			this.helpTextLine2 = "";

			this.CheckPlayerMovement();

			if (this.check_Right)
			{
				this.helpText = "Great. Now move your player";
				this.helpTextLine2 = "to the left";
			}

			if (this.check_Left)
			{
				this.helpText = "Move Up";
				this.helpTextLine2 = "";
			}

			if (this.check_Up)
			{
				this.helpText = "Now, finally move your player Down";
			}

			if (this.check_Down)
			{	
				this.part1 = false;
				this.part2 = true;
			}
		}
	}

	if (this.part2 === true)
	{
		this.helpText = "Good Job. Now collect the coin";
		this.helpTextLine2 = "on screen";

		this.CheckCoin();

		if (this.coin != null) //Check if coin still exists
		{
			this.coin.update();
		}

		else //if coin has been collected
		{
			this.timer2++;

			if (this.timer2 < 180)
			{
				this.helpText = "Coin Collected. Well Done";
				this.helpTextLine2 = "";
			}

			if (this.timer2 > 180 && this.timer2 < 360)
			{
				this.helpText = "You have finshed the tutorial";
				this.helpTextLine2 = "";
			}

			if (this.timer2 > 360)
			{
				this.helpText = "Exit using the portal";
				this.helpTextLine2 = "";
				app.ctx.drawImage(this.portalImg, 500, 200, 64, 64);
			}
		}
	}

	this.player.update();
	this.DrawHUD();
}

TutorialLevel.prototype.DrawHUD = function()
{
	//draw help icon
	app.ctx.drawImage(this.helpImg, (canvas.width / 7) - 80, (canvas.height / 7) * 4.2, 64, 64);

	app.ctx.fillStyle = "rgb(0, 0, 0)";
	app.ctx.font = "42px RalewayBlack"
	app.ctx.textAlign = "left";
	app.ctx.textBaseline = "top";
	app.ctx.fillText(this.helpText, (canvas.width / 7), (canvas.height / 7) * 4.25);
	app.ctx.fillText(this.helpTextLine2, (canvas.width / 7), (canvas.height / 7) * 4.5)

	//Draw and update Coin Icon
	HUDCoin.update();
	app.ctx.fillText("Coins: " +  this.coinsCollected + " / 1", (canvas.width / 2) - 100, (canvas.height / 7) * 5.05);

	//Lives
	app.ctx.drawImage(HUDLives, canvas.width / 2 - 235, (canvas.height / 7) * 5.5);
	app.ctx.fillText("Lives Left: Infinite", (canvas.width / 2) - 150, (canvas.height / 7) * 5.55);

	app.ctx.fillText("Press ESC to exit", (canvas.width / 2) - 160, (canvas.height / 7) * 6);
}

TutorialLevel.prototype.CheckPlayerMovement = function()
{
	//Check if the user is pressing the directional keys
	if (38 in keysDown) 
	{ // Player holding up
		this.check_Right = false;
		this.check_Left = false;
		this.check_Up = true;
		this.check_Down = false;
	}

	else if (40 in keysDown) 
	{ // Player holding down
		this.check_Right = false;
		this.check_Left = false;
		this.check_Up = false;
		this.check_Down = true;
	}

	else if (37 in keysDown) 
	{ // Player holding left
		this.check_Right = false;
		this.check_Left = true;
		this.check_Up = false;
		this.check_Down = false;
	}

	else if (39 in keysDown) 
	{ // Player holding right
		this.check_Right = true;
		this.check_Left = false;
		this.check_Up = false;
		this.check_Down = false;
	}
}

TutorialLevel.prototype.CheckCoin = function()
{
	if (this.coin != null)
	{
		if (this.coin.xPos <= (this.player.xPos + 64)
		&& this.player.xPos <= (this.coin.xPos + 64)
		&& this.coin.yPos <= (this.player.yPos + 64)
		&& this.player.yPos <= (this.coin.yPos + 64)) 
		{
			++this.coinsCollected;
			this.sound_CoinCollect.play();
			delete this.coin;
		}
	}
}

TutorialLevel.prototype.CollisionWithPortal = function()
{
	if (this.timer2 > 360)
	{
		if (500 <= (this.player.xPos + 64)
		&& this.player.xPos <= (564)
		&& 200 <= (this.player.yPos + 64)
		&& this.player.yPos <= (264)) 
		{
			console.log("Portal Hit");
			return true;
		}
	}
}

TutorialLevel.prototype.DeleteLevel = function()
{
	delete this.player;
	delete this.portalImg;
}

TutorialLevel.prototype.LoadAssets = function()
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

	//HUD coin
	HUDCoin = new Coin();
	HUDCoin.init((canvas.width / 2) - 185, (canvas.height / 7) * 5);

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