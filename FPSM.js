//function FPSM(target){
//	
//	var instance = (function(){
//		
//		this.fps = 0;
//		this.targetFPS = target || 60;
//		this.deviance = 0;
//
//		this.limit = 20,
//		this.counter = 0,
//		this.last = +new Date(),
//		this.lastString = "";
//		
//		function privateer(){
//			
//		}
//		
//		return this;
//		
//	})();
//	
//	FPSM = function(){
//		
//		if (instance.counter++ > instance.limit){
//			var now = +new Date();
//			var _f = 1000 / ((now - instance.last) / instance.counter);
//			instance.last = now;
//			instance.counter = 0;
//			instance.deviance = ((_f.toFixed(2) / instance.targetFPS)*100);
//			instance.fps = _f.toFixed(2);
//			instance.lastString = 'FPS ' + instance.fps + ', ' + instance.deviance + "% of target";
//		}
//
//		return [instance.fps, instance.deviance, instance.lastString];
//		
//		//return instance;
//	}
//	
//	return FPSM();
//}

// singleton, booyah!

(function(){
	
	var	fps = 0
		,deviance = 0
		,limit = 20
		,counter = 0
		,last = +new Date()
		,lastString = ""
	
	,FPSM = function(target){
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
	
	window.FPSM = FPSM;
	
})();

//(function(){
//	
//	//var 
//	//	fps 0
//	//	,deviance: 0
//	//	,limit: 20
//	//	,counter: 0
//	//	,last: +new Date()
//	//	,lastString: "";
//	
//	var FPSM = function(target){
//		return new FPSM.prototype.init(target);
//	},
//	
//	fps = 0
//	,deviance = 0
//	,limit = 20
//	,counter = 0
//	,last = +new Date()
//	,lastString = "";
//	
//	FPSM.prototype = {
//		
//		init: function(target){
//			target = target || 60;
//			if (counter++ > limit){
//				var now = +new Date();
//				var _f = 1000 / ((now - last) / counter);
//				last = now;
//				counter = 0;
//				deviance = ((_f.toFixed(2) / target)*100);
//				fps = _f.toFixed(2);
//				lastString = 'FPS ' + fps + ', ' + deviance + "% of target";
//			}
//
//			return this;
//			//return [this.fps, this.deviance, this.lastString];
//		}
//		
//	}
//	
//	FPSM.fps = fps;
//	FPSM.deviance = deviance;
//	FPSM.lastString = lastString;
//	
//	//FPSM.prototype.init.prototype = FPSM.prototype;
//	
//	window.FPSM = FPSM;
//})();

//var FPSM = (new function(target){
//	
//	var instance = null;
//	
//	this.fps = 0;
//	this.deviance = 0;
//
//	this.limit = 20,
//	this.counter = 0,
//	this.last = +new Date(),
//	this.lastString = "";
//	
//	var self = this;
//	
//	FPSM = function(target){
//		target = target || 60;
//		if (self.counter++ > self.limit){
//			var now = +new Date();
//			var _f = 1000 / ((now - self.last) / self.counter);
//			self.last = now;
//			self.counter = 0;
//			self.deviance = ((_f.toFixed(2) / target)*100);
//			self.fps = _f.toFixed(2);
//			self.lastString = 'FPS ' + self.fps + ', ' + self.deviance + "% of target";
//		}
//
//		return [self.fps, self.deviance, self.lastString];
//	}
//	
//	return FPSM();
//	
//})();
