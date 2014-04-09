$(document).ready( function() {
    jQuery.extend({
          parseQuerystring: function() {
              var nvpair = {};
              var qs = window.location.search.replace('?', '');
              var pairs = qs.split('&');
              $.each(pairs, function(i, v) {
                  var pair = v.split('=');
                  nvpair[pair[0]] = pair[1];
              });
              return nvpair;
          }
      });
      var qs = $.parseQuerystring();
      
      


$(function(){
        
        
        options = {
		spericalMercator: true,
		projection: new OpenLayers.Projection("EPSG:900913"),
		maxResolution: 156543.0339,
		maxZoomLevels: 18,
		fractionalZoom: true,
		displayProjection: new OpenLayers.Projection("EPSG:4326"),
		units: "m",
		maxExtent : new OpenLayers.Bounds([ -9803292.13,-5205054.49, 547896.95, 15497748.74 ])
		//maxExtent: new OpenLayers.Bounds([ -19803292.13, -3405054.49, 547896.95, 15497748.74 ])
		}
	
            map = new OpenLayers.Map( 'map', options );
           layer = new OpenLayers.Layer.Google(
			"Google Hybrid", // the default
			{type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20});
           

            map.addLayer(layer);
            center = new OpenLayers.LonLat(-98.5, 35);
			center = center.transform(options.displayProjection, options.projection);
			map.setCenter(center, 6);
            
            map.zoomToMaxExtent = function () {
			map.setCenter(center, 6);	//re-center if globe clicked
			};
	$.getJSON('http://test.oklahomawatersurvey.org/mongo/db_find/ows/watersheds/{"spec":{"properties.HUC":"'+qs.huc+'"}}', function (fdata) {
		
		var in_options = {'internalProjection': map.projection, 'externalProjection': map.projection};
		var geojson_format = new OpenLayers.Format.GeoJSON(in_options);
		//var geojson_format = new OpenLayers.Format.GeoJSON();
		var pre = '{"type": "FeatureCollection","features":'
		var geosjon_str = pre + JSON.stringify(fdata) + '}'
		var features = geojson_format.read(geosjon_str, "FeatureCollection");
		if (features.constructor != Array) {
			features = [features];
		}
			
			var styleMap = new OpenLayers.StyleMap({
			fillColor: 'red', 
			strokeColor: 'black',
			strokeWidth: 2,
			fillOpacity: 0.6,
			strokeDashstyle: 'solid'
			});
           	var vector_layer = new OpenLayers.Layer.Vector("Vector Layer",
           													{styleMap: styleMap}); 
           	map.addLayer(vector_layer);	       	
           	vector_layer.addFeatures(features);
           
        //	var dataExtent = vector_layer.getDataExtent();
		//	map.zoomToExtent(dataExtent);
			
			

           
	});


            
            
          

        })
        
        })
        
