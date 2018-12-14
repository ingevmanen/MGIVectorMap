var mystyle = {
    "version": 8,
    "name": "Mijn eigen Stijl",
    //"sprite": "url",
    //"glyphs": "url/{fontstack}/{range}.pbf",
    "sources": {
		"pdok":{
			"type": "vector",
			"tiles":  ["https://geodata.nationaalgeoregister.nl/beta/topotiles/{z}/{x}/{y}.pbf"]
		}
	},
    "layers":[ 
        { 
            "id":  "background",
            "type": "background",
            "paint": {
                "background-color":"#FFFFFF"
                }
        },
        {
            "id": "admin",
            "type": "fill",
            "source": "pdok",
            "source-layer": "admin",
            "maxzoom": 22,
            "minzoom": 0,
            "filter": ["==", "lod1", "province"],
            "paint": {
                "fill-color" :"#f9f9d4",
                "fill-outline-color": "#ffffff"
            }
        },
	{
            "id": "water",
            "type": "fill",
            "source": "pdok",
            "source-layer": "water",
            "maxzoom": 22,
            "minzoom": 0,
            "paint": {
                "fill-color" : "#54D8CC",
                }
		},
		{
            "id": "water_line",
            "type": "line",
            "source": "pdok",
            "source-layer": "water-line",
            "maxzoom": 22,
            "minzoom": 12,
            "paint": {
                "line-color" : "#54D8CC",
                }
        },
		{
            "id": "roads",
            "type": "line",
            "source": "pdok",
            "source-layer": "infra",
			"filter": ["==", "lod1", "roads"],
            "maxzoom": 22,
            "minzoom": 0,
            "paint": {
                "line-color" : "#B2B2B2",
                }
        },
		{
            "id": "railway",
            "type": "line",
            "source": "pdok",
            "source-layer": "infra",
			"filter": ["==", "lod1", "railway"],
            "maxzoom": 22,
            "minzoom": 0,
            "paint": {
                "line-color" : "#000000",
				"line-dasharray" : [5, 5]
                }
        },
		{
            "id": "buildings",
            "type": "fill",
            "source": "pdok",
            "source-layer": "urban",
			"filter": ["==", "lod1", "buildings"],
            "maxzoom": 22,
            "minzoom": 14,
            "paint": {
                "fill-color" : '#FC0101'
                }
        },
	]
}

var map = new mapboxgl.Map({
        container: 'map',
        style: mystyle,
        hash: true,
        zoom: 11,
        pitch: 60,
        bearing: 62.4,
        center: [ 4.8, 52.4]
    });
	
// Make a GEOJSON
var wurjson = {
    "type": "FeatureCollection",
    "name": "15yrMGI",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": [
        { "type": "Feature", "properties": { "fid": 0, "height": 60 }, "geometry": { "type": "Point", "coordinates": [5.66647, 51.98514] } },
        { "type": "Feature", "properties": { "fid": 1, "height": 45 }, "geometry": { "type": "Point", "coordinates": [5.66801, 51.9864] } },
        { "type": "Feature", "properties": { "fid": 2, "height": 100 }, "geometry": { "type": "Point", "coordinates": [5.66361, 51.98531] } },
        { "type": "Feature", "properties": { "fid": 3, "height": 30 }, "geometry": { "type": "Polygon", "coordinates": [[[5.66554, 51.98675], [5.66832, 51.9875], [5.66778, 51.98825], [5.66602, 51.98779], [5.66591, 51.98784], [5.66501, 51.98758], [5.66498, 51.98753], [5.66554, 51.98675]]] } }
    ]
};

// On Load add GeoJSON SOURCE and LAYER
map.on('load', function (e) {
    // ADD GEOJSON SOURCE
    map.addSource('punten', {
        'type': 'geojson',
        'data': wurjson
    });
    // ADD an extra layer
    map.addLayer({
        'id': 'geojson-points',
        'type': 'circle',
        'source': 'punten',
        'layout': {},
        'paint': {
            'circle-color': '#000fff',
            'circle-radius': 10
        }
    });
});	

	
