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
var btnPlay;
var btnOptions;

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
	}

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