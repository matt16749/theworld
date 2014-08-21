#The World 
##Using 
<p align="center">
<img src="https://github.com/AnalyticalGraphicsInc/cesium/wiki/logos/Cesium_Logo_Color.jpg" width="50%" />
</p>
  * [Yelp](http://www.yelp.com)

-----------------------------------------------------------------

Made By: 
Matthew Chan.

-----------------------------------------------------------------

###Todo
1. Fix JS JSON
  * Format JSON to WebGL standards and load JSON on line 226, put JSON file in public for test. If works, write corresponding MVC and db.
    * Ex of series: 
      * [["series1",[latitude, longitude, height, ... ]
      * ["series2",[latitude, longitude, height, ... ]]
    *entities are series visualized in 3d on Cesium globe.
  * Replace SandCastle on line 235 with the View that is being rendered. 
    * [SandCastle Source](https://github.com/AnalyticalGraphicsInc/cesium/tree/master/Apps)
    * [Relevant Stack Overflow](http://stackoverflow.com/questions/16331379/javascript-returning-404-error-and-uncaught-reference)
2. Research [WebGL](http://www.lighthouse3d.com/2013/07/webgl-importing-a-json-formatted-3d-model/)



-----------------------------------------------------------------
####From Cesium 1.0

Cesium is a JavaScript library for creating 3D globes and 2D maps in a web browser without a plugin. It uses WebGL for hardware-accelerated graphics, and is cross-platform, cross-browser, and tuned for dynamic-data visualization.

### License ###

[Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0.html).  Cesium is free for both commercial and non-commercial use.

We appreciate attribution by including the Cesium logo and link in your app.
