function LevelTwo()
{
	var player;
	var enemy;
	var coins;

	var GameRunning;
	var GamePaused;
	var GameOver;

	var itemsCollected;
	var maxItems;
	var sound_CoinCollect;
}

LevelTwo.prototype.init = function() {

	this.player = new Player();
	this.player.init(448, 448);

	this.GameRunning = true;
	this.GameOver = false;
	this.GamePaused = false;

	this.maxItems = 3;
	this.itemsCollected = 0;

	this.sound_CoinCollect = new Audio("Assets/Sound/collect_coin.wav");
	this.sound_CoinCollect.loop = false;
}

LevelTwo.prototype.update = function()
{
	if (this.GameRunning)
	{
		this.player.update();
		
	}
	else
	{

	}

	this.drawHUD;
}

LevelTwo.prototype.drawHUD = function()
{
	//Score
	app.ctx.fillStyle = "rgb(0, 0, 0)";
	app.ctx.font = "42px Helvetica";
	app.ctx.textAlign = "left";
	app.ctx.textBaseline = "top";
	app.ctx.fillText("Toxic Waste: " +  this.itemsCollected + " / " + this.maxItems, (canvas.width / 7), (canvas.height / 7) * 5.05);

	//Lives
	app.ctx.fillText("Lives Left: " + this.player.lives, (canvas.width / 7), (canvas.height / 7) * 5.55);
}