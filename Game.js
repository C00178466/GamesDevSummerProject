var oldTime = Date.now();
var imageFrame = 0;
var fps = 24;

//creates a new canvas element
canvas = document.createElement("canvas");
// adds the canvas element tot the document
document.body.appendChild(canvas);
//adds keydownhandler to document
document.addEventListener("touchstart", onTouchStart);
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
ctx = canvas.getContext("2d");

var test;
var touchXPos, touchYPos;
var coin;
var backgroundTex;
var player;
var btnPlay;
var btnOptions;

var swirl;
var swirlImgFrame = 0;
var swirlOldTime = Date.now();

var enemy;
var enemyImgFrame = 0;
var enemyOldTime = Date.now();

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

	//Load coin image
	coin = new Image();   // Create new img element
	coin.addEventListener("load", function() 
	{
	}, false);
	coin.src = 'Images/coin.png'; // Set source path

	swirl = new Image();
	swirl.addEventListener("load", function()
	{
	}, false);
	swirl.src = 'Images/swirleffect.png';

	backgroundTex = new Image();
	backgroundTex.addEventListener("load", function()
	{

	}, false);
	backgroundTex.src = 'Images/background.png';

	btnPlay = new Image();
	btnPlay.addEventListener("load", function()
	{

	}, false);
	btnPlay.src = 'Images/playbtn.png';

	btnOptions = new Image();
	btnOptions.addEventListener("load", function()
	{

	}, false);
	btnOptions.src = 'Images/optionsbtn.png';

	player = new Image();
	player.addEventListener("load", function()
	{

	}, false);
	player.src = 'Images/player.png';

	enemy = new Image();
	enemy.addEventListener("load", function()
	{

	}, false);
	enemy.src = 'Images/enemy_walk_right.png';
}

Game.prototype.update=function()
{
	console.log('Updating');

	if (bMenu === true){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(backgroundTex, 0, 0, canvas.width, canvas.height);
		ctx.drawImage(btnPlay, (canvas.width / 2) - 145, (canvas.height / 2) - 160, 290, 160);
		ctx.drawImage(btnOptions, (canvas.width / 2) - 145, (canvas.height / 2) + 160, 290, 160);
	}
	
	if (bPlay === true){
		// first animated sprite
		if (Date.now() - oldTime > 1000 / fps)
		{
			if (imageFrame == 9)
			{
				imageFrame = 0;
			}

			imageFrame++;

			oldTime = Date.now();
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.clearRect(20,0,44,44);
			ctx.drawImage(coin,imageFrame*44, 0,44, 44, 20,0,44,44 );
		}

		//play the swirl effect
		if (Date.now() - swirlOldTime > 1000 / fps)
		{
			if (swirlImgFrame == 6)
			{
			//	swirlImgFrame = 0;
			}

			if (swirlImgFrame < 6)
			{
				swirlImgFrame++;
			}

			swirlOldTime = Date.now();
			ctx.clearRect(20,0,72,72);
			ctx.drawImage(swirl,swirlImgFrame*72, 0,72, 72, 100,100,144,144 );
		}

		if (swirlImgFrame === 6)
		{
			if (Date.now() - enemyOldTime > 1000 / fps)
			{
				if (enemyImgFrame == 9)
				{
					enemyImgFrame = 0;
				}

				enemyImgFrame++;

				enemyOldTime = Date.now();
				//ctx.clearRect(20,0,72,72);
				ctx.drawImage(enemy,enemyImgFrame*64, 0, 64, 64, 100,100,144,144 );
			}
		}
		
	}

	if (bOptions === true)
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height); 
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
}