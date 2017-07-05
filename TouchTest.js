function TouchTest()
{

}

TouchTest.prototype.is_touch_device = function()
{
	console.log("Touch Device");
	return 'ontouchstart' in window;
}

