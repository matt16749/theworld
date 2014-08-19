# CesiumLeap

A library that allows Leap Motion navigation for Cesium.

The library depends on the Leap Motion javascript library, a Leap Motion Controller (duh) and has been tested with Cesium version b28, the latest at the time of writing.  You will need to install the Leap Motion software that comes with the device. 

# Installation

`
bower install cesium-leap
`

Then include the library in your source.  
`<script src="path-to-cesium-leap/dist/cesiumLeap.js"></script>`

The library is also AMD compatible, just make sure you configure Leap as a module as well.  At the time of this writing, Leap needed an export shim to work properly with requirejs.  


	require.config({
	    baseUrl: '.',
	    "paths" :{
	        "CesiumLeap" : "path-to-cesium-leap/CesiumLeap",            
	        "Leap" : "path-to-leapjs/leap"
	    },
	    shim :  {
	        Leap : {exports : 'Leap'}
	    }
	});

# Usage:
The library needs the Ellipsoid and the Scene to do its work, pass these in as options:

	var cesiumLeap = new CesiumLeap({
		scene : myScene,
		ellipsoid : myEllipsoid
	});

That's basically it, it will automatically register with the Leap motion when it can and allow you to fly around.  

#Flying directions:

* CesiumLeap works only with one hand.
* There's a built-in delay to allow you to get your hand in a neutral position.  
* If at anytime you want to stop, just make your hand into a fist.
* Moving your hand left or right will move the camera left or right
* Moving your hand forward or backward will move the camera forward and backward.  Note, this means you may be moving *down* in altitude if you are looking at the earth.
* Tilting your hand up and down will have the camera look up and down.
* If you rotate your hand left or right, the camera will rotate that direction.  Try to think of your hand is an airplane, that helps me.
* You can also twist your hand at the wrist and it will "twist" the camera.  If you want to fly around something, it often helps to rotate and twist at the same time, I find the airplane analogy helpful here as well.  

# Known issues:
*  Plugin does not work well in 2D mode.
*  Plugin will work in 2.5D mode (Columbus), but as you zoom closer to ground, fails to slow down appropriately, making it a bit unwieldy. 

# Contributing
Contributions welcome.  Use Pull Requests.  Would love to add gestures and an actual API for leap events.  

# License
MIT Style license

#Building the minified version
`node tools/r.js -o tools/build.js`

#Tests
to run tests:
`python -mSimpleHTTPServer`

