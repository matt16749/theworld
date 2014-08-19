// JSON DATAPOINTS:
// This is just the private variables and their defaults. Public configuration was already defined.
var DataSource = function(name){
this._name = name;
// Event(); references events that event listeners can look for.
this._changes = new Cesium.Event();
this._error = new Cesium.Event();
this._isLoading = false;
this._loading = new Cesium.Event();
// Entity collection is a collection of entities.
// Entities are JS syntax for rows in a database. http://azure.microsoft.com/en-us/documentation/articles/storage-nodejs-how-to-use-table-storage/
this._entityCollection = new Cesium.EntityCollection();
// Series seem to be sets of datapoints from entity collection. Think ORM, Entity is db side, while Series is JS visualization side.
// More info here: http://stackoverflow.com/questions/20252551/changing-series-name-and-color-in-highcharts
this._seriesNames = [];
this._seriesToDisplay = undefined;
// heightScale is how high the datapoints are graphed relative to the globe itself.
this._heightScale = 10000000;
}

// Allows me to set properties of my DataSource instances
// Properties are attributes in js. Ex: person.age 
// More info here: http://www.w3schools.com/js/js_properties.asp
Object.defineProperties(DataSource.prototype,{

})


// VISUALIZATIONS:
// Bing Maps
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

// Adds dataSource to be used on cesium globe
viewer.dataSources.add(dataSource);



// Optionals
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
