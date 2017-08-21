function TutorialLevel(){
	var player;
	var coin;
	var helpText, helpTextLine2;
	var timer;
	var coinsCollected;
	var helpImg;
}

TutorialLevel.prototype.init = function()
{
	this.player = new Player();
	this.player.init(canvas.width / 3, canvas.height / 3);

	helpImg = new Image();
	helpImg.src = "Assets/Gameplay/Tutorial/info_icon.png";

	this.coin = new Coin();

	this.coinsCollected = 0;
	this.timer = 0;

	this.helpText = "";
	this.helpTextLine2 = "";
}

TutorialLevel.prototype.update = function()
{
	if (this.timer < 180) // 3 seconds
	{
		this.helpText = "Welcome to the Tutorial Level";
	}

	if (this.timer >= 180 && this.timer < 360)
	{
		this.helpText = "Learn how to play the game here";
	}

	if (this.timer >= 360)
	{
		this.helpText = "Move your player by using the directional";
		this.helpTextLine2 = "keys on the screen or your keyboard";
	}

	this.player.update();

	this.timer++;
	this.DrawText();
}

TutorialLevel.prototype.DrawText = function()
{
	//draw help icon
	app.ctx.drawImage(helpImg, (canvas.width / 7) - 80, (canvas.height / 7) * 4.2, 64, 64);

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