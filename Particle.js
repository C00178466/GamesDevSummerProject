function Particle(x, y)
{
  this.x = this.oldX = x;
  this.y = this.oldY = y;
}

Particle.prototype.integrate = function()
{
  var velocityX = (this.x - this.oldX) * 0.999;
  var velocityY = (this.y - this.oldY) * 0.999;

  this.oldX = this.x;
  this.oldY = this.y;

  this.x += velocityX;
  this.y += velocityY;
}

Particle.prototype.attract = function(x, y)
{
  var dx = x - this.x;
  var dy = y - this.y;
  var distance = Math.sqrt(dx * dx + dy * dy);  // Pythagorean theorum

  this.x += dx / distance;
  this.y += dy / distance;
}

Particle.prototype.draw = function()
{
	app.ctx.strokeStyle = '#ffffff';
  app.ctx.lineWidth = 2;
  app.ctx.beginPath();
  app.ctx.moveTo(this.oldX, this.oldY);
  app.ctx.lineTo(this.x, this.y);
  app.ctx.stroke();
}

