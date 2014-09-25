var DataSource = function(name){
this._name = name;
this._changed = new Cesium.Event();
this._error = new Cesium.Event();
this._isLoading = false;
this._loading = new Cesium.Event();
this._entityCollection = new Cesium.EntityCollection();
this._seriesNames = [];
this._seriesToDisplay = undefined;
this._heightScale = 10000000;
}

Object.defineProperties(DataSource.prototype,{
  name : {
    get : function(){
      return this._name;
    }
  },
  clock : {
    value : undefined,
    writable :false
  },
  entities : {
    get : function(){
      return this._entityCollection;
    }
  },
  isLoading : {
    get : function(){
      return this._isLoading; 
    }
  },
  changedEvent : {
    get : function(){
      return this.changed;
    }
  },
  errorEvent : {
    get : function(){
      return this._error;
    }
  },
  loadingEvent : {
    get : function(){
      return this._loading;
    }
  },

  seriesNames : {
    get : function(){
      return this._seriesNames;
    }
  },
  seriesToDisplay : {
    get : function(){
      return this._seriesToDisplay;
    },
    set : function(value){
      this._seriesToDisplay = value;
      var collection = this._entityCollection;
      var entities = collection.entities;
      collection.suspendEvents();
      for (var i = 0; i < entities.length; i++){
          var entity = entities[i];
          entity.polyline.show.setValue(value === entity.seriesName);
          }
      collection.resumeEvents();
    }
  }, 
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

DataSource.prototype.loadUrl = function(url){
  if (!Cesium.defined(url)){
    throw new Cesium.DeveloperError('url is required')
  }
  var name = Cesium.getFilenameFromUri(url);
  if (this._name !== name){
      this._name = name;
      this._changed.raiseEvent(this);
  }
  var that = this; 
  return Cesium.when(Cesium.loadJson(url), function(json){
    return that.load(json, url);
  }).otherwise(function(error){
    this._setLoading(false);
    that._error.raiseEvent(that,error);
    return Cesium.when.reject(error);    
  });
}

DataSource.prototype.load = function(data){
  if (!Cesium.defined(data)){
    throw new Cesium.DeveloperError('data is required');
  }
  this._setLoading(true);
  this._seriesNames.length = 0;
  this._seriesToDisplay = undefined;

  var heightScale = this.heightScale;
  var entities = this._entityCollection;
  entities.suspendEvents();
  entities.removeAll();

  for (var x = 0; x < data.length; x++){
    var series = data[x];
    var seriesName = series[0];
    var coordinates = series[1];
    this._seriesNames.push(seriesName);
    var show = x === 0;
    if (show){
      this._seriesToDisplay = seriesName;
    }

    for (var i = 0; i < coordinates.length; i += 3){
      var latitude = coordinates[i];
      var longitude = coordinates[i + 1];
      var height = coordinates[i +2];
      var color = Cesium.Color.fromHSL((0.6 - (height * 0.5)), 1.0, 0.5);
      var surfacePosition = Cesium.Cartesian3.fromDegrees(longitude,latitude,0);
      var heightPosition = Cesium.Cartesian3.fromDegrees(longitude, latitude, height * heightScale);


    var polyline = new Cesium.PolylineGraphics();
    polyline.show = new Cesium.ConstantProperty(show);
    polyline.material = Cesium.ColorMaterialProperty.fromColor(color);
    polyline.width = new Cesium.ConstantProperty(2);
    polyline.followSurface = new Cesium.ConstantProperty(false);
    polyline.positions = new Cesium.ConstantProperty([surfacePosition, heightPosition]);


    var entity = new Cesium.Entity(seriesName + 'index' + i.toString());
    entity.polyline = polyline;
    entity.addProperty('seriesName');
    entity.seriesName = seriesName;
    entities.add(entity);
    }
  }

  entities.resumeEvents();
  this._changed.raiseEvent(this);
  this._setLoading(false);
}

DataSource.prototype._setLoading = function(isLoading){
  if (this._isLoading !== isLoading){
    this._isLoading = isLoading;
    this._loading.raiseEvent(this, isLoading);
  }
}

var dataSource = new DataSource();
dataSource.loadUrl('../sample.json').then(function(){
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

var viewer = new Cesium.Viewer('cesiumContainer',
  {
    animation : false,
    timeline : false
  });

viewer.clock.shouldAnimate = false;
viewer.dataSources.add(dataSource);