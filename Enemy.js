var enemy;
var enemyImgFrame = 0;
var enemyOldTime = Date.now();
var enemyXPos, enemyYPos;

var swirl;
var swirlImgFrame = 0;
var swirlOldTime = Date.now();

function Enemy(x, y){
	swirl = new Image();
	swirl.addEventListener("load", function()
	{
	}, false);
	swirl.src = 'Assets/Gameplay/swirleffect.png';

	enemy = new Image();
	enemy.addEventListener("load", function()
	{

	}, false);
	enemy.src = 'Assets/Gameplay/enemy_walk_right.png';

	enemyXPos = x;
	enemyYPos = y;
}

Enemy.prototype.update = function(){

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
			app.ctx.drawImage(swirl,swirlImgFrame*72, 0,72, 72, enemyXPos, enemyYPos ,64,64 );
		}

		//draw & animate the enemy when the swirl has finished
		if (swirlImgFrame === 6)
		{
			if (Date.now() - enemyOldTime > 1000 / fps)
			{
				if (enemyImgFrame == 9)
				{
					enemyImgFrame = 0;
				}

				enemyImgFrame++;

				enemyOldTime = Date.now();
				//app.ctx.clearRect(20,0,72,72);
				//app.ctx.clearRect(0, 0, canvas.width, canvas.height);
				app.ctx.drawImage(enemy,enemyImgFrame*64, 0, 64, 64, enemyXPos, enemyYPos,64,64 );
			}
		}
}