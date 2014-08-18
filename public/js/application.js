var viewer = new Cesium.Viewer('cesiumContainer', {
    imageryProvider : new Cesium.ArcGisMapServerImageryProvider({
        url : 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
    }),
    baseLayerPicker : false
});

var layers = viewer.scene.imageryLayers;
var blackMarble = layers.addImageryProvider(new Cesium.TileMapServiceImageryProvider({
    url : '//cesiumjs.org/tilesets/imagery/blackmarble',
    maximumLevel : 8,
    credit : 'Black Marble imagery courtesy NASA Earth Observatory'
}));

blackMarble.alpha = 0.5;


// Default
// var viewer = new Cesium.Viewer('cesiumContainer');
