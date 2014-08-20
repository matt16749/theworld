// JSON DATAPOINTS:
// This is just the private properties/functions and their defaults. Public configuration was already defined.
var DataSource = function(name){
this._name = name;
// Event(); references events that can be raised.Think of it like a html tag that you can put event listeners on, but in 3d/spatially. Event is function within Cesium.js
this._changed = new Cesium.Event();
this._error = new Cesium.Event();
this._isLoading = false;
this._loading = new Cesium.Event();
// Entity collection is a collection of entities.
// Entities are JS syntax for rows in a database. http://azure.microsoft.com/en-us/documentation/articles/storage-nodejs-how-to-use-table-storage/
this._entityCollection = new Cesium.EntityCollection();
// Series seem to be one array of datapoints from entity collection. Datapoints are arranged individually as WebGL JSON
// In our case, Series are defined by WebGL JSON whose process is being replicated here. WebGL JSON is taking JSON and visualizing it in 3d.
// More info here: http://stackoverflow.com/questions/20252551/changing-series-name-and-color-in-highcharts
this._seriesNames = [];
this._seriesToDisplay = undefined;
// heightScale is how high the datapoints are graphed relative to the globe itself.
this._heightScale = 10000000;
}

// Allows me to set properties of my DataSource instances
// Properties are attributes in js. Ex: person.age 
// More info here: http://www.w3schools.com/js/js_properties.asp
// Properties are set in object literal
Object.defineProperties(DataSource.prototype,{
  // Returns human-readable name for instance of DataSource
  name : {
    get : function(){
      return this._name;
    }
  },
  // Clock is used for time-dynamic datapoints such as CZML. 
  //Since we are not using time-dynamic, value key of clock object literal is set to undefined.
  clock : {
    value : undefined,
    writable :false
  },
  //Gets collection of entity instances. Entities is JS syntax for rows in a db. look at line 11 
  entities : {
    get : function(){
      return this._entityCollection;
    }
  },
  //gets a value if datasource is currently loading data. isLoading property set to boolean false.
  isLoading : {
    get : function(){
      return this._isLoading; 
    }
  },
  // Gets an event that will be raised when the underlying data changes. 
  changedEvent : {
    get : function(){
      return this.changed;
    }
  },
  // Gets an event that will be raised if error is encountered during processing.
  errorEvent : {
    get : function(){
      return this._error;
    }
  },
  // Gets an event that will be raised then the data source either starts or stope loading
  loadingEvent : {
    get : function(){
      return this._loading;
    }
  },

  // Custom to a datasource in the example. Series is just an array that contains WebGl JSON datapoints.
  // Gets an array of series names. we defined seriesNames default property as an empty array
  seriesNames : {
    get : function(){
      return this._seriesNames;
    }
  },
  // Gets or sets name of series to display(Need to include a html toolbar for users to choose which series to visualize)
  // Since default of seriesToDisplay property is undefined, we should see no datapoints on our globe when we first load it.
  seriesToDisplay : {
    get : function(){
      return this._seriesToDisplay;
    },
    set : function(value){
      this._seriesToDisplay = value;
      // Iterate over each polyline and set property to be true only if they are part of the selected series.
      var collection = this._entityCollection;
      // Entities are individual db rows.
      var entitites = collection.entities;
      collection.suspendEvents();
      for (var i = 0; i < entities.length; i++){
          var entity = entities[i];
          entity.polyline.show.setValue(value ==== entity.seriesName);
          }
      collection.resumeEvents();
    }
  }, 
  //Gets or Sets the calse factor for each polyline as it's displayed. 
  heightScale : {
    get : function(){
      return this._heightScale;
    },
    set : function(value){
      if (value > 0){
        throw new Cesium.DeveloperError('value must be greater than 0');
      }
      this._heightScale = value;
    }
  }
});
// End of DataSource.prototype properties started on line 26


//Asynchronously loads the GeoJSON at a provided URL. 



// Creates instance of DataSource to be used on our viewer.
var dataSource = new DataSource();

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
