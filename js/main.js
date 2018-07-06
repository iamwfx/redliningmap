$(document).ready(function() {



////////////////////////////
// initialize dropdown /////
////////////////////////////
const holc_tiles = {1930:'holc_overlay_1930',
				1940:'holc_overlay_1940',
				1950:'holc_overlay_1950',
				1960:'holc_overlay_1960',
				1970:'holc_overlay_1970',
				1980:'holc_overlay_1980',
				1990:'holc_overlay_1990',
				2000:'holc_overlay_2000',
				2010:'holc_overlay_2010',
				2016:'holc_overlay_2016'
	}

const holc_classes =['A','B','C','D']
const holc_colors = ['#5fce23', '#0bc0ed', '#ffd419', '#ff4b19']
const holc_colors_dict = {'A':'5fce23','B':'0bc0ed','C':'ffd419','D':'ff4b19'}
const s = carto.expressions;
const categoryRampDict ={'colored_perc':s.palettes.PINKYL,
						'white_perc':s.palettes.TEAL,
						'hispanic_perc':s.palettes.TEAL,
						'median_income':s.palettes.EMRLD,
						'unemploy_perc':s.palettes.REDOR,
						'college_perc':s.palettes.BURG}



var $cityDropdown = $("#cityDropdown");
$('#cityDropdown1').dropdown();

var year = '2016';
var city='Cleveland';
var category ='colored_perc';



/////////////////////////////
/// Initialize the buttons///
/////////////////////////////
var $buttonsYear  = $('#yearSlider>svg>g>.slider>.parameter-value>text');
var $buttonsCensus  = $('.button.census');
var cityList = cities[parseInt(year)].sort();
$cityDropdown.empty();
$.each(cityList, function() {
$cityDropdown.append($('<div class="item" data-value="'+this+'">'+this+'</div>'))})



///////////////////////////
/// Insert Year Selector //
///////////////////////////
data = [1930,1940,1950,1960,1970,1980,1990,2000,2010,2016]
var yearSlider = d3.sliderHorizontal()
    .min(1930)
    .max(2016)
    .marks(data)
    .ticks(12)
    .width(320)
    .tickFormat(d3.format("d"))
    .default(2016);

  var g = d3.select("div#yearSlider").append("svg")
    .attr("width", 360)
    .attr("height", 70)
    .append("g")
    .attr("transform", "translate(18,24)");

  g.call(yearSlider);

  d3.select("p#value2").text((yearSlider.value()));
  d3.select("a#setValue2").on("click", () => yearSlider.value(5));




//////////////////////////
// Add base line layers //
//////////////////////////

mapboxgl.accessToken = 'pk.eyJ1IjoiaWFtd2Z4IiwiYSI6ImNqNGFnMnIyMzEwZzgycXJ1ODdqbG14eGMifQ.3AqBqXZlcbsbEhxddAPB-g';
const mapRedline = new mapboxgl.Map({
    container: 'before', // container id
    // style: 'mapbox://styles/iamwfx/cji3e7sqn14gy2rpjxkndti3s',
    style: 'mapbox://styles/iamwfx/cjfho5no7dpef2ro3oikl6jpc', // stylesheet location
    // style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
    center:[-81.681290,41.505493], // starting position [lng, lat]
    zoom: 10 // starting zoom
  });

const mapCensus = new mapboxgl.Map({
      container: 'after',
      // style:'mapbox://styles/iamwfx/cji3e7sqn14gy2rpjxkndti3s',
      style: 'mapbox://styles/iamwfx/cjfho5no7dpef2ro3oikl6jpc', // stylesheet location
      // style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center: [-81.681290,41.505493],
      zoom: 10
    });

carto.setDefaultAuth({
      user:  'parksgps',
      apiKey: 'a5egxawWBp3cGSA9Fcxd4A'
    });

const map = new mapboxgl.Compare(mapRedline, mapCensus, {
    // Set this to enable comparing two maps by mouse movement:
    // mousemove: true
});

// const holcOverlaySource = new carto.source.Dataset('holc_overlay_2016',{
// 	  user:  keys['carto']['username'],
// 	  apiKey: keys['carto']['token']
// 	});
const holcOverlaySource = new carto.source.SQL(`
	SELECT * from holc_overlay_2016
	`, {
	  user:  'parksgps',
	  apiKey: 'a5egxawWBp3cGSA9Fcxd4A'
	});

/////// Census
const holcOverlayVizCensus = new carto.Viz(`
  
  @city:$city
  @holc_grade:$holc_grade_x
  @population:$population
  @white_perc:$white_perc
  @colored_perc:$colored_perc
  @median_income:$median_income
  @unemploy_perc:$unemploy_perc
  @college_perc:$college_perc
  color: opacity(ramp(globalQuantiles($colored_perc,5), PINKYL),.7)
  strokeWidth: 0
  // strokeColor: rgba(255, 255, 255,0.01)
`);

///// Redline
const holcOverlayVizRedline = new carto.Viz(`
  @city:$city
  @holc_grade:$holc_grade_x
  @population:$population
  @white_perc:$white_perc
  @colored_perc:$colored_perc
  @median_income:$median_income
  @unemploy_perc:$unemploy_perc
  @college_perc:$college_perc
  color: opacity(ramp(buckets($holc_grade_x,['A','B','C','D']),[#5fce23,#0bc0ed,#ffd419,#ff4b19,#ff4b19]),.5)
  strokeWidth: 1
  strokeColor: rgb(255, 255, 255)
`);


const holcOverlayLayerCensus = new carto.Layer('holcOverlayLayerCensus', holcOverlaySource, holcOverlayVizCensus);
holcOverlayLayerCensus.addTo(mapCensus);

const holcOverlayLayerRedline = new carto.Layer('holcOverlayLayerRedline', holcOverlaySource, holcOverlayVizRedline);
holcOverlayLayerRedline.addTo(mapRedline);



//////////////////////////////
///// Add raster maps ////////
//////////////////////////////

mapRedline.on('load',function(){

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
					 'raster-opacity':0.5
				},
				'source-layer':element.name
			})

			
		}})


})

