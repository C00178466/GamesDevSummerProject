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
app.levelLdr;
var tutLevel;

var sound_background;

app.bMenu = true;
app.bPlay = false;
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

	app.levelLdr = new Level();
	app.levelLdr.init();
	optMenu = new OptionsMenu();
	mainMenu = new MainMenu();
	tutLevel = new TutorialLevel();
	tutLevel.init();

	sound_background = new Audio("Assets/Sound/background.mp3");
	sound_background.loop = true;
	sound_background.play();
}

Game.prototype.update=function()
{
	console.log('Updating');
	app.ctx.clearRect(0, 0, canvas.width, canvas.height);

	//if main menu is showing
	if (app.bMenu){
		mainMenu.update();
	}
	
	//if gameplay is running
	if (app.bPlay){
		app.levelLdr.update();
	}

	//if tutorial level is
	if (bTutorial){
		tutLevel.update();

		//Escape button to exit the tutorial
		if (27 in keysDown)
		{
			tutLevel.init();
			app.bMenu = true;
			bTutorial = false;
		}

		if (tutLevel.CollisionWithPortal())
		{
			app.bMenu = true;
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

    if (app.bMenu)
    {
    	if (touches[0].clientX >= (canvas.width / 2) - 145 &&
	    	touches[0].clientX <= (canvas.width / 2) + 145 &&
	    	touches[0].clientY >= (canvas.height / 2) - 320 &&
	    	touches[0].clientY <= (canvas.height / 2) - 160)
	    {
	    	console.log("Play Button Pressed");
	    	app.bMenu = false;
	    	app.bPlay = true;
	    	bOptions = false;
	    }

	    if (touches[0].clientX >= (canvas.width / 2) - 145 &&
	    	touches[0].clientX <= (canvas.width / 2) + 145 &&
	    	touches[0].clientY >= (canvas.height / 2) - 90 &&
	    	touches[0].clientY <= (canvas.height / 2) + 70)
	    {
	    	console.log("Tutorial Button Pressed");
	    	app.bMenu = false;
	    	app.bPlay = false;
	    	bTutorial = true;
	    	bOptions = false;
	    }

	    if (touches[0].clientX >= (canvas.width / 2) - 145 &&
	    	touches[0].clientX <= (canvas.width / 2) + 145 &&
	    	touches[0].clientY >= (canvas.height / 2) + 150 &&
	    	touches[0].clientY <= (canvas.height / 2) + 310)
	    {
	    	console.log("Options Button Pressed");
	    	app.bMenu = false;
	    	app.bPlay = false;
	    	bTutorial = false;
	    	bOptions = true;
	    }
    }

    if (app.bPlay)
    {
    	if (touches[0].clientX >= (canvas.width / 2) - 145 &&
	    	touches[0].clientX <= (canvas.width / 2) + 145 &&
	    	touches[0].clientY >= (canvas.height / 4) * 3 &&
	    	touches[0].clientY <= ((canvas.height / 4) * 3) + 190)
	    {
	    	console.log("Back Pressed");
	    	app.bMenu = true;
	    	app.bPlay = false;
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
	    	app.bMenu = true;
	    	bOptions = false;
	    }
    }
}