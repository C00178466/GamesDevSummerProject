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

Game.prototype.update=function()
{
	console.log('Updating');

	// first animated sprite
	if (Date.now() - oldTime > 1000 / fps)
	{
		if (imageFrame == 9)
		{
			imageFrame = 0;
		}

		imageFrame++;

		oldTime = Date.now();
		ctx.clearRect(20,0,44,44);
		ctx.drawImage(coin,imageFrame*44, 0,44, 44, 20,0,44,44 );
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
}