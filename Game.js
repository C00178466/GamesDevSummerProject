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

var levelLdr;

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
	levelLdr = new Level();

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

		levelLdr.update();
		app.player.update();
		app.enemy.update();
		//app.HUDcoin.update();

		if (app.player.playerXPos <= (app.enemy.enemyXPos + 64)
		&& app.enemy.enemyXPos <= (app.player.playerXPos + 64)
		&& app.player.playerYPos <= (app.enemy.enemyYPos + 64)
		&& app.enemy.enemyYPos <= (app.player.playerYPos + 64)) 
		{
			//++monstersCaught;
			//reset();
			console.log("Collide");
		}
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
    	//code for when HUD controls are pressed/touched
    }

    if (bOptions === true)
    {
    	
    }
}