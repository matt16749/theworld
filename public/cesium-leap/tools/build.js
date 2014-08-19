{
    "baseUrl": "../",
    "paths" :{
    	"Leap" : "node_modules/leapjs/leap"
    },
    "include": ["tools/almond", "CesiumLeap"],
    "exclude": ["Leap"],
    "out": "../dist/cesiumLeap.js",
    "wrap": {
        "startFile": "wrap.start",
        "endFile": "wrap.end"
    }
}
