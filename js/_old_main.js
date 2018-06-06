// $('.ui.sidebar')
//   .sidebar('toggle')
// ;

//////////////
// TOOLBAR ///
//////////////

$('.ui.sidebar.menu').sidebar({
  dimPage: false,
  transition: 'push',
});

//  $('.ui.sidebar.menu')
// .sidebar('attach events', '.open.button');

// $('.ui.left.sidebar.popout').sidebar({
//   dimPage: false,
//   transition: 'push',
//   closeable: true,
//   context: '#toolbar',
//   selector: {
//     pusher  : '.pusher-toolbar',
//     sidebar : '.ui.left.sidebar.popout'
//   }
// });


// //////////////////
// ////// MAP ///////
// //////////////////
// // L.mapbox.accessToken = 'pk.eyJ1IjoiaWFtd2Z4IiwiYSI6ImNqNGFnMnIyMzEwZzgycXJ1ODdqbG14eGMifQ.3AqBqXZlcbsbEhxddAPB-g';
// // L.accessToken = 'pk.eyJ1IjoiaWFtd2Z4IiwiYSI6ImNqNGFnMnIyMzEwZzgycXJ1ODdqbG14eGMifQ.3AqBqXZlcbsbEhxddAPB-g';

// var map = L.map('map', 
//   {zoomControl: false}).setView([-87.681,41.819],10);

// // new L.Control.Zoom({ position: 'bottomleft' }).addTo(map);

// // Set the kind of basemap
// // var basemap = L.mapbox.map('map', 'mapbox.streets')
// //     .setView([-87.681,41.819],10);

// // var map = new mapboxgl.Map({
// //   container: 'map', // container id
// //   style: 'mapbox://styles/iamwfx/cjfbzd52l8bcg2rpavusj3jjc' // replace this with your style URL
// // });

// var basemap = L.tileLayer('https://api.mapbox.com/styles/v1/iamwfx/cjfbzd52l8bcg2rpavusj3jjc/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaWFtd2Z4IiwiYSI6ImNqNGFnMnIyMzEwZzgycXJ1ODdqbG14eGMifQ.3AqBqXZlcbsbEhxddAPB-g', {
//         maxZoom: 19,
//         attribution: '&copy;<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy;<a href="https://carto.com/attribution">CARTO</a>'
//       }).addTo(map);

// ///////////
// // CREDS //
// ///////////

// // var creds = new accountCreds({
// //   apiKey: '68cc898de2719f5b4c01d88dc4b6bdb2f66b517e',
// //   username: 'cartourbandemo',
// //   map: map
// // });

// // var client = new carto.Client({
// //   apiKey: '68cc898de2719f5b4c01d88dc4b6bdb2f66b517e',
// //   username: 'cartourbandemo'
// // });

// // ////////////////////
// // //// MAIN LAYER ////
// // ////////////////////


// // var selected_layer = 'allplutonew_m_c'

// // var taxLotsQuery = 'SELECT * FROM '+ selected_layer;
// // var taxLotsSQLSource = new carto.source.SQL(taxLotsQuery);
// // var taxLotsStyle = new carto.style.CartoCSS(`
// //   #layer {
// //     polygon-fill: #f3cbd3;
// //     polygon-opacity: 0.9;
// //   }
// //   #layer::outline {
// //     line-width: .15;
// //     line-color: #FFFFFF;
// //     line-opacity: 0.15;
// // }
// // `);
// // var calculateScoreStyle = `
// //   #layer {
// //     polygon-fill: ramp([score], (#f3cbd3, #e498b4, #ca699d, #a24186, #6c2167), quantiles(5));
// //     polygon-opacity: 0.9;
// //   }
// //   #layer::outline {
// //     line-width: .15;
// //     line-color: #FFFFFF;
// //     line-opacity: 0.15;
// // }
// // `

var taxLotLayer = new carto.layer.Layer(taxLotsSQLSource, taxLotsStyle);
// var taxLotHighlightsLayer = new carto.layer.Layer(taxLotsHighlightsSQLSource, taxLotsHighlightStyle, {featureOverColumns: ['score']});

