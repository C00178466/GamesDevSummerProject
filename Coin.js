function Coin(x, y){
	var img;
	var oldTime;
	var imageFrame;
	var XPos;
	var YPos;	
}

Coin.prototype.init = function(x, y){

	//Load coin image
	this.img = new Image();
	this.img.src = 'Assets/Gameplay/coin.png';

	this.imageFrame = 0;
	this.oldTime = Date.now();

	this.XPos = x;
	this.YPos = y;
}

Coin.prototype.update = function(){

	app.ctx.drawImage(this.img, this.imageFrame*44, 0, 44, 44, this.XPos, this.YPos, 64, 64 );

	//draw & animate the coin
	if (Date.now() - this.oldTime > 1000 / fps)
	{
		if (this.imageFrame == 9)
		{
			this.imageFrame = 0;
		}

		this.imageFrame++;

		this.oldTime = Date.now();
		//app.ctx.clearRect(app.coinXPos, app.coinYPos, 64, 64);
		//app.ctx.drawImage(app.coinTex, app.imageFrame*44, 0, 44, 44, app.coinXPos, app.coinYPos, 64, 64 );
		this.draw();
	}
}

Coin.prototype.draw = function(){
	//app.ctx.drawImage(coinTex,imageFrame*44, 0, 44, 44, app.coinXPos, app.coinYPos, 64, 64 );
	app.ctx.drawImage(this.img, this.imageFrame*44, 0, 44, 44, this.XPos, this.YPos, 64, 64 );
}
