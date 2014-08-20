// NEED TO LOAD JSON ON LINE 226, or make it into an ajax call. REPLACE Sandcastle on line 235 with what?
// WebGL JSON is an array of series, and each series is an array of two items,
// The first being the series name and the second is an array of repeating latitude, longitude, and height values.
// Ex: 
    //[["series1",[latitude, longitude, height, ... ]
    // ["series2",[latitude, longitude, height, ... ]]


// JSON DATAPOINTS:
// This is just the private properties/functions and their defaults. Public configuration was already defined.
var DataSource = function(name){
  // this._property sets the default property in JS.
this._name = name;
// Event(); references events that can be raised.Think of it like a html tag that you can put event listeners on, but in 3d/spatially. Event is function within Cesium.js
this._changed = new Cesium.Event();
this._error = new Cesium.Event();
this._isLoading = false;
this._loading = new Cesium.Event();
// Entity collection is a collection of entities.
// Entitities are series mapped out onto the globe.
this._entityCollection = new Cesium.EntityCollection();
// Series seem to be one array of datapoints from entity collection. Datapoints are arranged individually as WebGL JSON
// In our case, Series are defined by WebGL JSON whose process is being replicated here. WebGL JSON is taking JSON and visualizing it in 3d.
// More info here: http://stackoverflow.com/questions/20252551/changing-series-name-and-color-in-highcharts
this._seriesNames = [];
this._seriesToDisplay = undefined;
// heightScale is how high the datapoints are graphed relative to the globe itself.
this._heightScale = 10000000;
}

// Allows me to set new values to default properties of my DataSource instances
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
  //Gets collection of entity instances. Entities is series mapped out onto cesium globe. look at line 11 
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
  seriesToDisplay : {
    get : function(){
      return this._seriesToDisplay;
    },
    set : function(value){
      this._seriesToDisplay = value;
      // Iterate over each polyline and set property to be true only if they are part of the selected series.
      var collection = this._entityCollection;
      // Entities are individual db rows.
      var entities = collection.entities;
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
// We are creating a prototype function loadUrl
// Returns a JS promise, which is a proxy for a value not yet known.(since we are loading data from URL.)
// More info here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
// http://wiki.commonjs.org/wiki/Promises/A
DataSource.prototype.loadUrl = function(url){
  // Needs a defined url 
  if (!Cesium.defined(url)){
    throw new Cesium.DeveloperError('url is required')
  }
  // Creates a name based off url
  var name = Cesium.getFilenameFromUri(url);
  // Sets the name if it is different than the current name.
  if (this._name !== name){
      this._name = name;
      this._changed.raiseEvent(this);
  }
  // Use 'when' method to load the URL into a JSON object then process with the 'load' function
  // 'that' variable references the loadUrl instance, used instead of bind since I'm using two different 'this'
  var that = this; 
  return Cesium.when(Cesium.loadJson(url), function(json){
    return that.load(json, url);
  }).otherwise(function(error){
    // catch errors/exceptions that occur during the creation of JS promise via loadUrl function and reject the promise
    this._setLoading(false);
    that._error.raiseEvent(that,error);
    return Cesium.when.reject(error);    
  });
}

// Loads the provided data onto the globe
DataSource.prototype.load = function(data){
  if (!Cesium.defined(data)){
    throw new Cesium.DeveloperError('data is required');
  }
  // Clear out pre-existing data
  this._setLoading(true);
  this._seriesNames.length = 0;
  this._seriesToDisplay = undefined;

  var heightScale = this.heightScale;
  var entities = this._entityCollection;
  // suspend events when making changes to entities.
  entities.suspendEvents();
  entities.removeAll();

  // Loop over each series
  for (var x = 0; x < data.length, x++){
    var series = data[x];
    var seriesName = series[0];
    var coordinates = series[1];

    // Add name of series to list of possible values
    this._seriesNames.push(seriesName);
    // Make the first series the visible one by default;
    var show = x === 0;
    if (show){
      this._seriesToDisplay = seriesName;
    }
    // Loop over each coordinate in series and create entities from the data.
    for (var i = 0; i < coordinates.length; i += 3){
      var latitude = coordinates[i];
      var longitude = coordinates[i + 1];
      var height = coordinates[i +2];
      var color = Cesium.Color.fromHSL((0.6 - (height * 0.5)), 1.0, 0.5);
      var surfacePosition = Cesium.Cartesian3.fromDegrees(longitude,latitude,0);
      var heightPosition = Cesium.Cartesian3.fromDegrees(longitude, latitude, height * heightScale);

    // Create the polylines from WebGL Globe
    var polyline = new Cesium.PolylineGraphics();
    polyline.show = new Cesium.ConstantProperty(show);
    polyline.material = Cesium.ColorMaterialProperty.fromColor(color);
    polyline.width = new Cesium.ConstantProperty(2);
    polyline.followSurface = new Cesium.ConstantProperty(false);
    polyline.positions = new Cesium.ConstantProperty([surfacePosition, heightPosition]);

    // The polyline instance needs to be graphed to an entity.
    var entity = new Cesium.Entity(seriesName + 'index' + i.toString());
    entity.polyline = polyline;

    // Adds a property to the entity that indicates the series name.
    entity.addProperty('seriesName');
    entity.seriesName = seriesName;

    // Add the entity to teh collection of entities
    entities.add(entity);
    }
  }

  // Once data has been processed, raise the changed event by calling resumeEvents();
  entities.resumeEvents();
  this._changed.raiseEvent(this);
  this._setLoading(false);
}

// Default of setLoading is a function that takes isLoading as a parameter
DataSource.prototype._setLoading = function(isLoading){
  if (this._isLoading !== isLoading){
    this._isLoading = isLoading;
    this._loading.raiseEvent(this, isLoading);
  }
}

// Creates instance of DataSource to be used on our viewer.
var dataSource = new DataSource();
dataSource.loadUrl('').then(function(){
  // After initial load, create buttons to let user switch among series.
  function createSeriesSetter(seriesName){
    return function(){
      dataSource.seriesToDisplay = seriesName;
    }
  }
  for (var i = 0; i < dataSource.seriesName.length; i++){
    var seriesName = dataSource.seriesNames[i];
    Sandcastle.addToolbarButton(seriesName, createSeriesSetter(seriesName));
  }
});

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

viewer.clock.shouldAnimate = false;
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