client.addLayers([ taxLotLayer]);
client.getLeafletLayer().addTo(map);


// // ////////////
// // // POP UP //
// // ////////////
// // var popup = L.popup({ closeButton: false });
// // taxLotLayer.on('featureOver', featureEvent => {
// //   popup.setLatLng(featureEvent.latLng);
// //   popup.setContent(`Lot ID: ${Math.round(featureEvent.data.cartodb_id)}`);
// //   popup.openOn(map);
// // });

// // taxLotLayer.on('featureOut', featureEvent => {
// //   popup.removeFrom(map);
// // });

// // taxLotLayer.on('featureClicked',featureEvent => {
// //     map.setView(featureEvent.latLng,18,true);
// //     console.log('feature clicked!');

// //     taxLotsStyle.setContent(`
// //       #layer {
// //         polygon-fill: ramp([score], (#f3cbd3, #e498b4, #ca699d, #a24186, #6c2167), quantiles(5));
// //         polygon-opacity: 0.9;
// //       }
// //       #layer::outline {
// //         line-width: .15;
// //         line-color: #FFFFFF;
// //         line-opacity: 0.15;
// //     }

// //       #layer[cartodb_id=${featureEvent.data.cartodb_id}]{
// //         polygon-fill: red;
// //         }
// //       `)
// //     });

// // ////////////
// // //DROPDOWN//
// // ////////////
// // var selected_layer;
// // $('select.dropdown')
// //   .dropdown('set selected', 'Manufacturing')
// //   .dropdown({onChange: function(val){
// //       if(val.length>0){
// //       selected_layer = val;
// //       taxLotsQuery = 'SELECT * FROM' + selected_layer + 'WHERE zonedist1 like %M%';
// //       taxLotsSQLSource.setQuery(taxLotsQuery);}
// // }})
// // ;

// // ////////////////////
// // ////// INFO PANEL /////
// // ////////////////////

// // // ADD FeatureClickColumns to access on FEATURE_CLICKED
// // // Is there a better way to do this?

// // taxLotLayer.setFeatureClickColumns(['zonedist1', 'ownertype',
// // 'ownername',
// // 'lotarea',
// // 'yearbuilt',
// // 'yearalter1',
// // 'bldgclass',
// // 'numbldgs',
// // 'numfloors',
// // 'bldgarea',
// // 'unitstotal',
// // 'unitsres',
// // 'condono',
// // 'borocode',
// // 'block',
// // 'lot',
// // 'borocode',
// // 'borough',
// // 'block',
// // 'lot',
// // 'residfar',
// // 'commfar',
// // 'facilfar',
// // 'address',
// // 'bldg_land_ratio',
// // 'next_election',
// // 'council_neighborhood',
// // 'council_rep_name',
// // 'council',
// // 'cd',
// // 'libraries_distance',
// // 'police_station_distance',
// // 'schools_distance',
// // 'healthcare_distance',
// // 'child_care_prek_distance',
// // 'fire_station_distance',
// // 'median_hh_income',
// // 'pop_density_change',
// // 'misdemeanors_400m',
// // 'felonies_400m',
// // 'nearest_subway_yoy2015_2016',
// // 'son_issue_1',
// // 'son_issue_2',
// // 'son_issue_3'
// // ])


// // taxLotLayer.on(carto.layer.events.FEATURE_CLICKED, d => {

// // // check if the value for land_to_building_ratio is numeric
// // // console.log($.isNumeric(`${d.data.land_to_building_ratio}`));
// // // if($.isNumeric(`${d.data.land_to_building_ratio}`)){
// // //   var land_to_building_ratio = `${d.data.land_to_building_ratio.toFixed(2)}`
// // //   console.log(land_to_building_ratio)
// // // } else {
// // //   var land_to_building_ratio = 'NULL'
// // // };

// //         console.log(d);
// //         var sidebar = new sidebarInfo({
// //                     content: makeSidebar(d)
// //                       });
// // })

