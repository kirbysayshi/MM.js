MarkMeter
=========

Quick counter for keeping track of "marks" per second, whether they be frames, posts, whatever. It polls for time every 20 marks, or the value of the second parameter passed in.

Usage
=====

    var m = MM(60); // m contains: 
	       // [marks per second, n% of 60 MPS, average time per frame, delta from last poll]
    console.log(  m[0] + 'mps, ' + m[1] + "% of target, " + m[2] + "ms, " + m[3] + "ms"; );

No instantiation is necessary, as it is a singleton and only returns an array.