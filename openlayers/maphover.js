

$(function() {

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
			"Google Streets", // the default
			{numZoomLevels: 20});
           

            map.addLayer(layer);
            center = new OpenLayers.LonLat(-98.5, 35);
			center = center.transform(options.displayProjection, options.projection);
			map.setCenter(center, 6);
            


	
/*function hoverMap(skey){
$.getJSON('http://test.oklahomawatersurvey.org/mongo/db_find/ows/watersheds/{"spec":{"properties.HUC":"'+skey+'"}}', function (fdata) {
		
		var in_options = {'internalProjection': map.projection, 'externalProjection': map.projection};
		var geojson_format = new OpenLayers.Format.GeoJSON(in_options);
		//var geojson_format = new OpenLayers.Format.GeoJSON();
		var pre = '{"type": "FeatureCollection","features":'
		var geosjon_str = pre + JSON.stringify(fdata) + '}'
		var features = geojson_format.read(geosjon_str, "FeatureCollection");
		if (features.constructor != Array) {
			features = [features];
		}
			
			
           	var vector_layer = new OpenLayers.Layer.Vector(); 
           	map.addLayer(vector_layer);	       	
           	vector_layer.addFeatures(features);
           	
           	//var dataExtent = vector_layer.getDataExtent();
			//map.zoomToExtent(dataExtent);
			
			

           
	});
}*/


	var Navigation = new OpenLayers.Control.Navigation();

  
	map.addControl(Navigation);
    map.removeControl(map.getControlsByClass('OpenLayers.Control.Zoom')[0]);

	var NavigationControls = map.getControlsByClass('OpenLayers.Control.Navigation')
	,i;
	
	for (i=0;i<NavigationControls.length;i++){
	NavigationControls[i].deactivate();
	}
	
			//var geojson_format = new OpenLayers.Format.GeoJSON();
           //var vector_layer = new OpenLayers.Layer.Vector(); 
          // map.addLayer(vector_layer);
          // vector_layer.addFeatures(geojson_format.read(featurecollection));

})




function hoverMap(skey){
$.getJSON('http://test.oklahomawatersurvey.org/mongo/db_find/ows/watersheds/{"spec":{"properties.HUC":"'+ skey +'"}}', function (fdata) {
		
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
			strokeDashstyle: 'solid',
			
			});
			
           	var vector_layer = new OpenLayers.Layer.Vector("Layer",
           	{styleMap:styleMap}); 
           	map.addLayer(vector_layer);	       	
           	vector_layer.addFeatures(features);
           	//layer.redraw();
           	//var dataExtent = vector_layer.getDataExtent();
			//map.zoomToExtent(dataExtent);
			

			

           
	});
}



