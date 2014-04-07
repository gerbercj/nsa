var waf = {
  data: null,
  filteredData: null,

  getNetworks: function() {
    // get all unique networks
    var networks = {};
    waf.data.forEach(function(d) {
      networks[d.network] = true;
    });

    // convert to array
    var networksArray = [];
    for (var network in networks) {
      networksArray.push(network);
    }

    // finally, sort the array
    return networksArray.sort(function(a, b) {
      return d3.ascending(a, b);
    });
  },

  // returns only those data items that match the selected country and network dropdowns
  // not meant for direct use
  filterByCountryAndNetwork: function() {
    var country = uiUtil.getSelectedCountry();
    var network = uiUtil.getSelectedNetwork();

    console.log("filter by ", country, network);
    return waf.data.filter(function(d) {
      // if both are *, return immediately
      if (country === "*" && network === "*") {
        return true;
      } else {
        // if country is *, then filter by network
        if (country === "*") {
          return d.network === network;
        } else if (network === "*") {
          // filter by country
          return d.country === country;
        } else {
          // filter by both
          return d.country === country && d.network === network;
        }
      }
    });
  },

  refreshFilteredData: function() {
    var extent  = timeRangeSelector.getSelectedTimeRange();
    console.log("filter by extent", extent);

    waf.filteredData = waf.filterByCountryAndNetwork().filter(function(d) {
      // check if data falls within time range
      return (d.hour >= extent[0] && d.hour < extent[1]);
    });
  },

  getFilteredHourlyMean: function() {
    var mean = d3.mean(waf.getFilteredDataGroupedHourly());

    // we return 25 buckets to wrap around to 0
    return d3.range(25).map(function() { return mean; });
  },

  getFilteredDataGroupedHourly: function() {
    var hourBuckets = d3.range(24).map(function() { return 0; });

    // bucket counts based upon hour of the day
    waf.filteredData.forEach(function(d) {
      hourBuckets[d.hour] += d.count;
    });

    return hourBuckets.concat(hourBuckets[0]);
  },

  // this is used by the time range selector only
  getCompleteFilteredDataGroupedHourly: function() {
    var hourBuckets = d3.range(24).map(function() { return 0; });

    // bucket counts based upon hour of the day
    waf.filterByCountryAndNetwork().forEach(function(d) {
      hourBuckets[d.hour] += d.count;
    });

    return hourBuckets;
  },

  getFilteredHierarchy: function() {
    return {
      "flare": {
        "analytics": {
          "cluster": {
            "AgglomerativeCluster": 3938,
            "CommunityStructure": 3812,
            "HierarchicalCluster": 6714,
            "MergeEdge": 743
          },
          "graph": {
            "BetweennessCentrality": 3534,
            "LinkDistance": 5731,
            "MaxFlowMinCut": 7840,
            "ShortestPaths": 5914,
            "SpanningTree": 3416
          },
          "optimization": {
            "AspectRatioBanker": 7074
          }
        },
        "animate": {
          "Easing": 17010,
          "FunctionSequence": 5842,
          "interpolate": {
            "ArrayInterpolator": 1983,
            "ColorInterpolator": 2047,
            "DateInterpolator": 1375,
            "Interpolator": 8746,
            "MatrixInterpolator": 2202,
            "NumberInterpolator": 1382,
            "ObjectInterpolator": 1629,
            "PointInterpolator": 1675,
            "RectangleInterpolator": 2042
          },
          "ISchedulable": 1041,
          "Parallel": 5176,
          "Pause": 449,
          "Scheduler": 5593,
          "Sequence": 5534,
          "Transition": 9201,
          "Transitioner": 19975,
          "TransitionEvent": 1116,
          "Tween": 6006
        },
        "data": {
          "converters": {
            "Converters": 721,
            "DelimitedTextConverter": 4294,
            "GraphMLConverter": 9800,
            "IDataConverter": 1314,
            "JSONConverter": 2220
          },
          "DataField": 1759,
          "DataSchema": 2165,
          "DataSet": 586,
          "DataSource": 3331,
          "DataTable": 772,
          "DataUtil": 3322
        },
        "display": {
          "DirtySprite": 8833,
          "LineSprite": 1732,
          "RectSprite": 3623,
          "TextSprite": 10066
        },
        "flex": {
          "FlareVis": 4116
        },
        "physics": {
          "DragForce": 1082,
          "GravityForce": 1336,
          "IForce": 319,
          "NBodyForce": 10498,
          "Particle": 2822,
          "Simulation": 9983,
          "Spring": 2213,
          "SpringForce": 1681
        },
        "query": {
          "AggregateExpression": 1616,
          "And": 1027,
          "Arithmetic": 3891,
          "Average": 891,
          "BinaryExpression": 2893,
          "Comparison": 5103,
          "CompositeExpression": 3677,
          "Count": 781,
          "DateUtil": 4141,
          "Distinct": 933,
          "Expression": 5130,
          "ExpressionIterator": 3617,
          "Fn": 3240,
          "If": 2732,
          "IsA": 2039,
          "Literal": 1214,
          "Match": 3748,
          "Maximum": 843,
          "methods": {
            "add": 593,
            "and": 330,
            "average": 287,
            "count": 277,
            "distinct": 292,
            "div": 595,
            "eq": 594,
            "fn": 460,
            "gt": 603,
            "gte": 625,
            "iff": 748,
            "isa": 461,
            "lt": 597,
            "lte": 619,
            "max": 283,
            "min": 283,
            "mod": 591,
            "mul": 603,
            "neq": 599,
            "not": 386,
            "or": 323,
            "orderby": 307,
            "range": 772,
            "select": 296,
            "stddev": 363,
            "sub": 600,
            "sum": 280,
            "update": 307,
            "variance": 335,
            "where": 299,
            "xor": 354,
            "_": 264
          },
          "Minimum": 843,
          "Not": 1554,
          "Or": 970,
          "Query": 13896,
          "Range": 1594,
          "StringUtil": 4130,
          "Sum": 791,
          "Variable": 1124,
          "Variance": 1876,
          "Xor": 1101
        },
        "scale": {
          "IScaleMap": 2105,
          "LinearScale": 1316,
          "LogScale": 3151,
          "OrdinalScale": 3770,
          "QuantileScale": 2435,
          "QuantitativeScale": 4839,
          "RootScale": 1756,
          "Scale": 4268,
          "ScaleType": 1821,
          "TimeScale": 5833
        },
        "util": {
          "Arrays": 8258,
          "Colors": 10001,
          "Dates": 8217,
          "Displays": 12555,
          "Filter": 2324,
          "Geometry": 10993,
          "heap": {
            "FibonacciHeap": 9354,
            "HeapNode": 1233
          },
          "IEvaluable": 335,
          "IPredicate": 383,
          "IValueProxy": 874,
          "math": {
            "DenseMatrix": 3165,
            "IMatrix": 2815,
            "SparseMatrix": 3366
          },
          "Maths": 17705,
          "Orientation": 1486,
          "palette": {
            "ColorPalette": 6367,
            "Palette": 1229,
            "ShapePalette": 2059,
            "SizePalette": 2291
          },
          "Property": 5559,
          "Shapes": 19118,
          "Sort": 6887,
          "Stats": 6557,
          "Strings": 22026
        },
        "vis": {
          "axis": {
            "Axes": 1302,
            "Axis": 24593,
            "AxisGridLine": 652,
            "AxisLabel": 636,
            "CartesianAxes": 6703
          },
          "controls": {
            "AnchorControl": 2138,
            "ClickControl": 3824,
            "Control": 1353,
            "ControlList": 4665,
            "DragControl": 2649,
            "ExpandControl": 2832,
            "HoverControl": 4896,
            "IControl": 763,
            "PanZoomControl": 5222,
            "SelectionControl": 7862,
            "TooltipControl": 8435
          },
          "data": {
            "Data": 20544,
            "DataList": 19788,
            "DataSprite": 10349,
            "EdgeSprite": 3301,
            "NodeSprite": 19382,
            "render": {
              "ArrowType": 698,
              "EdgeRenderer": 5569,
              "IRenderer": 353,
              "ShapeRenderer": 2247
            },
            "ScaleBinding": 11275,
            "Tree": 7147,
            "TreeBuilder": 9930
          },
          "events": {
            "DataEvent": 2313,
            "SelectionEvent": 1880,
            "TooltipEvent": 1701,
            "VisualizationEvent": 1117
          },
          "legend": {
            "Legend": 20859,
            "LegendItem": 4614,
            "LegendRange": 10530
          },
          "operator": {
            "distortion": {
              "BifocalDistortion": 4461,
              "Distortion": 6314,
              "FisheyeDistortion": 3444
            },
            "encoder": {
              "ColorEncoder": 3179,
              "Encoder": 4060,
              "PropertyEncoder": 4138,
              "ShapeEncoder": 1690,
              "SizeEncoder": 1830
            },
            "filter": {
              "FisheyeTreeFilter": 5219,
              "GraphDistanceFilter": 3165,
              "VisibilityFilter": 3509
            },
            "IOperator": 1286,
            "label": {
              "Labeler": 9956,
              "RadialLabeler": 3899,
              "StackedAreaLabeler": 3202
            },
            "layout": {
              "AxisLayout": 6725,
              "BundledEdgeRouter": 3727,
              "CircleLayout": 9317,
              "CirclePackingLayout": 12003,
              "DendrogramLayout": 4853,
              "ForceDirectedLayout": 8411,
              "IcicleTreeLayout": 4864,
              "IndentedTreeLayout": 3174,
              "Layout": 7881,
              "NodeLinkTreeLayout": 12870,
              "PieLayout": 2728,
              "RadialTreeLayout": 12348,
              "RandomLayout": 870,
              "StackedAreaLayout": 9121,
              "TreeMapLayout": 9191
            },
            "Operator": 2490,
            "OperatorList": 5248,
            "OperatorSequence": 4190,
            "OperatorSwitch": 2581,
            "SortOperator": 2023
          },
          "Visualization": 16540
        }
      }
    }
  },

  getAggregatedMapData: function() {
    // aggregate by city, drop all other dimensions
    var cities = {};
    waf.filteredData.forEach(function(d) {
      var cityId = d.country + "-" + d.state + "-" + d.city;
      // city already exists, just add the total count
      if (cities[cityId]) {
        cities[cityId].count += d.count;
      } else {
        // create new city
        cities[cityId] = {
          id: cityId,
          city: d.city,
          lat: d.lat,
          lng: d.lng,
          count: d.count
        }
      }
    });

    // convert to array
    var citiesArray = [];
    for (var city in cities) {
      citiesArray.push(cities[city]);
    }

    // sort array in DESC order
    citiesArray.sort(function(a, b) {
      return d3.descending(a.count, b.count);
    });

    return citiesArray;
  },

  getNumberOfAttacks: function() {
    var count = 0;

    waf.filteredData.forEach(function(d) {
      count += d.count;
    });

    return count;
  },

  init: function(wafData) {
    // get timezone offset
    var timezoneOffset = new Date().getTimezoneOffset() * 60000;

    waf.data = wafData.map(function(d) {
      // convert numbers and dates
      d.count = +d.count;
      d.lat   = +d.lat;
      d.lng   = +d.lng;
      // convert to GMT
      d.date  = new Date((+d.timestamp * 1000) + timezoneOffset);

      // store synthesized data here
      d.hour  =  d.date.getHours();
      return d;
    });
  }
}
