mapboxgl.accessToken = 'pk.eyJ1IjoiaWFtd2Z4IiwiYSI6ImNqNGFnMnIyMzEwZzgycXJ1ODdqbG14eGMifQ.3AqBqXZlcbsbEhxddAPB-g';
var mapRedline = new mapboxgl.Map({
    container: 'before', // container id
    style: 'mapbox://styles/iamwfx/cjfho5no7dpef2ro3oikl6jpc', // stylesheet location
    center:[-78.914452,40.328487], // starting position [lng, lat]
    zoom: 12 // starting zoom
  });

var mapCensus = new mapboxgl.Map({
    container: 'after', // container id
    style: 'mapbox://styles/iamwfx/cjfho5no7dpef2ro3oikl6jpc', // stylesheet location
    center:[-78.914452,40.328487], // starting position [lng, lat]
    zoom: 12 // starting zoom
  });


var map = new mapboxgl.Compare(mapRedline, mapCensus, {
    // Set this to enable comparing two maps by mouse movement:
    // mousemove: true
});

mapCensus.on('load',function(){
		// Layer for current ACS numbers
	mapCensus.addLayer({
		id:'holc_all_census',
		type:'fill',
		source:{
			type:'vector',
			url:'mapbox://iamwfx.holc_all_census'
		},
		'source-layer':'holc_all_census',
		paint:{
			'fill-color':'brown',
			'fill-opacity':['/',['number',['get','black_alon']],['number',['get','population']]]
			
		},
		
		})


	chartInitScatter();
	mapCensus.on("render", updateChartScatter);

	// Populate Charts
	// mapCensus.on('render',function(){
	// 	var allFeatures = mapCensus.querySourceFeatures('holc_all_census', {
 //            sourceLayer: 'holc_all_census'
 //            // filter: ['in', 'COUNTY', feature.properties.COUNTY]
 //        });
 //        data_list = []
	// 	for (i=0; 1<allFeatures.length;i++){
	// 		elem_val = allFeatures[i]['properties']['asian_alon']
			
	// 		data_list.push(elem_val);
	// 		}

		
	// 	// console.log(allFeatures.length);
	// 	})
	


	})

	

mapRedline.on('load',function(){
	var hold_classes =['A','B','C','D']
	var hold_colors = ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C']
	
	rastertiles.forEach(function(element){
		if (element.type =='raster'){
			mapRedline.addLayer({
				id:element.name,
				type: 'raster',
				source:{
					type:'raster',
					url:'mapbox://'+element.id
				},
				paint:{
					 'raster-opacity':0.8
				},
				'source-layer':element.name
			})

			
		}})

	// mapRedline.addLayer({
	// 	id:'raster_layer',
	// 	type: 'raster',
	// 	source:{
	// 		type:'raster',
	// 		url:'mapbox://iamwfx.PA_Johnstown_193711'
	// 	},
	// 	paint:{
	// 		 'raster-opacity':0.7
	// 	},
	// 	'source-layer':'PA_Johnstown_193711'
	// })

	mapCensus.addLayer({
		id:'all-holc',
		type:'fill',
		source:{
			type:'vector',
			url:'mapbox://iamwfx.bf01nf7p'
		},
		'source-layer':'HOLC_all-0zassw',
		paint:{
			'fill-opacity':.0,
			'fill-color': [
				'match',
	            ['get', 'holc_grade'],
	            'A', '#66cc33',
	            'B', '#00cccc',
	            'C', '#ffcc33',
	            'D', '#ff3300',
	            /* other */ '#ccc'
			],
			'fill-outline-color': [
				'match',
	            ['get', 'holc_grade'],
	            'A', '#66cc33',
	            'B', '#00cccc',
	            'C', '#ffcc33',
	            'D', '#ff3300',
	            /* other */ '#ccc'
			],
		}
		
	})

	mapCensus.addLayer({
		id:'all-holc-hover',
		type:'fill',
		source:{
			type:'vector',
			url:'mapbox://iamwfx.bf01nf7p'
		},
		'source-layer':'HOLC_all-0zassw',
		paint:{
			'fill-opacity':0.7,
			'fill-color': [
				'match',
	            ['get', 'holc_grade'],
	            'A', '#66cc33',
	            'B', '#00cccc',
	            'C', '#ffcc33',
	            'D', '#ff3300',
	             /* other */   '#ccc'
			]
		},
		filter: ["==", "holc_id", '']
	})




	// When the user moves their mouse over the states-fill layer, we'll update the filter in
	// the state-fills-hover layer to only show the matching state, thus making a hover effect.
	mapCensus.on("mousemove", "all-holc", function(e) {
	    mapCensus.setFilter("all-holc-hover", ["==", "holc_id", e.features[0].properties.holc_id]);
	});

	// Reset the state-fills-hover layer's filter when the mouse leaves the layer.
	mapCensus.on("mouseleave", "all-holc", function() {
	    mapCensus.setFilter("all-holc-hover", ["==", "holc_id", ""]);
	})
	
	// Toggle layers on and off
	
	var toggleableLayerIds = ['all-holc' ,'holc_all_census' ];


	
	// for (var i = 0; i < toggleableLayerIds.length; i++) {
	//     var id = toggleableLayerIds[i];

	//     var link = document.createElement('a');
	//     link.href = '#';
	//     link.className = 'active';
	//     link.textContent = id;

	//     link.onclick = function (e) {
	//         var clickedLayer = this.textContent;
	//         e.preventDefault();
	//         e.stopPropagation();

	//         var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

	//         if (visibility === 'visible') {
	//             mapRedline.setLayoutProperty(clickedLayer, 'visibility', 'none');
	//             this.className = '';
	//         } else {
	//             this.className = 'active';
	//             mapRedline.setLayoutProperty(clickedLayer, 'visibility', 'visible');
	//         }
	//     };

	//     var layers = document.getElementById('layerMenu');
	//     layers.appendChild(link);
	// }

})

 // Widget Panel Interactivity
$('.ui .dropdown')
  .dropdown({onClick:function(val){
  	// console.log(val);
  }})
;

// console.log(rastertiles)
// var mydata = JSON.parse(rastertiles);
// $.ajax({
//   dataType: "json",
//   url: 'js/rastertiles.json',
//   data: data,
//   success: success
// });

// $.ajax({
//   dataType: "json",
//   url: 'js/rastertiles.json',
//   data: rastertiles,
//   success:function(){
//   	console.log('sucess')
//   }
// });