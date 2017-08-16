

function Coin(x, y){
	var coinTex;
	var oldTime;
	var imageFrame;
	var coinXPos, coinYPos;

	//Load coin image
	app.coinTex = new Image();
	app.coinTex.addEventListener("load", function() 
	{
	}, false);
	app.coinTex.src = 'Assets/Gameplay/coin.png';

	app.imageFrame = 0;
	app.oldTime = Date.now();

	app.coinXPos = x;
	app.coinYPos = y;
}

Coin.prototype.update = function(){

	app.ctx.drawImage(app.coinTex, app.imageFrame*44, 0, 44, 44, app.coinXPos, app.coinYPos, 64, 64 );

	//draw & animate the coin
	if (Date.now() - app.oldTime > 1000 / fps)
	{
		if (app.imageFrame == 9)
		{
			app.imageFrame = 0;
		}

		app.imageFrame++;

		app.oldTime = Date.now();
		//app.ctx.clearRect(app.coinXPos, app.coinYPos, 64, 64);
		//app.ctx.drawImage(app.coinTex, app.imageFrame*44, 0, 44, 44, app.coinXPos, app.coinYPos, 64, 64 );
		this.draw();
	}
}

Coin.prototype.draw = function(){
	//app.ctx.drawImage(coinTex,imageFrame*44, 0, 44, 44, app.coinXPos, app.coinYPos, 64, 64 );
	app.ctx.drawImage(app.coinTex, app.imageFrame*44, 0, 44, 44, app.coinXPos, app.coinYPos, 64, 64 );
}
