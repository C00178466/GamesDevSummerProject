var coin;
var oldTime = Date.now();
var imageFrame = 0;

function Coin(){

	//Load coin image
	coin = new Image();
	coin.addEventListener("load", function() 
	{
	}, false);
	coin.src = 'Assets/Gameplay/coin.png';

}

Coin.prototype.update = function(){
	//app.ctx.clearRect(0, 0, canvas.width, canvas.height);

	//draw & animate the coin
	if (Date.now() - oldTime > 1000 / fps)
	{
		if (imageFrame == 9)
		{
			imageFrame = 0;
		}

		imageFrame++;

		oldTime = Date.now();
		app.ctx.clearRect(20,0,44,44);
		app.ctx.drawImage(coin,imageFrame*44, 0,44, 44, 20,0,44,44 );
	}
}
