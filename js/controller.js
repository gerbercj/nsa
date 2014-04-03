var controller = {
  // called when the selector(s) are changed
  update: function() {
    console.log("update!");
    bubbleMap.update();
    polarPlot.update();
    iciclePlot.update();
  },

  // initialize the visualization
  initVis: function(error, wafData, world, countries) {
    // stash data
    waf.init(wafData);
    // init utils
    countryCodes.init(countries, world);
    uiUtil.initCountrySelector("#countrySelector")
      .on("change", function() {
        controller.update();
      });
    uiUtil.initNetworkSelector("#networkSelector")
      .on("change", function() {
        controller.update();
      });;


    // init the world map
    bubbleMap.init(gMapWrapper, bbMap, world);

    // draw polar plot
    polarPlot.init(gPolarWrapper, bbPolar, d3.range(24), [waf.getAllDataGroupedHourly, waf.getFilteredDataGroupedHourly]);

    // draw icicle plot
    iciclePlot.init(gIcicleWrapper, bbIcicle, waf.getFilteredHierarchy);

    // update the UI
    controller.update();
  },

  init: function() {
    queue()
      .defer(d3.csv, "../data/waf_5mi")
      .defer(d3.json, "../data/world_data.json")
      .defer(d3.json,"../data/countrycodes.json")
      .await(controller.initVis);
  }
};