// // // var checker3 = addCheckbox({column:'non_ibz', title:'Non-IBZ'});
// // var checker = addCheckbox({column:'manufacturing', title:'Manufacturing'});
// // var checker2 = addCheckbox({column:'commercial', title:'Commercial'});


// // ////////////////////
// // ////// WEIGHTS /////
// // ////////////////////
// // var slider1 =  addSlider({
// //   column: 'no_parking_required',
// //   title: 'No Parking Required',
// //   layer: taxLotLayer
// // })


// // var slider2 =  addSlider({
// //   column: 'bldg_land_ratio',
// //   title: 'Building-to-land ratio',
// // })


// // var slider3 =  addSlider({
// //   column: 'wide_street',
// //   title: 'Wide Street'
// // })


// // var slider4 =  addSlider({
// //   column: 'near_open_space',
// //   title: 'Near Open Space'
// // })

// // var slider5 =  addSlider({
// //   column: 'near_transportation',
// //   title: 'Near Transportation',
// // })

// // var slider6 =  addSlider({
// //   column: 'near_r_zone',
// //   title: 'Near Residential Zone',
// // })

// // var slider7 =  addSlider({
// //   column: 'next_to_r_zone',
// //   title: 'Adjacent to Residential Zone',
// // })

// // var slider8 =  addSlider({
// //   column: 'ibz_criteria',
// //   title: 'Non-IBZ or Gas Station in IBZ',
// //   layer: taxLotLayer
// // })

// // //////////////////
// // // RANGE FILTER //
// // //////////////////


// // var range1 =  addRangeFilter({
// //   title: 'Lot Area (sq. ft.)',
// //   credentials: creds,
// //   name: 'lotarea',
// //   column: 'lotarea',
// //   query: taxLotsSQLSource
// // })

// // ////////////////
// // // EVAL METRIC//
// // ////////////////

// // var calcButton = calcButton({
// //   buttonName:'Calculate',
// //   buttonID:'calc'
// // })


var API_KEY = '68cc898de2719f5b4c01d88dc4b6bdb2f66b517e',
                USER_NAME = 'cartourbandemo',
                SQL_CLIENT = axios.create({
                    method: 'get',
                    url: 'https://' + USER_NAME + '.carto.com/api/v2/sql?',
                    params: {
                        api_key: API_KEY
                    }
                });


// // /////////////
// // // TOP TEN //
// // /////////////

var topTen ;


// When any of the slider buttons are clicked update the weights
$('.thumb').click(function(){
    $.each(weights,function(k,v){
      weights[k]=parseInt($('#'+k+'>.inner >.track-fill').css('width').replace('px',''));
      console.log(weights[k]);
    })
  })

