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
            },
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
                name: "South Sandwich Islands",
                y: -54.43,
                x: -36.59,
            }
        ];
        var placemarkLayer = new WorldWind.RenderableLayer("Custom Layers");




        ctx2d.fillStyle = gradient;
        ctx2d.arc(c, c, outerRadius, 0, 2 * Math.PI, false);
        ctx2d.fill();
        console.log(ctx2d.fillStyle);


        for (var i = 0; i < placemarkCoordinates.length; i++) {


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


            var position = new WorldWind.Position(placemarkCoordinates[i].y, placemarkCoordinates[i].x, 100);


            var placemark = new WorldWind.Placemark(position, false, placemarkAttributes);

            placemark.label = placemarkCoordinates[i].name + "\n" +
                "Lat " + placemark.position.latitude.toPrecision(4).toString() + "\n" +
                "Lon " + placemark.position.longitude.toPrecision(5).toString();
            placemark.special = placemarkCoordinates[i].name;
            placemark.alwaysOnTop = true;
            placemarkLayer.addRenderable(placemark);
        };


        wwd.addLayer(placemarkLayer);

        var layerManager = new LayerManager(wwd);






//Challenge 2

//steps1: make placemark step 2: add event listener (interact) step3: when clicked, call picking function
// need to parse code by self
//step 1 pick object
// 2 parse picking object to determine if picked object or terrain, if statement,
// 3 make a modal show up when placemark clicked
// 4. provide close modal when click something, ie. close function
//

        var checkName;
        var clickedItems = [];

        var handlePick = function(o){

            var x = o.clientX,
                y = o.clientY;

            var redrawRequired = clickedItems.length > 0;

            for (var c = 0; c < clickedItems.length; c++){
                clickedItems[c].highlighted = false;
            }
            clickedItems = [];

            var pickList = wwd.pick(wwd.canvasCoordinates(x,y));
            if (pickList.objects.length > 0){
                redrawRequired = true;
            }
            var
                // modalContent = $('.modal-content'),
                // span = $('.close'),
                // container = $("#modalContainer"),
                h1 = $('.modal_h1'),
                h3 = $('h3'),
                p1 = $('.p1'),
                p2 = $('.p2'),
                p3 = $('.p3'),
                p4 = $('.p4'),
                p5 = $('.p5'),
                img = $('.image')
            ;

            var modal = document.getElementById("myModal");
            var modalInside = [
                {
                    h1:  ("<strong>Toronto, Canada</strong>"),
                    h3:  ("Birthplace of <em>Ryan Yang</em>"),
                    p1:  ("<a id ='wikiToronto' href='https://en.wikipedia.org/wiki/Toronto,_Prince_Edward_Island'>Toronto</a> is the capital of the Canadian province Ontario. It is the most populous city in Canada and is where the living legend Ryan Yang resides."),
                    p2:  ("<a id='suckItRyan' href='http://priceofoil.org/2012/11/15/its-official-canada-is-the-51st-state/'><strong>The United States of America owns Canada</strong></a>"),
                    img: ('https://cdn.theculturetrip.com/wp-content/uploads/2019/12/gettyimages-615764386.jpg'),
                },
                {
                    h1: ("<strong>Hockessin, Delaware</strong>"),
                    h3: ("Residence of <em>Richard Cui</em>"),
                    p1: ("<a id = 'wikiHockessin' href='https://en.wikipedia.org/wiki/Hockessin,_Delaware'>Hockessin</a> is a city in Delaware with a population of about 13,500 (according to the 2010 census)"),
                    p2: ("Hockessin is safer than Wilmington, DE as there are fewer shootings. Also, it has way fewer shootings than <a id = 'torontoShootings' href = 'https://data.torontopolice.on.ca/pages/shootings'>Toronto</a>."),
                    img: ("https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Hockessin_Friends_from_south.JPG/500px-Hockessin_Friends_from_south.JPG"),
                },
                {
                    h1: ("<strong>Silicon Valley, California</strong>"),
                    h3: ("Silicon Valley is the cursed place that designed the tech that forces me to work on this project"),
                    p1: ("<a id = 'wikiSiliconValley' href='https://en.wikipedia.org/wiki/Silicon_Valley'>Silicon Valley</a> is a region in the southern part of the San Francisco Bay Area in Northern California that serves as a global center for high technology and innovation."),
                    p2: ("Basically all the technology you use came from there and they use it to spy on you and sell your information."),
                    img: ("https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/SJ_skyline_at_night_horizontal.jpg/600px-SJ_skyline_at_night_horizontal.jpg"),
                },
                {
                    h1: ("<strong>South Sandwich Islands</strong>"),
                    h3: ("South Sandwich Islands"),
                    p1: ("<a id = 'wikiIslands' href='https://en.wikipedia.org/wiki/South_Georgia_and_the_South_Sandwich_Islands'>The South Sandwich Islands</a> is a small chain of islands about 2,000 miles away from Argentina and about 3,000 miles from Antarctica. The South Sandwich Islands is part of the British controlled territory named the “South Georgia and the South Sandwich Islands.” This  region lies in the South Atlantic Ocean, with the Scotia Sea to the west and the Weddell Sea to the South."),
                    p2: ("The South Sandwich Islands is a mountainous region of volcanic rock and comprises of some active volcanoes. At higher elevations, the entire region is covered with ice and snow. The climate maintains 0 degrees Celsius in the winter and 8 degrees Celsius in the spring, getting only 1000 hours of daylight per year, or about 3 hours per day. The island arc consists of 11 islands, with the max area being 110 km2 and the smallest being 0.3 km2. Unlike most regions around the world, there are no permanent residents or indigenous inhabitants and the few researchers mainly stay on South Georgia. "),
                    p3: ("The flora and fauna of the South Sandwich Islands attracts researchers and tourists alike. There are various types of birds, including the king and macaroni penguin, albatross, prions, and more. The South Georgia shag, pipit, and pintail are birds native to the region, and only observable here. The South Sandwich Islands have an absence of native mammals, but seals and whales are frequently seen in the region. Fishing improves the economy of the South Sandwich islands because licenses are sold to gain access to Patagonian toothfish, cod icefish and krill. The Marine Stewardship Council deems South Georgia and South Sandwich islands certified to fish Patagonian toothfish, but its sister species, Argentine Patagonian Toothfish, had its certification withdrawn, leaving the South Sandwich islands the only exporter of this species of fish. "),
                    p4: ("The region fails to attract visitors because of overshadowing by its significantly larger neighbor, South Georgia. South Georgia is about 3,500 square km, over 10 times the combined size of the South Sandwich Islands, and has habitable cities. Grytviken, previously a whaling station, is a popular tourist attraction because it’s the resting spot of Ernest Shackleton, a famous polar explorer, and was the site of Corbeta Uruguay, an Argentinian military post during the Falklands War. As mentioned above, the temperatures go lower than 0 degrees Celsius to 8 degrees Celsius at most, making this a difficult region to venture.\n"),
                    p5: ("According to the 2006 Census, there is a population of 30 people, more than Toronto, probably"),
                    img: ("https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/21/2020/06/south-sandwich-islands-Saunders-Island-credit-tom-hart.jpg"),
                }

            ];










            if (pickList.objects.length > 0){
                for (var l = 0; l < pickList.objects.length; l++) {
                    pickList.objects[l].userObject.highlighted = true;

                    clickedItems.push(pickList.objects[l].userObject);

// step 1: define the different placemarks
//step 2: create element, then append to parent tag


                    if (pickList.objects[l].userObject instanceof WorldWind.Placemark) {
                        //if (pickList.objects[l].userObject.special == "")
                        //var num = pickList.objects[l].userObject.findIndex(handlePick);
                        checkName = pickList.objects[l].userObject.special;
                        console.log("label clicked");
                        console.log(checkName)
                        console.log(placemarkCoordinates);
                        console.log(placemarkCoordinates.findIndex(ele => ele.name == pickList.objects[l].userObject.special
                            // console.log("l: ");
                            // console.log()
                            // console.log(ele.name);
                            // // ele.name === "Silicon Valley, California";
                            // console.log(ele.name === "Silicon Valley, California");
                        ));
                        var num = placemarkCoordinates.findIndex(ele => ele.name == pickList.objects[l].userObject.special);
                        h1.html(modalInside[num].h1);
                        h3.html(modalInside[num].h3);
                        p1.html(modalInside[num].p1);
                        p2.html(modalInside[num].p2);
                        p3.html(modalInside[num].p3);
                        p4.html(modalInside[num].p4);
                        p5.html(modalInside[num].p5);
                        img.attr("src", modalInside[num].img);

                        modal.style.display = "block";








                    }


                }
            }

            if (redrawRequired){
                wwd.redraw();
            }
        }
        wwd.addEventListener("click", handlePick);


    });

//if (pickList.objects[p].userObject instanceof WorldWind.Placemark){
//                         console.log("label picked")
//                     }

//click on placemark, need to put logic, do picking, add eventlistener change to click (trigger picking)
// identify placemark object, if yes then click, if no then nothing
// open modal, need to predefine modal in html
//



