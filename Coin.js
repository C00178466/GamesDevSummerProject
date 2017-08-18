function Coin(){
	var img;
	var oldTime;
	var imageFrame;
	var xPos;
	var yPos;	
}

Coin.prototype.init = function(x, y){

	//Load coin image
	this.img = new Image();
	this.img.src = 'Assets/Gameplay/coin.png';

	this.imageFrame = 0;
	this.oldTime = Date.now();

	this.xPos = x;
	this.yPos = y;
}

Coin.prototype.update = function(){

	app.ctx.drawImage(this.img, this.imageFrame*44, 0, 44, 44, this.xPos, this.yPos, 64, 64 );

	//draw & animate the coin
	if (Date.now() - this.oldTime > 1000 / fps)
	{
		if (this.imageFrame == 9)
		{
			this.imageFrame = 0;
		}

		this.imageFrame++;

		this.oldTime = Date.now();
		this.draw();
	}
}

Coin.prototype.draw = function(){
	//app.ctx.drawImage(coinTex,imageFrame*44, 0, 44, 44, app.coinXPos, app.coinYPos, 64, 64 );
	app.ctx.drawImage(this.img, this.imageFrame*44, 0, 44, 44, this.xPos, this.yPos, 64, 64 );
}
