var fps = 24;

//creates a new canvas element
canvas = document.createElement("canvas");
// adds the canvas element tot the document
document.body.appendChild(canvas);
//adds keydownhandler to document
document.addEventListener("touchstart", onTouchStart);
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
app.ctx = canvas.getContext("2d");

var test;
var touchXPos, touchYPos;

var backgroundTex;
var btnPlay;
var btnOptions;

var player;
var enemy;
var coin1;

var level1;
var bdr_Tree;
var HUDcoin;

var bMenu = true;
var bPlay = false;
var bOptions = false;

function Game(){
	this.init();
}

Game.prototype.init=function()
{
	console.log('Initiliasing Game');

	test = new TouchTest();
	console.log(test.is_touch_device());

	app.player = new Player(canvas.width / 3, canvas.height / 3);
	app.enemy = new Enemy(200, 200);
	app.coin1 = new Coin(300, 300);
	app.HUDcoin = new Coin((canvas.width / 7) - 100, (canvas.height / 7) * 5);

	backgroundTex = new Image();
	backgroundTex.addEventListener("load", function()
	{

	}, false);
	backgroundTex.src = 'Assets/Menu/background.png';

	btnPlay = new Image();
	btnPlay.addEventListener("load", function()
	{

	}, false);
	btnPlay.src = 'Assets/Menu/playbtn.png';

	btnOptions = new Image();
	btnOptions.addEventListener("load", function()
	{

	}, false);
	btnOptions.src = 'Assets/Menu/optionsbtn.png';

	bdr_Tree = new Image();
	bdr_Tree.addEventListener("load", function()
	{

	}, false);
	bdr_Tree.src = 'Assets/Gameplay/border_hedge.png';

	level1 = [
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

Game.prototype.update=function()
{
	console.log('Updating');
	
	app.ctx.clearRect(0, 0, canvas.width, canvas.height);

	//if menu is showing
	if (bMenu === true){
		app.ctx.clearRect(0, 0, canvas.width, canvas.height);
		app.ctx.drawImage(backgroundTex, 0, 0, canvas.width, canvas.height);
		app.ctx.drawImage(btnPlay, (canvas.width / 2) - 145, (canvas.height / 2) - 160, 290, 160);
		app.ctx.drawImage(btnOptions, (canvas.width / 2) - 145, (canvas.height / 2) + 160, 290, 160);
	}
	
	//if gameplay is running
	if (bPlay === true){
		
		app.ctx.beginPath();
		app.ctx.rect(0, 0, canvas.width, canvas.height);
		app.ctx.fillStyle = "green";
		app.ctx.fill();

		app.player.update();
		app.enemy.update();
		app.coin1.update();
		//app.HUDcoin.update();

		

		if (player.playerXPos <= (coin.coinXPos + 64)
		&& app.coin.coinXPos <= (app.player.playerXPos + 64)
		&& app.player.playerYPos <= (app.coin.coinYPos + 64)
		&& app.coin.coinYPos <= (app.player.playerYPos + 64)) 
		{
			//++monstersCaught;
			//reset();
			console.log("Collide");
		}

		//loop through array and draw the map/level
		for (i = 0; i < 15; i++)
		{
			for (j = 0; j < 15; j++)
			{
				if (level1[i][j] === 0)
				{
					//draw border
				}

				if (level1[i][j] === 1)
				{
					//draw
					app.ctx.drawImage(bdr_Tree, j * 64, i * 64, 64, 64);
				}
			}
		}

		// Score
		app.ctx.fillStyle = "rgb(0, 0, 0)";
		app.ctx.font = "42px Helvetica";
		app.ctx.textAlign = "left";
		app.ctx.textBaseline = "top";
		app.ctx.fillText("Coins: " + " 0 / 2", (canvas.width / 7), (canvas.height / 7) * 5);
		
	}

	if (bOptions === true)
	{
		app.ctx.clearRect(0, 0, canvas.width, canvas.height); 
	}
	
	window.requestAnimationFrame(myGame.update);
}

//--------------------------------
//
//Check for mouse clicks
//
//--------------------------------
function onTouchStart(e)
{
    touches = e.touches;
    touchXPos = e.touches[0].clientX;
    touchYPos = e.touches[0].clientY;

    console.log(touchXPos, touchYPos);

    if (bMenu === true)
    {
    	if (touches[0].clientX >= (canvas.width / 2) - 145 &&
	    	touches[0].clientX <= (canvas.width / 2) + 145 &&
	    	touches[0].clientY >= (canvas.height / 2) - 160 &&
	    	touches[0].clientY <= canvas.height / 2)
	    {
	    	console.log("Play Button Pressed");
	    	bMenu = false;
	    	bPlay = true;
	    	bOptions = false;
	    }

	    if (touches[0].clientX >= (canvas.width / 2) - 145 &&
	    	touches[0].clientX <= (canvas.width / 2) + 145 &&
	    	touches[0].clientY >= (canvas.height / 2) + 160 &&
	    	touches[0].clientY <= (canvas.height / 2) + 320)
	    {
	    	console.log("Options Button Pressed");
	    	bMenu = false;
	    	bPlay = false;
	    	bOptions = true;
	    }
    }

    if (bPlay === true)
    {

    }

    if (bOptions === true)
    {
    	
    }
}