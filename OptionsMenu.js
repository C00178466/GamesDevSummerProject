function OptionsMenu()
{

}

OptionsMenu.prototype.update = function()
{
	app.ctx.clearRect(0, 0, canvas.width, canvas.height);
	app.ctx.drawImage(backgroundTex, 0, 0, canvas.width, canvas.height);
}