var coin;
var oldTime = Date.now();
var imageFrame = 0;
var coinXPos, coinYPos;

function Coin(x, y){

	//Load coin image
	coin = new Image();
	coin.addEventListener("load", function() 
	{
	}, false);
	coin.src = 'Assets/Gameplay/coin.png';

	app.coinXPos = x;
	app.coinYPos = y;
}

Coin.prototype.update = function(){

	//draw & animate the coin
	if (Date.now() - oldTime > 1000 / fps)
	{
		if (imageFrame == 9)
		{
			imageFrame = 0;
		}

		imageFrame++;

		oldTime = Date.now();
		//app.ctx.clearRect(20,0,44,44);
		app.ctx.drawImage(coin,imageFrame*44, 0, 44, 44, app.coinXPos, app.coinYPos, 64, 64 );
	}
}

