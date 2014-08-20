#The World 
##Using [Cesium 1.0](http://cesiumjs.org/2013/04/12/Cesium-up-and-running/)
-----------------------------------------------------------------
###Todo
1. Setup JSON datasource JS code 
  * Format JSON to WebGL standards and load JSON on line 226, put JSON file in public for test. If works, write corresponding MVC and db.
    * Ex of series: 
      * [["series1",[latitude, longitude, height, ... ]
      * ["series2",[latitude, longitude, height, ... ]]
    *entities are series visualized in 3d on Cesium globe.
  * Replace SandCastle on line 235 with the View that is being rendered. How?
2. Research [WebGL](http://www.lighthouse3d.com/2013/07/webgl-importing-a-json-formatted-3d-model/)
4. Create database, model, and corresponding route for API call.
5. Research APIs that return coordinates.


-----------------------------------------------------------------
####From Cesium 1.0

<p align="center">
<img src="https://github.com/AnalyticalGraphicsInc/cesium/wiki/logos/Cesium_Logo_Color.jpg" width="50%" />
</p>

Cesium is a JavaScript library for creating 3D globes and 2D maps in a web browser without a plugin. It uses WebGL for hardware-accelerated graphics, and is cross-platform, cross-browser, and tuned for dynamic-data visualization.

### License ###

[Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0.html).  Cesium is free for both commercial and non-commercial use.

We appreciate attribution by including the Cesium logo and link in your app.