/////////////////////////////////
// Initialize the sql client ////
/////////////////////////////////
SQL_CLIENT = axios.create({
    method: 'get',
    url: 'https://' + 'parksgps' + '.carto.com/api/v2/sql?',
    params: {
        api_key:  'a5egxawWBp3cGSA9Fcxd4A'
    }})

/////////////////////////////////
////// Initialize Charts ////////
/////////////////////////////////
yearBoxPlot(getBoundsSQL(city,year),category);
console.log("city is", city)
historicalBoxPlot(getBoundsAllSQL(city),'colored_perc');

/////////////////////////////////
// Change layer on year change //
/////////////////////////////////
// $buttonsYear.on('change', function(){
$buttonsYear.bind("DOMSubtreeModified",function(){
    	// $.each($buttonsYear,function(i,v){v.classList.remove("active")});

    	year = this.innerHTML;
    	// this.classList.add("active");
    	const holcOverlaySource =new carto.source.SQL(`
	  		select * from holc_overlay_${year}`,
	  		{
		  user: 'parksgps',
		  apiKey: 'a5egxawWBp3cGSA9Fcxd4A'
		})
	  	;

	  	holcOverlayLayerCensus.update(holcOverlaySource, holcOverlayLayerCensus.getViz());
	  	
	  	// Change the available cities
	  	var cityList = cities[parseInt(year)].sort();
	  	$cityDropdown.empty();
	  	$.each(cityList, function() {
			$cityDropdown.append($('<div class="item" data-value="'+this+'">'+this+'</div>'))
	   	
    })

  })


