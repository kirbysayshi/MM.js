/*
 * MarkMeter
 *
 *
 *
 */

// singleton, booyah!

(function(){
	
	var	fps = 0
		,deviance = 0
		,limit = 20
		,counter = 0
		,last = +new Date()
		,lastString = ""
	
	,MM = function(target){
		target = target || 60;
		if (counter++ > limit){
			var now = +new Date();
			var _f = 1000 / ((now - last) / counter);
			last = now;
			counter = 0;
			deviance = ((_f.toFixed(2) / target)*100);
			fps = _f.toFixed(2);
			lastString = 'FPS ' + fps + ', ' + deviance + "% of target";
		}

		return [fps, deviance, lastString];
	};
	
	window.MM = MM;
	
})();