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
 * No instantiation is necessary, as it is a singleton. Continual instantiation
 * will not break anything, but would be performance prohibitive.
 * 
 */

var MM = (function(){
	
	var	mps = 0 // marks per second
		,deviance = 0 // actual % of target marks per second
		,limit = 20 // polling interval: compute every 20 times mark is called
		,counter = 0 // how close to the limit we currently are
		,last = +new Date() // the last time polled
		,now = +new Date() // uh...
		,temp = 0 // raw mps
		,avgf = 0 // avg time per frame
		,delta = 0 // ms since last poll
	
	,MM = function(target){
		target = target || 60;
		if (counter++ > limit){
			now = +new Date();
			delta = now - last;
			avgf = delta / counter;
			temp = (1000 / (avgf)).toFixed(2);
			last = now;
			deviance = ((temp / target)*100).toFixed(2);
			mps = temp;
			counter = 0;
		}

		return [mps, deviance, avgf.toFixed(2), delta];
	};

	return MM;
	
})();