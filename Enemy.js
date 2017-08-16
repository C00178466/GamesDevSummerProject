var enemyTex;
var enemyImgFrame = 0;
var enemyOldTime = Date.now();
var enemyXPos, enemyYPos;

var swirl;
var swirlImgFrame = 0;
var swirlOldTime = Date.now();
var swirlXPos, swirlYPos;

function Enemy(x, y){
	swirl = new Image();
	swirl.addEventListener("load", function()
	{
	}, false);
	swirl.src = 'Assets/Gameplay/swirleffect.png';

	enemyTex = new Image();
	enemyTex.addEventListener("load", function()
	{

	}, false);
	enemyTex.src = 'Assets/Gameplay/player_walk_strip_right.png';

	this.enemyXPos = x;
	this.enemyYPos = y;

	swirlXPos = this.enemyXPos;
	swirlYPos = this.enemyYPos;
}

Enemy.prototype.update = function(){

	app.ctx.drawImage(swirl, swirlImgFrame*72, 0, 72, 72, swirlXPos, swirlYPos, 64, 90 );

	//play the swirl effect
	if (Date.now() - swirlOldTime > 1000 / fps)
	{
		if (swirlImgFrame == 6)
		{
		//	swirlImgFrame = 0;
		}

		if (swirlImgFrame < 6)
		{
			swirlImgFrame++;
		}

		swirlOldTime = Date.now();
		//app.ctx.clearRect(20,0,72,72);
		app.ctx.drawImage(swirl,swirlImgFrame*72, 0,72, 72, swirlXPos, swirlYPos ,64,90 );
	}

	//
	//draw & animate the enemy when the swirl has finished
	if (swirlImgFrame === 6)
	{
		app.ctx.drawImage(enemyTex, enemyImgFrame*35, 0, 35, 57, this.enemyXPos, this.enemyYPos, 64, 90 );

		if (Date.now() - enemyOldTime > 1000 / fps)
		{
			if (enemyImgFrame == 5)
			{
				enemyImgFrame = 0;
			}

			enemyImgFrame++;

			enemyOldTime = Date.now();
			//app.ctx.clearRect(20,0,72,72);
			//app.ctx.clearRect(0, 0, canvas.width, canvas.height);
			app.ctx.drawImage(enemyTex,enemyImgFrame*35, 0, 35, 57, this.enemyXPos, this.enemyYPos,64,90 );
		}
	}
}