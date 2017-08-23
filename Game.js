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

var keysDown = {};
addEventListener("keydown", function(e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) {
	delete keysDown[e.keyCode];
}, false);

var test;
var touchXPos, touchYPos;

var mainMenu;
var optMenu;
var levelLdr;
var tutLevel;

var sound_background;

var bMenu = true;
var bPlay = false;
var bOptions = false;
var bTutorial = false;

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
	tutLevel = new TutorialLevel();
	tutLevel.init();

	sound_background = new Audio("Assets/Sound/background.wav");
	sound_background.loop = true;
}

Game.prototype.update=function()
{
	console.log('Updating');
	
	app.ctx.clearRect(0, 0, canvas.width, canvas.height);

	//if main menu is showing
	if (bMenu){
		mainMenu.update();
	}
	
	//if gameplay is running
	if (bPlay){
		levelLdr.update();
	}

	//if tutorial level is
	if (bTutorial){
		tutLevel.update();

		if (27 in keysDown)
		{
			bMenu = true;
			bTutorial = false;
		}

		if (tutLevel.CollisionWithPortal())
		{
			bMenu = true;
			bTutorial = false;
		}
	}

	//if options menu is showing
	if (bOptions)
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

    if (bMenu)
    {
    	if (touches[0].clientX >= (canvas.width / 2) - 145 &&
	    	touches[0].clientX <= (canvas.width / 2) + 145 &&
	    	touches[0].clientY >= (canvas.height / 2) - 320 &&
	    	touches[0].clientY <= (canvas.height / 2) - 160)
	    {
	    	console.log("Play Button Pressed");
	    	bMenu = false;
	    	bPlay = true;
	    	bOptions = false;
	    }

	    if (touches[0].clientX >= (canvas.width / 2) - 145 &&
	    	touches[0].clientX <= (canvas.width / 2) + 145 &&
	    	touches[0].clientY >= (canvas.height / 2) - 90 &&
	    	touches[0].clientY <= (canvas.height / 2) + 70)
	    {
	    	console.log("Tutorial Button Pressed");
	    	bMenu = false;
	    	bPlay = false;
	    	bTutorial = true;
	    	bOptions = false;
	    }

	    if (touches[0].clientX >= (canvas.width / 2) - 145 &&
	    	touches[0].clientX <= (canvas.width / 2) + 145 &&
	    	touches[0].clientY >= (canvas.height / 2) + 150 &&
	    	touches[0].clientY <= (canvas.height / 2) + 310)
	    {
	    	console.log("Options Button Pressed");
	    	bMenu = false;
	    	bPlay = false;
	    	bTutorial = false;
	    	bOptions = true;
	    }
    }

    if (bPlay)
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

    if (bOptions)
    {
    	//turn sound on/off
    	if (touches[0].clientX >= (canvas.width / 2) + 50 &&
	    	touches[0].clientX <= (canvas.width / 2) + 148 &&
	    	touches[0].clientY >= (canvas.height / 4) - 16  &&
	    	touches[0].clientY <= ((canvas.height / 4) + 82))
	    {
	    	console.log("Sound On");
	    	sound_background.muted = false;
	    }

	    if (touches[0].clientX >= (canvas.width / 2) - 100 &&
	    	touches[0].clientX <= (canvas.width / 2) - 2 &&
	    	touches[0].clientY >= (canvas.height / 4) - 16 &&
	    	touches[0].clientY <= ((canvas.height / 4) + 82))
	    {
	    	console.log("Sound Off");
	    	sound_background.muted = true;
	    }

	    if (touches[0].clientX >= (canvas.width / 2) - 145 &&
	    	touches[0].clientX <= (canvas.width / 2) + 145 &&
	    	touches[0].clientY >= (canvas.height / 4) * 3 &&
	    	touches[0].clientY <= ((canvas.height / 4) * 3) + 190)
	    {
	    	console.log("Back Pressed");
	    	bMenu = true;
	    	bOptions = false;
	    }
    }
}