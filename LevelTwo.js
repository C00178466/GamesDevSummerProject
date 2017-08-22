function LevelTwo()
{
	var player;
	var enemy;
	var coins;

	var GameRunning;
	var GamePaused;
	var GameOver;

	var coinsCollected;
	var maxCoins;
	var sound_CoinCollect;
}

LevelTwo.prototype.init = function() {

	this.player = new Player();
	this.player.init(448, 448);

	this.GameRunning = true;
	this.GameOver = false;
	this.GamePaused = false;

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
}