/////////////////////////////////
// Change layer on city change //
/////////////////////////////////
$('#cityDropdown1').dropdown({
	onChange:function(val){ 
		city =val;
		const holcOverlaySource =new carto.source.SQL(`
	  		select * from holc_overlay_${year}
	  		where city = '${val}'
	  		`,
	  		{
		  user: 'parksgps',
		  apiKey: 'a5egxawWBp3cGSA9Fcxd4A'
		})
		holcOverlayLayerCensus.update(holcOverlaySource, holcOverlayLayerCensus.getViz());
		
		// const boundsQuery = "SELECT st_X(st_centroid(st_union(st_centroid(the_geom)))) as cent_lng,st_Y(st_centroid(st_union(st_centroid(the_geom)))) as cent_lat from holc_overlay_"+year+" where city ='"+val+"'";
		
		const boundsQuery = "SELECT ST_XMin(st_extent(the_geom)) as xmin, ST_YMin(st_extent(the_geom)) as ymin, ST_XMax(st_extent(the_geom)) as xmax, ST_YMax(st_extent(the_geom)) as ymax from holc_overlay_"+year+" where city ='"+val+"'";

		 SQL_CLIENT.request({
		        params: {
		            q: boundsQuery
		        },
		    }).then(function (response) {
		        if (response && response.data) {
		            // cent_lng= response.data.rows[0]['cent_lng'];
		            // cent_lat= response.data.rows[0]['cent_lat'];
		            box_min_x= response.data.rows[0]['xmin'];
		            box_min_y= response.data.rows[0]['ymin'];
		            box_max_x= response.data.rows[0]['xmax'];
		            box_max_y= response.data.rows[0]['ymax'];
		            var bbox = [[
				        box_min_x,
				        box_min_y
				    ], [
				        box_max_x,
				        box_max_y
				    ]];
		            mapCensus.fitBounds(bbox,{linear:true}
				    );

				}});
			}

})
/////////////////////////////////
// Change layer on cat change ///
/////////////////////////////////
$buttonsCensus.on('click',function(){
	$.each($buttonsCensus,function(i,v){v.classList.remove("active")});
	category = this.value;
	this.classList.add("active");

	const holcOverlayVizCensusNew = new carto.Viz({
		variables:{
			city:s.prop('city'),
			holc_grade:s.prop('holc_grade_x'),
			population:s.prop('population'),
			white_perc:s.prop('white_perc'),
			colored_perc:s.prop('colored_perc'),
			median_income:s.prop('median_income'),
			unemploy_perc:s.prop('unemploy_perc'),
			college_perc:s.prop('college_perc')
	},
      	color: s.opacity(s.ramp(s.globalQuantiles(s.prop(`${category}`), 5),categoryRampDict[category]),0.7),
      	strokeWidth: 0
    });
    console.log(holcOverlayVizCensusNew);

    holcOverlayLayerCensus.update(holcOverlaySource,holcOverlayVizCensusNew)
	// holcOverlayLayerCensus.blendToViz(holcOverlayVizCensus)

})

///////////////////////////////////////////
/// Get initial chart and map parameters //
///////////////////////////////////////////
// Set the default year
// $(".button.year:contains('2016')").click();
$(".button.census:contains('Colored')").click();

///////////////////////////////////////////
/////////// Set the chart titles //////////
///////////////////////////////////////////

// This has to be done after the maps and compare toggle is drawn
$('#before>.mapboxgl-compare').after(
	"<div id='titleLeft'>Redline Grades</div>"
)


///////////////////////////////////////////
/////////// Add hover pop-ups /////////////
///////////////////////////////////////////

const popupLeft = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false
});

const popupRight = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false
});


const interactivityCensus = new carto.Interactivity(holcOverlayLayerCensus);
const interactivityRedline = new carto.Interactivity(holcOverlayLayerRedline);

const delay = 70;
let clickedFeatureId = null;

