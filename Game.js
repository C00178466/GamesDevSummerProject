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

var mainMenu;
var optMenu;
var levelLdr;

var sound_background;

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

	levelLdr = new Level();
	optMenu = new OptionsMenu();
	mainMenu = new MainMenu();

	sound_background = new Audio("Assets/Sound/background.wav");
	sound_background.loop = true;
	sound_background.play();
}

Game.prototype.update=function()
{
	console.log('Updating');
	
	app.ctx.clearRect(0, 0, canvas.width, canvas.height);

	//if main menu is showing
	if (bMenu === true){
		mainMenu.update();
	}
	
	//if gameplay is running
	if (bPlay === true){
		levelLdr.update();
	}

	//if options menu is showing
	if (bOptions === true)
	{
		optMenu.update();
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
    	//Pause Button
    	if (touches[0].clientX >= (canvas.width / 7) &&
	    	touches[0].clientX <= (canvas.width / 7) + 216 &&
	    	touches[0].clientY >= ((canvas.height / 7) * 6)  &&
	    	touches[0].clientY <= ((canvas.height / 7) * 6 ) + 96)
	    {
	    	console.log("Pause");
	    }
    }

    if (bOptions === true)
    {
    	
    }
}