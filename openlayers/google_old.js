var map;

function init() {
    map = new OpenLayers.Map('map', {
        zoomWheelEnabled: false,
        projection: 'EPSG:4326',
       layers: [
            new OpenLayers.Layer.Google(
                "Google Physical",
                {type: google.maps.MapTypeId.STREET}
            )

        ],

        center: new OpenLayers.LonLat(-98.5, 35.3)
        .transform('EPSG:900913', 'EPSG:4326'),
        zoom: 1
   });


var featurecollection = {
              "type": "FeatureCollection", 
              "features": [
                {"geometry": {
                    "type": "GeometryCollection", 
                    "geometries": [
                        {
                            "type": "LineString", 
                            "coordinates": 
                                [[11.0878902207, 45.1602390564], 
                                [15.01953125, 48.1298828125]]
                        }, 
                        {
                            "type": "Polygon", 
                            "coordinates": 
                                [[[
                        -10733907.774387589,
                        4438986.2902676752
                    ],
                    [
                        -10732954.909185665,
                        4438985.6830259496
                    ],
                    [
                        -10731516.234224254,
                        4438992.4096969059
                    ],
                    [
                        -10731112.954876151,
                        4438993.7678704029
                    ],
                    [
                        -10730531.711797144,
                        4438995.698711684
                    ],
                    [
                        -10720508.94282618,
                        4438979.2464272957
                    ],
                    [
                        -10720181.850344216,
                        4438975.7627689568
                    ],
                    [
                        -10719499.085758857,
                        4438971.9629116971
                    ],
                    [
                        -10718997.321926823,
                        4438977.8390656225
                    ],[
                        -10733907.774387589,
                        4438986.2902676752
                    ]
                    ]]
                        }
                    ]
                }, 
                "type": "Feature", 
                "properties": {}}
              ]
           };



	var Navigation = new OpenLayers.Control.Navigation();

  
	map.addControl(Navigation);
    map.removeControl(map.getControlsByClass('OpenLayers.Control.Zoom')[0]);

	var NavigationControls = map.getControlsByClass('OpenLayers.Control.Navigation')
	,i;
	
	for (i=0;i<NavigationControls.length;i++){
	NavigationControls[i].deactivate();
	}
	
			var geojson_format = new OpenLayers.Format.GeoJSON();
           var vector_layer = new OpenLayers.Layer.Vector(); 
           map.addLayer(vector_layer);
           vector_layer.addFeatures(geojson_format.read(featurecollection));

}