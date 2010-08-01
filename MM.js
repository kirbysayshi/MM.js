/* Copyright (c) 2010 Andrew Petersen
 * 
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 * 
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 * 
 *    1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 * 
 *    2. Altered source versions must be plainly marked as such, and must not be
 *    misrepresented as being the original software.
 * 
 *    3. This notice may not be removed or altered from any source
 *    distribution.
 *
 */

/*
 * MarkMeter: generic "marks per second" meter.
 * Can be used to count frames, time, whatever, for simple monitoring.
 * 
 * Usage:
 *     var m = MM(60); // m contains: 
 * 	       // [marks per second, n% of 60 MPS, average time per frame, delta from last poll]
 *     console.log(  m[0] + 'mps, ' + m[1] + "% of target, " + m[2] + "ms, " + m[3] + "ms"; );
 *
 * No instantiation is necessary, as it is a singleton, and only returns an array.
 * 
 */

var MM = (function(){
	
	// let's use the fastest array we can find
	var MMArrayType = null;
	if(typeof Float32Array != 'undefined') {
		MMArrayType = Float32Array;
	} else if(typeof WebGLFloatArray != 'undefined') {
		MMArrayType = WebGLFloatArray;
	} else {
		MMArrayType = Array;
	}
	
	var	mps = 0 // marks per second
		,deviance = 0 // actual % of target marks per second
		,counter = 0 // how close to the polling interval	 we currently are
		,last = +new Date() // the last time polled
		,now = +new Date() // uh...
		,temp = 0 // raw mps
		,avgf = 0 // avg time per frame
		,delta = 0 // ms since last poll
		,ans = new MMArrayType(4); // [mps, deviance, avg time per frame, ms since last poll]
	
	,MM = function(target, pInterval){
		target = target || 60; // target FPS
		pInterval = pInterval || 20; // polling interval: compute every 20 times mark is called
		if (counter++ > pInterval){
			now = +new Date();
			delta = now - last;
			avgf = (delta / counter).toFixed(2);
			last = now;
			ans[0] = 1000 / avgf;
			ans[1] = ((temp / target)*100).toFixed(2);
			ans[2] = avgf;
			ans[3] = delta;
			counter = 0;
		}

		return ans;
	};

	return MM;
	
})();