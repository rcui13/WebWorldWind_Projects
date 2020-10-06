//Challenge 1
// Create a WorldWindow for the canvas.
requirejs(['../WorldWindShim',
        '../LayerManager'],
    function (WorldWind,
              LayerManager) {
        "use strict";

        // Tell WorldWind to log only warnings and errors.
        WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

        // Create the WorldWindow.
        var wwd = new WorldWind.WorldWindow("canvasOne");

        // Create and add layers to the WorldWindow.
        var layers = [
            // Imagery layers.
            {layer: new WorldWind.BMNGLayer(), enabled: true},
            {layer: new WorldWind.BMNGLandsatLayer(), enabled: false},
            {layer: new WorldWind.BingAerialWithLabelsLayer(null), enabled: true},
            // Add atmosphere layer on top of all base layers.
            {layer: new WorldWind.AtmosphereLayer(), enabled: true},
            // WorldWindow UI layers.
            {layer: new WorldWind.CompassLayer(), enabled: true},
            {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
            {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
        ];

        for (var l = 0; l < layers.length; l++) {
            layers[l].layer.enabled = layers[l].enabled;
            wwd.addLayer(layers[l].layer);
        }


        // Create a layer manager for controlling layer visibility.


// Add a placemark
        var canvas = document.createElement("canvas"),
            ctx2d = canvas.getContext("2d"),
            size = 64, c = size / 2 - 0.5, innerRadius = 5, outerRadius = 20;

        canvas.width = size;
        canvas.height = size;

        var gradient = ctx2d.createRadialGradient(c, c, innerRadius, c, c, outerRadius);

        gradient.addColorStop(0, 'rgb(255, 0, 0)')
        gradient.addColorStop(0.5, 'rgb(243,243,12)')
        gradient.addColorStop(1, 'rgb(9, 125, 227)');


        var placemarkCoordinates = [
            {
                name: "Toronto, Canada",
                y: 43.7,
                x: -79.4,
            }/*,
            {
                name: "Hockessin, Delaware",
                y: 39.79,
                x: -75.70,
            },
            {
                name: "Silicon Valley, California",
                y: 37.39,
                x: -122.06,
            },
            {
                name: "South Georgia and South Sandwich Islands",
                y: -54.43,
                x: -36.59
            }

*/
        ];

        var placemarkLayer = new WorldWind.RenderableLayer("Custom Layers");


        for (var i = 0, len = placemarkCoordinates.length; i < len; i++) {

            ctx2d.fillStyle = gradient;
            ctx2d.arc(c, c, outerRadius, 0, 2 * Math.PI, false);
            ctx2d.fill();
            console.log(ctx2d.fillStyle);


            var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
            placemarkAttributes.imageSource = new WorldWind.ImageSource(canvas);
            placemarkAttributes.imageOffset = new WorldWind.Offset(WorldWind.OFFSET_FRACTION, 0.5, WorldWind.OFFSET_FRACTION, 0.5);
            placemarkAttributes.imageScale = 1;
            placemarkAttributes.imageColor = WorldWind.Color.WHITE;


            placemarkAttributes.imageOffset = new WorldWind.Offset(
                WorldWind.OFFSET_FRACTION, 0.3,
                WorldWind.OFFSET_FRACTION, 0.0);

            placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
                WorldWind.OFFSET_FRACTION, 0.5,
                WorldWind.OFFSET_FRACTION, 1.0);


            var position = new WorldWind.Position(placemarkCoordinates[i].y, placemarkCoordinates[i].x, 100.0);


            var placemark = new WorldWind.Placemark(position, false, placemarkAttributes);

            placemark.label = placemarkCoordinates[i].name + "\n" +
                "Lat " + placemark.position.latitude.toPrecision(4).toString() + "\n" +
                "Lon " + placemark.position.longitude.toPrecision(5).toString();
            placemark.alwaysOnTop = true;

            placemarkLayer.addRenderable(placemark);


        }
        ;
        wwd.addLayer(placemarkLayer);

        var layerManager = new LayerManager(wwd);
    });






//Challenge 2

//steps1: make placemark step 2: add event listener (interact) step3: when clicked, call picking function 
// need to parse code by self
//step 1 pick object
// 2 parse picking object to determine if picked object or terrain, if statement,
// 3 make a modal show up when placemark clicked
// 4. provide close modal when click something, ie. close function
//


