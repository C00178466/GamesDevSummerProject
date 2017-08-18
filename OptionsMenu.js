var soundOnTex;
var soundOffTex;
var b_soundOn, b_soundOff;

function OptionsMenu()
{
	soundOnTex = new Image();
	soundOnTex.src = "Assets/Menu/Options/sound_on.png";

	soundOffTex = new Image();
	soundOffTex.src = "Assets/Menu/Options/sound_off.png";
}

OptionsMenu.prototype.update = function()
{
	app.ctx.clearRect(0, 0, canvas.width, canvas.height);
	app.ctx.drawImage(backgroundTex, 0, 0, canvas.width, canvas.height);

	app.ctx.drawImage(soundOnTex, (canvas.width / 2) + 50, (canvas.height / 4) - 16, 98, 98);
	app.ctx.drawImage(soundOffTex, (canvas.width / 2) - 100, (canvas.height / 4) - 16, 98, 98);

	ChangeSound();	
}

function ChangeSound()
{
	app.ctx.fillStyle = "rgb(255, 255, 255)";
	app.ctx.font = "64px Helvetica";
	app.ctx.textAlign = "left";
	app.ctx.textBaseline = "top";
	app.ctx.fillText("Sound: ", (canvas.width / 7), (canvas.height / 4));

	if (b_soundOn)
	{
		app.ctx.fillStyle = "rgb(255, 255, 255)";
		app.ctx.font = "64px Helvetica";
		app.ctx.textAlign = "left";
		app.ctx.textBaseline = "top";
		app.ctx.fillText("On", (canvas.width / 7), (canvas.height / 4));
	}
	
	if (b_soundOff)
	{
		app.ctx.fillStyle = "rgb(255, 255, 255)";
		app.ctx.font = "64px Helvetica";
		app.ctx.textAlign = "left";
		app.ctx.textBaseline = "top";
		app.ctx.fillText("Off", (canvas.width / 7), (canvas.height / 4));
	}
}