// Update the SQL query
$('#calc').click(function(){

    filter_query = ' where lotarea >= '+ filters['lotarea']['left'] + ' AND lotarea <= ' + filters['lotarea']['right'];
    if (filters['manufacturing'] && filters['commercial']){
      filter_query = filter_query.concat(` AND zonedist1 like '%M%' OR zonedist1 like '%C%' and zonedist1 not like 'BPC'`)
    }
    if (filters['manufacturing'] && !filters['commercial']){
      filter_query = filter_query.concat(` AND zonedist1 like '%M%'`)
    }
    if (!filters['manufacturing'] && filters['commercial']){
      filter_query = filter_query.concat(` AND zonedist1 like '%C%' and zonedist1 not like 'BPC'`)
    }

    scoreQuery = 'select *, (' +
                  weights['ibz_criteria'] + '* ibz_criteria +' +
                  weights['next_to_r_zone'] + '* resi_adjacent + ' +
                  weights['near_r_zone'] + '* resi_qrtr_mile + ' +
                  weights['near_transportation'] + '* (4*subway_entrances_qrtr_mile/10 + 3*bus_stops_qrtr_mile/10 + 2*cb_qrtr_mile/10 + ferry_landings_qrtr_mile/10) +'+
                  weights['near_open_space'] + '* (3*open_space_parks_qrtr_mile/10 + 2*nypaws_qrtr_mile/10 + cemeteries_qrtr_mile/10) + '+
                  weights['wide_street'] + '* wide_street + '+
                  weights['bldg_land_ratio'] + '* bldg_land_ratio + '+
                  weights['no_parking_required'] + '* no_parking_required) as score'
    filter_base = ' from ' + selected_layer + filter_query;
    console.log(scoreQuery + filter_base);

    taxLotsSQLSource.setQuery(scoreQuery + filter_base);
    taxLotsStyle.setContent(calculateScoreStyle);

    // GET TOP X
    X = $("#topLots").val()
    console.log("value ",X)
    centroidQuery = ', st_x(st_centroid(the_geom)) as center_x, st_y(st_centroid(the_geom)) as center_y '
    dataQuery = scoreQuery + centroidQuery +
                filter_base + ' order by score desc, cartodb_id limit ' + X;
    console.log(dataQuery);

    SQL_CLIENT.request({
        params: {
            q: dataQuery
        },
    }).then(function (response) {
        if (response && response.data) {
            $("#topTen td").remove()
            topTen= response.data['rows'];
          // Populate the top ten lots list
          topTen.forEach(function(result,index){
            tr = $("<tr>")
            td_score = $("<td>").text(result['score'])
            td_addy = $("<td>").text(result['address'])
            $(tr).attr('id','top'+index);
            $(tr).attr('value',result['center_x']+", "+result['center_y']);
            $(tr).append(td_score)
            $(tr).append(td_addy)

            $(tr).click(function(){
                map.setView({'lat':result['center_y'],'lng':result['center_x']},16,true);

                // Dynamically setting the CSS is VERRRYYYY slow
                let cartoCSS = taxLotLayer.getStyle();
                cartoCSS.setContent(
                  `
                  #layer {
                    polygon-fill: ramp([score], (#f3cbd3, #e498b4, #ca699d, #a24186, #6c2167), quantiles(5));
                    polygon-opacity: 0.9;
                  }
                  #layer::outline {
                    line-width: .15;
                    line-color: #FFFFFF;
                    line-opacity: 0.15;
                }

                  #layer[cartodb_id =`+ result['cartodb_id']+`] {
                    polygon-fill: red;

                    polygon-opacity: 0.9;
                  }
                  #layer::outline[cartodb_id =`+ result['cartodb_id']+`]{
                    line-width: .15;
                    line-color: red;
                    line-opacity: 0.5;
                }
                `);
              });
            $("#topTen").append($(tr))
          });
        }
      })
})


//////////////////////
//// OTHER LAYERS ////
//////////////////////

////////////////
// CHECKBOXES //
////////////////
var ibzZone = new addExtraLayer({
  title: 'IBZ Zones',
  type: 'polygon',
  color: '#0017ff',
  colorCSS: '#0017ff',
  name: 'nyc_ibz_all',
  checked: false,
  conditional: false
})

var subwayEntrances = new addExtraLayer({
  title: 'Subway Entrances',
  type: 'point',
  color: '#ffe800',
  colorCSS: '#ffe800',
  name: 'subway_entrances_may2016',
  checked: false,
  conditional: false
})

var existingMIH = new addExtraLayer({
  title: 'Current MIH Regions',
  type: 'polygon',
  color: '#ff00ef',
  colorCSS: '#ff00ef',
  name: 'nycmih_20171121',
  checked: false,
  conditional: false
})
var population = new addExtraLayer({
  title: 'Population',
  type: 'polygon',
  colorCSS:'ramp([aland], (#f7feae, #9bd8a4, #46aea0, #058092, #045275), quantiles)',
  color:'red',
  name: 'acs_2015_nyc',
  checked: false,
  conditional: false
})

