var backgroundTex;
var btnPlay;
var btnOptions;
var btnTutorial;

function MainMenu()
{
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

	btnTutorial = new Image();
	btnTutorial.addEventListener("load", function()
	{

	}, false);
	btnTutorial.src = 'Assets/Menu/tutorialbtn.png';
}

MainMenu.prototype.update = function()
{
	app.ctx.clearRect(0, 0, canvas.width, canvas.height);
	app.ctx.drawImage(backgroundTex, 0, 0, canvas.width, canvas.height);
	app.ctx.drawImage(btnPlay, (canvas.width / 2) - 145, (canvas.height / 2) - 320, 290, 160);
	app.ctx.drawImage(btnTutorial, (canvas.width / 2) - 145, (canvas.height / 2) - 90, 290, 160);
	app.ctx.drawImage(btnOptions, (canvas.width / 2) - 145, (canvas.height / 2) + 150, 290, 160);
}