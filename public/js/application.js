// Cesium.Viewer Creates the fullscreen sandbox. 
// cesiumContainer creates the ellipsoid.

// // Creates ESRI textural layer on glob
// var viewer = new Cesium.Viewer('cesiumContainer', {
//     imageryProvider : new Cesium.ArcGisMapServerImageryProvider({
//         url : 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
//     }),
//     baseLayerPicker : false
// });
//   //Adds NASA Black Marble layer on top of ESRI layer
//   var layers = viewer.scene.imageryLayers;
//   var blackMarble = layers.addImageryProvider(new Cesium.TileMapServiceImageryProvider({
//       url : '//cesiumjs.org/tilesets/imagery/blackmarble',
//       maximumLevel : 8,
//       credit : 'Black Marble imagery courtesy NASA Earth Observatory'
//   }));
//   // Blends BlackMarble layer with ESRI layer.
//   blackMarble.alpha = 0.5;
//   // Increase Brightness of lights
//   blackMarble.brightness = 2.0;



// // Bing Maps
var viewer = new Cesium.Viewer('cesiumContainer');

//   var layers = viewer.scene.imageryLayers;
//   var blackMarble = layers.addImageryProvider(new Cesium.TileMapServiceImageryProvider({
//       url : '//cesiumjs.org/tilesets/imagery/blackmarble',
//       maximumLevel : 8,
//       credit : 'Black Marble imagery courtesy NASA Earth Observatory'
//   }));
// // OPTIONAL: Blends BlackMarble layer with Bing Maps Layer.
//   blackMarble.alpha = 0.5;
// // Increase Brightness of lights
//   blackMarble.brightness = 2.0;

