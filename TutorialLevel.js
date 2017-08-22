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

	var check_Right;
	var check_Left;
	var check_Up;
	var check_Down;
}

TutorialLevel.prototype.init = function()
{
	this.player = new Player();
	this.player.init(canvas.width / 3, canvas.height / 3);

	this.helpImg = new Image();
	this.helpImg.src = "Assets/Gameplay/Tutorial/info_icon.png";

	this.portalImg = new Image();
	this.portalImg.src = "Assets/Gameplay/portal.png";

	this.coin = new Coin();
	this.coin.init(300, 100);

	this.coinsCollected = 0;
	this.timer1 = 0;
	this.timer2 = 0;
	this.part1 = false;
	this.part2 = true;

	this.helpText = "";
	this.helpTextLine2 = "";

	this.check_Right = false;
	this.check_Left = false;
	this.check_Up = false;
	this.check_Down = false;
}

TutorialLevel.prototype.update = function()
{
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
			this.helpText = "Move your player by using the directional";
			this.helpTextLine2 = "keys on the screen or your keyboard";
		}

		if (this.timer1 > 540)
		{
			this.helpText = "Move your player to the right";
			this.helpTextLine2 = "";

			this.CheckPlayerMovement();

			if (this.check_Right)
			{
				this.helpText = "Great. Now move your player to the left";
			}

			if (this.check_Left)
			{
				this.helpText = "Move Up";
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
		this.helpText = "Good Job. Now collect the coin on screen";

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
			}

			if (this.timer2 > 180 && this.timer2 < 360)
			{
				this.helpText = "You have finshed the tutorial";
			}

			if (this.timer2 > 360)
			{
				this.helpText = "Exit using the portal";
				app.ctx.drawImage(this.portalImg, 500, 200, 64, 64);
				//this.CollisionWithPortal();
			}
		}
	}

	this.player.update();
	this.DrawText();
}

TutorialLevel.prototype.DrawText = function()
{
	//draw help icon
	app.ctx.drawImage(this.helpImg, (canvas.width / 7) - 80, (canvas.height / 7) * 4.2, 64, 64);

	app.ctx.fillStyle = "rgb(0, 0, 0)";
	app.ctx.font = "42px Helvetica";
	app.ctx.textAlign = "left";
	app.ctx.textBaseline = "top";
	app.ctx.fillText(this.helpText, (canvas.width / 7), (canvas.height / 7) * 4.25);
	app.ctx.fillText(this.helpTextLine2, (canvas.width / 7), (canvas.height / 7) * 4.5)

	//Coins
	app.ctx.fillText("Coins: " +  this.coinsCollected + " / 1", (canvas.width / 7), (canvas.height / 7) * 5.05);

	//Lives
	app.ctx.fillText("Lives Left: Infinite", (canvas.width / 7), (canvas.height / 7) * 5.55);
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
			//this.sound_CoinCollect.play();
			delete this.coin;
		}
	}
}

TutorialLevel.prototype.CollisionWithPortal = function()
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

TutorialLevel.prototype.DeleteLevel = function()
{
	delete this.player;
	delete this.portalImg;
}