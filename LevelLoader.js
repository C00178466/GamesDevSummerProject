var level1;
var bdr_Tree;
var coin1;
var HUDcoin;
var HUDCtrls;
var HUDLives;
var HUDPause;

var player;

var enemy;

var coins;

function Level(){

	coin1 = new Coin(300, 300);
	HUDcoin = new Coin((canvas.width / 7) - 100, (canvas.height / 7) * 5);
	player = new Player(canvas.width / 3, canvas.height / 3);
	enemy = new Enemy(200, 200);

	//coins = [coin1, HUDcoin];

	//coins[0] = new Coin(300, 300);
	//coins[1] = new Coin((canvas.width / 7) - 100, (canvas.height / 7) * 5);

	bdr_Tree = new Image();
	bdr_Tree.addEventListener("load", function()
	{

	}, false);
	bdr_Tree.src = 'Assets/Gameplay/border_hedge.png';

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
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
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
				//empty element
			}

			if (level1[i][j] === 1)
			{
				//draw border
				app.ctx.drawImage(bdr_Tree, j * 64, i * 64, 64, 64);
			}

			if (level1[i][j] === 2)
			{
				//draw coin

				for (c = 0; c < 2; c++)
				{
					//coins[c] = new Coin();
					//coins[c].update();
					//console.log(coins[c]);
				}

				//coin1.update();
			}

			if (level1[i][j] === 3)
			{
				//draw player

			}
		}
	}

	//coin1.update();
	//HUDcoin.update();

	//coins[0].update();
	//coins[1].update();
	enemy.update();
	player.update();
	CollisionPlayerToEnemy();
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
	app.ctx.fillText("Lives Left: " + "2", (canvas.width / 7), (canvas.height / 7) * 5.55);

	//Player Movement Buttons
	app.ctx.drawImage(HUDCtrls, (canvas.width / 7) * 4, canvas.width + 100, 320, 320);

	//Pause Button
	app.ctx.drawImage(HUDPause, canvas.width / 7, (canvas.height / 7) * 6, 216, 96);
}

function CollisionPlayerToEnemy()
{
	if (player.playerXPos <= (enemy.enemyXPos + 64)
	&& enemy.enemyXPos <= (player.playerXPos + 64)
	&& player.playerYPos <= (enemy.enemyYPos + 64)
	&& enemy.enemyYPos <= (player.playerYPos + 64)) 
	{
		//++monstersCaught;
		//reset();
		console.log("Collide");
	}
}