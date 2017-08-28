function PowerBank(){
	var img;
	var xPos;
	var yPos;	
}

PowerBank.prototype.init = function(x, y){

	//Load coin image
	this.img = new Image();
	this.img.src = 'Assets/Gameplay/Level2/power_sprite.png';

	this.xPos = x;
	this.yPos = y;
}

PowerBank.prototype.update = function(){
	this.draw();
}

PowerBank.prototype.draw = function(){
	app.ctx.drawImage(this.img, this.xPos, this.yPos, 98, 98);
}