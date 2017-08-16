var coinTex;
var oldTime = Date.now();
var imageFrame = 0;
var coinXPos, coinYPos;

function Coin(x, y){

	//Load coin image
	coinTex = new Image();
	coinTex.addEventListener("load", function() 
	{
	}, false);
	coinTex.src = 'Assets/Gameplay/coin.png';

	coinXPos = x;
	coinYPos = y;
}

Coin.prototype.update = function(){

	app.ctx.drawImage(coinTex,imageFrame*44, 0, 44, 44, coinXPos, coinYPos, 64, 64 );

	//draw & animate the coin
	if (Date.now() - oldTime > 1000 / fps)
	{
		if (imageFrame == 9)
		{
			imageFrame = 0;
		}

		imageFrame++;

		oldTime = Date.now();
		//app.ctx.clearRect(app.coinXPos, app.coinYPos, 64, 64);
		app.ctx.drawImage(coinTex,imageFrame*44, 0, 44, 44, coinXPos, coinYPos, 64, 64 );
		//this.draw();
	}
}

Coin.prototype.draw = function(){
	app.ctx.drawImage(coinTex,imageFrame*44, 0, 44, 44, app.coinXPos, app.coinYPos, 64, 64 );
}
