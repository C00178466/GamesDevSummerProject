var backgroundTex;
var btnPlay;
var btnOptions;

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
}

MainMenu.prototype.update = function()
{
	app.ctx.clearRect(0, 0, canvas.width, canvas.height);
	app.ctx.drawImage(backgroundTex, 0, 0, canvas.width, canvas.height);
	app.ctx.drawImage(btnPlay, (canvas.width / 2) - 145, (canvas.height / 2) - 160, 290, 160);
	app.ctx.drawImage(btnOptions, (canvas.width / 2) - 145, (canvas.height / 2) + 160, 290, 160);
}