popUp(interactivityCensus,popupRight,mapCensus,'red');
popUp(interactivityRedline,popupLeft,mapRedline,'white');

function popUp(interactivity,popUp,map,outlineColor){
	interactivity.on('featureEnter', event => {
	  if (event.features.length > 0) {
	    const feature = event.features[0];
	    const vars = event.features[0].variables;
	    // console.log("Features are",event.features);
	    if (feature.id !== clickedFeatureId) {
	    	
	      // console.log('color is',holc_colors_dict[vars.holc_grade.value]);
	      // feature.strokeWidth.blendTo('4', delay);
	      feature.color.blendTo(`opacity(#${holc_colors_dict[vars.holc_grade.value]},1)`, delay)
	      // feature.strokeColor.blendTo(`opacity(#${holc_colors_dict[vars.holc_grade.value]},1)`, delay)
	      // feature.strokeColor.blendTo(`opacity(${holc_colors_dict[vars.holc_grade_x.value]},1)`, delay);
	    }
	  }
	});
	interactivity.on('featureLeave', event => {
	  if (event.features.length > 0) {
	    const feature = event.features[0];
	    if (feature.id !== clickedFeatureId) {
	      // feature.color.reset(delay);
	      feature.strokeWidth.reset(delay);
	      feature.color.reset(delay);
	      // feature.strokeColor.reset(delay);
	    }
	  }
	});


	interactivity.on('featureHover', event =>{
		if (event.features.length > 0) {
	    const vars = event.features[0].variables;
	    popUp.setHTML(`
	    <div>
	      <h4>${vars.city.value}: Grade ${vars.holc_grade.value}</h4>
	      <p id="description">Population: ${numberWithCommas(parseInt(vars.population.value))}
	      <br>
	      White: ${100*vars.white_perc.value.toFixed(2) + '%'}
	      <br>
	      Colored: ${(100*vars.colored_perc.value).toFixed(2) + '%'}
	      <br>
	      College-Educated: ${(100*vars.college_perc.value).toFixed(2) + '%'}
	      <br>
	      Unemployment: ${(100*vars.unemploy_perc.value).toFixed(2) + '%'}
	      <br>
	      Median income (adj 2016): ${'$'+(numberWithCommas(parseInt(vars.median_income.value)))}
	      </p>
	    </div>
	    `);
	    
	    popUp.setLngLat([event.coordinates.lng, event.coordinates.lat+.008]);
	    if (!popUp.isOpen()) {
	      popUp.addTo(map);
	    }
	  } else {
	    popUp.remove();
	  }}
	  );
}
///////////////////////////////////
////////// FUNCTIONS //////////////        
///////////////////////////////////

function getCitySQL(city){
	var boundsOrig = mapCensus.getBounds();
	var sqlBounds = {'lng_min':boundsOrig['_ne']['lng'],
					'lng_max':boundsOrig['_sw']['lng'],
					'lat_min':boundsOrig['_sw']['lat'],
					'lat_max':boundsOrig['_ne']['lat']};


	sql = "select a.* from holc_overlay_2016 as a where a.city='"+city+"'"
	return sql
}
function getBoundsSQL(city,year){

	// sql = `select a.* from holc_overlay_2016 as a where a.the_geom &&  ST_MakeEnvelope( ${sqlBounds['lng_min']},${sqlBounds['lat_min']},${sqlBounds['lng_max']},${sqlBounds['lat_max']}, 4326)`
	sql = "select  * from holc_overlay_"+year+" as a, (select st_envelope(the_geom) as envelope from holc_overlay_"+year+" where city='"+city+"') as b  where a.the_geom &&b.envelope"
	return sql
}
function getBoundsAllSQL(city){
	sql = "select  * from holc_overlay_all as a, (select st_envelope(the_geom) as envelope from holc_overlay_"+year+" where city='"+city+"') as b  where a.the_geom &&b.envelope"
	console.log(sql)
	return sql
}
 
})
function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}