var education = new addExtraLayer({
  title: 'EIS - Childcare and Education',
  type: 'point',
  colorCSS:'ramp([facdomain], (#df11a1, #00ff66, #00ffcc, #F2B701, #6600ff, #65ff00, #ea8107, #A5AA99), ("Education, Child Welfare, and Youth", "Parks, Gardens, and Historical Sites", "Core Infrastructure and Transportation", "Health and Human Services", "Administration of Government", "Libraries and Cultural Programs", "Public Safety, Emergency Services, and Administration of Justice"), "=")',
  color:'#df11a1',
  name: 'facilities',
  checked: false,
  conditional: true,
  condition:" where facdomain='Education, Child Welfare, and Youth'",
  popupElements:'factype'
})

var health = new addExtraLayer({
  title: 'EIS - Healthcare',
  type: 'point',
  colorCSS:'ramp([facdomain], (#df11a1, #00ff66, #00ffcc, #F2B701, #6600ff, #65ff00, #ea8107, #A5AA99), ("Education, Child Welfare, and Youth", "Parks, Gardens, and Historical Sites", "Core Infrastructure and Transportation", "Health and Human Services", "Administration of Government", "Libraries and Cultural Programs", "Public Safety, Emergency Services, and Administration of Justice"), "=")',
  color:'#F2B701',
  name: 'facilities',
  checked: false,
  conditional: true,
  condition:" where facdomain='Health and Human Services'"
})

var safet = new addExtraLayer({
  title: 'EIS - Safety',
  type: 'point',
  colorCSS:'ramp([facdomain], (#df11a1, #00ff66, #00ffcc, #F2B701, #6600ff, #65ff00, #ea8107, #A5AA99), ("Education, Child Welfare, and Youth", "Parks, Gardens, and Historical Sites", "Core Infrastructure and Transportation", "Health and Human Services", "Administration of Government", "Libraries and Cultural Programs", "Public Safety, Emergency Services, and Administration of Justice"), "=")',
  color:'#A5AA99',
  name: 'facilities',
  checked: false,
  conditional: true,
  condition:" where facdomain='Public Safety, Emergency Services, and Administration of Justice'"
})


var openSpace = new addExtraLayer({
  title: 'EIS - Open Space',
  type: 'polygon',
  color: '#00de00',
  colorCSS: '#049917',
  name: 'open_space_parks_use',
  checked: false,
  conditional: false
})

var resi = new addExtraLayer({
  title: 'Residential',
  type: 'polygon',
  colorCSS:'gray',
  color:'gray',
  name: 'allplutonew_r',
  checked: false,
  conditional: false
})
//////////////
// TOOLBAR ///
//////////////

$('.ui.sidebar.menu').sidebar({
  dimPage: false,
  transition: 'push',
});

 $('.ui.sidebar.menu')
.sidebar('attach events', '.open.button');

$('.ui.left.sidebar.popout').sidebar({
  dimPage: false,
  transition: 'push',
  closeable: true,
  context: '#toolbar',
  selector: {
    pusher  : '.pusher-toolbar',
    sidebar : '.ui.left.sidebar.popout'
  }
});


// Select which features appear when you click
// taxLotLayer.setFeatureClickColumns(['park_name', 'parknum', 'landuse']);

//ACTIONS

var creds = new accountCreds({
  apiKey: '68cc898de2719f5b4c01d88dc4b6bdb2f66b517e',
  username: 'cartourbandemo',
  map: map
});

// How to get the data out...
// console.log(creds.sqlURL + `SELECT * FROM m1_score` + creds.sqlEnd);
// var data = $.getJSON(creds.sqlURL + `SELECT * FROM m1_score` + creds.sqlEnd)
// console.log(data);

/////////////////////////////////////
///// TO DO: Does this work yet??? //
/////////////////////////////////////

var csvExport = fileExport({
 filename: "Tax Lot Report",
 credentials: creds,
 query: taxLotsQuery,
 format: "CSV"
})

var batchexport = batchExport({
	name: "BATCH EXPORT",
	description: "Download and create a table on your CARTO account based on your current query",
	credentials: creds,
	query: taxLotsQuery,
	filename: "batchexport",
	format: "CSV"
})
