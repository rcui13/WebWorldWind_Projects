// Create a WorldWindow for the canvas.
requirejs(['../WebWorldWind-develop 2/examples/WorldWindShim',
        '../WebWorldWind-develop 2/examples/LayerManager'],
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
        gradient.addColorStop(0, 'rgb(255, 0, 0)');
        gradient.addColorStop(0.5, 'rgb(243,243,12)');
        gradient.addColorStop(1, 'rgb(9, 125, 227)');

        ctx2d.fillStyle = gradient;
        ctx2d.arc(c, c, outerRadius, 0, 2 * Math.PI, false);
        ctx2d.fill();

        var placemarkLayer = new WorldWind.RenderableLayer("Custom Layer");

        var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);

        placemarkAttributes.imageSource = new WorldWind.ImageSource(canvas);
        placemarkAttributes.imageOffset = new WorldWind.Offset(WorldWind.OFFSET_FRACTION, 0.5, WorldWind.OFFSET_FRACTION, 0.5);
        placemarkAttributes.imageScale = 1;
        placemarkAttributes.imageColor = WorldWind.Color.WHITE;


    wwd.addLayer(placemarkLayer);


    placemarkAttributes.imageOffset = new WorldWind.Offset(
        WorldWind.OFFSET_FRACTION, 0.3,
        WorldWind.OFFSET_FRACTION, 0.0);

    placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
        WorldWind.OFFSET_FRACTION, 0.5,
        WorldWind.OFFSET_FRACTION, 1.0);




    var position = new WorldWind.Position(43.7, -79.4, 100.0);
    var placemark = new WorldWind.Placemark(position, false, placemarkAttributes);

    placemark.label = "Placemark\n" +
        "Lat " + placemark.position.latitude.toPrecision(4).toString() + "\n" +
        "Lon " + placemark.position.longitude.toPrecision(5).toString();
    placemark.alwaysOnTop = true;

    placemarkLayer.addRenderable(placemark);
    var layerManager = new LayerManager(wwd);

    });


