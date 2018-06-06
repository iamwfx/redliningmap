var dataReturned;
var data_dict ={};
// var vals_A={}, vals_B={}, vals_C={}, vals_D={};
var holc_colors = ['#5fce23', '#0bc0ed', '#ffd419', '#ff4b19'];
var catDict ={'white_perc':'white percentage',
            'colored_perc':"colored percentage",
            'unemploy_perc':'unemployment rate',
            'median_income':"median income",
            'college_perc':'higher ed. percentage'}

////////////////////////////
//// Transition duration ///
////////////////////////////
const dur = 1500;

///////////////////////////////////////
// Setting the initial box dimensions//
///////////////////////////////////////
const whiskerLen = 1;
const boxMargin = 2;
var chart1BoxWidth = 85;
var chart1Height = 200
var chart2Width = 350
var chart2Height = 200

var t = d3.transition().duration(dur);

function yearBoxPlot(query,category){     
    var infoPanelDiv = document.getElementById("info");
    var width = infoPanelDiv.clientWidth;
    var height = infoPanelDiv.clientHeight;
    chart1BoxWidth = width/4-10;
    chart1Height = (height-400)/2;
    console.log(chart1BoxWidth);

    SQL_CLIENT.request({
        params: {
            q: query
        },
        }).then(function (response) {
        if (response && response.data) {
            var dataReturned=response.data.rows;
            var allCols = Object.keys(dataReturned[0]);
            var holcCols = $.map(dataReturned,function(val,key){
                return val['holc_grade_y']
            });

            var allColsKeep = allCols.slice(9,allCols.length);
            
            var vals_A={}, vals_B={}, vals_C={}, vals_D={};

            // var category = 'white_perc';
            var city = $('.text').text();
            var year = $('.button.year.active').text();
            $.each(dataReturned,function(i,v){

                if (v['holc_grade_y']=='A'){
                    $.each(allColsKeep,function(k,feat){
                        if (vals_A[feat]){

                            vals_A[feat].push(v[feat])
                        }
                        else{
                            vals_A[feat]=[v[feat]]
                        }
                    })
                }
                if (v['holc_grade_y']=='B'){
                    $.each(allColsKeep,function(k,feat){
                        if (vals_B[feat]){
                            vals_B[feat].push(v[feat])
                        }
                        else{
                            vals_B[feat]=[v[feat]]
                        }
                    })
                }
                if (v['holc_grade_y']=='C'){
                    $.each(allColsKeep,function(k,feat){
                        if (vals_C[feat]){
                            vals_C[feat].push(v[feat])
                        }
                        else{
                            vals_C[feat]=[v[feat]]
                        }
                    })
                }
                if (v['holc_grade_y']=='D'){
                    $.each(allColsKeep,function(k,feat){
                        if (vals_D[feat]){
                            vals_D[feat].push(v[feat])
                        }
                        else{
                            vals_D[feat]=[v[feat]]
                        }
                    })
                }
            })
            
            data_dict = {'A':vals_A,'B':vals_B,'C':vals_C,'D':vals_D}
            dataUsed = [vals_A[category],vals_B[category],vals_C[category],vals_D[category]]
        
        
    
            // Dimension of the individual boxes
            var margin = {top: 10, right: 33, bottom: 10, left: 33},
            width = chart1BoxWidth  - margin.left - margin.right,
            height = chart1Height - margin.top - margin.bottom;

            var chart = d3v3.box()
                .whiskers(iqr(1.5))
                .width(width)
                .height(height)
                .tickFormat(d3.format(".0%"));

            $(window).resize(chart);
  
            // Set the domain for the chart
            var minHolder = [],maxHolder=[];
            $.each(dataUsed,function(i,v){
                minHolder.push( v.reduce(getMin));
                maxHolder.push(v.reduce(getMax))});
            
            min = minHolder.reduce(getMin);
            max = maxHolder.reduce(getMax);
            chart.domain([min, max]);


            
            var svg = d3v3.select(".boxPlot").selectAll("svg")
                  .data(dataUsed)
                .enter().append("svg")
                  .attr("class", "box")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.bottom + margin.top)
                .append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                  .call(chart);
            updateText1(city,category,year,dataUsed);
             /// When the census category is changed, also update the chart
            $('.button.census').on('click',function(){
                var t = d3.transition().duration(dur);

                category= $(this).val();
                city = $('.text').text();
                year = $('.button.year.active').text();
                
                dataNew= [vals_A[category],vals_B[category],vals_C[category],vals_D[category]]
                updateBoxPlot(dataNew);

                updateText1(city,category,year,dataNew);
                
                

            })

            $('#cityDropdown1').on('change',function(){
                category = $('.button.census.active').val();
                city = $('.text').text();
                year = $('.button.year.active').text();
                console.log(category,city,year);

                query = getBoundsSQL(city,year);
                console.log(query)
                // catNew = $('.button.census.active').val();
                
                SQL_CLIENT.request({
                    params: {
                        q: query
                    },
                    }).then(function (response) {
                    if (response && response.data) {
                        var vals_A={}, vals_B={}, vals_C={}, vals_D={};

                        dataReturned=response.data.rows;
                        var allCols = Object.keys(dataReturned[0]);
                        var holcCols = $.map(dataReturned,function(val,key){
                            return val['holc_grade_y']
                        });

                        var allColsKeep = allCols.slice(9,allCols.length);
                        
                        

                        $.each(dataReturned,function(i,v){
                            if (v['holc_grade_y']=='A'){
                                $.each(allColsKeep,function(k,feat){
                                    if (vals_A[feat]){

                                        vals_A[feat].push(v[feat])
                                    }
                                    else{
                                        vals_A[feat]=[v[feat]]
                                    }
                                })
                            }
                            if (v['holc_grade_y']=='B'){
                                $.each(allColsKeep,function(k,feat){
                                    if (vals_B[feat]){
                                        vals_B[feat].push(v[feat])
                                    }
                                    else{
                                        vals_B[feat]=[v[feat]]
                                    }
                                })
                            }
                            if (v['holc_grade_y']=='C'){
                                $.each(allColsKeep,function(k,feat){
                                    if (vals_C[feat]){
                                        vals_C[feat].push(v[feat])
                                    }
                                    else{
                                        vals_C[feat]=[v[feat]]
                                    }
                                })
                            }
                            if (v['holc_grade_y']=='D'){
                                $.each(allColsKeep,function(k,feat){
                                    if (vals_D[feat]){
                                        vals_D[feat].push(v[feat])
                                    }
                                    else{
                                        vals_D[feat]=[v[feat]]
                                    }
                                })
                            }
                        })
                        
                        data_dict = {'A':vals_A,'B':vals_B,'C':vals_C,'D':vals_D}
                        dataNew = [vals_A[category],vals_B[category],vals_C[category],vals_D[category]]
                        
        

                        updateBoxPlot(dataNew);
                        updateText1(city,category, year,dataNew);
                    }
                })
            })
            $('.button.year').on('click',function(){

                category = $('.button.census.active').val();
                city = $('.text').text();
                // year = $(this).text();
                year = $('.button.year.active').text();
                console.log(category,city,year);
                query=getBoundsSQL(city,year);
                console.log(query);
                catNew = $('.button.census.active').val();
                SQL_CLIENT.request({
                    params: {
                        q: query
                    },
                    }).then(function (response) {
                    if (response && response.data) {
                        var vals_A={}, vals_B={}, vals_C={}, vals_D={};

                        dataReturned=response.data.rows;
                        var allCols = Object.keys(dataReturned[0]);
                        var holcCols = $.map(dataReturned,function(val,key){
                            return val['holc_grade_y']
                        });

                        var allColsKeep = allCols.slice(9,allCols.length);
                        
                        

                        $.each(dataReturned,function(i,v){
                            if (v['holc_grade_y']=='A'){
                                $.each(allColsKeep,function(k,feat){
                                    if (vals_A[feat]){

                                        vals_A[feat].push(v[feat])
                                    }
                                    else{
                                        vals_A[feat]=[v[feat]]
                                    }
                                })
                            }
                            if (v['holc_grade_y']=='B'){
                                $.each(allColsKeep,function(k,feat){
                                    if (vals_B[feat]){
                                        vals_B[feat].push(v[feat])
                                    }
                                    else{
                                        vals_B[feat]=[v[feat]]
                                    }
                                })
                            }
                            if (v['holc_grade_y']=='C'){
                                $.each(allColsKeep,function(k,feat){
                                    if (vals_C[feat]){
                                        vals_C[feat].push(v[feat])
                                    }
                                    else{
                                        vals_C[feat]=[v[feat]]
                                    }
                                })
                            }
                            if (v['holc_grade_y']=='D'){
                                $.each(allColsKeep,function(k,feat){
                                    if (vals_D[feat]){
                                        vals_D[feat].push(v[feat])
                                    }
                                    else{
                                        vals_D[feat]=[v[feat]]
                                    }
                                })
                            }
                        })
                        
                        data_dict = {'A':vals_A,'B':vals_B,'C':vals_C,'D':vals_D}
                        dataNew = [vals_A[catNew],vals_B[catNew],vals_C[catNew],vals_D[catNew]]
        


                    console.log(d3.median(vals_A[catNew]));
                    updateBoxPlot(dataNew);
                    console.log("dataNew",dataNew[0]);
                    updateText1(city,category, year,dataNew)
                }
                })
            })
    
    
            
            function updateBoxPlot(data){
                    var minHolder = [],maxHolder=[];
                    $.each(data,function(i,v){
                        minHolder.push( v.reduce(getMin));
                        maxHolder.push(v.reduce(getMax));
                    });
                    // .reduce(getMin);
                    min = minHolder.reduce(getMin);
                    max = maxHolder.reduce(getMax);
                    chart.domain([min, max]);
                    if (max>20){
                        
                        chart.tickFormat(d3.format("$.3s"));
                    }
                    else{
                        chart.tickFormat(d3.format(".0%"));   
                    }

                    svg.data(data).call(chart.duration(1500));
            } 
            
            
        }
        })


}
// )}


function historicalBoxPlot(query,category){
    // Need to create a function that takes each category, year, and quantiles and plots
    //// Specify the dimensions
    var infoPanelDiv = document.getElementById("info");
    var width = infoPanelDiv.clientWidth;
    var height = infoPanelDiv.clientHeight;
    chart2Width = width-50;
    chart2Height = (height-400)/2;

    var margin = {top: 10, right: 10, bottom: 20, left:40},
            width = chart2Width - margin.left - margin.right,
            height = chart2Height - margin.top - margin.bottom;           
    
    // 1. Get all the data

    
    SQL_CLIENT.request({
        params: {
            q: query
        },
        }).then(function (response) {
        if (response && response.data) {
            dataReturned=response.data.rows;
            var result=formatData(dataReturned)
            var valsAll= result['valsAll'];
            var valsUse = result['valsUse'];

            //////////////////////
            //// Initialize //////
            //////////////////////
             
            
            

            /// Create the SVG element
            var svg = d3.select(".historicalBoxPlot").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            
            /// Initialize the scales
            var x = d3.scaleLinear().range([0, width]);
            var y = d3.scaleLinear().range([height, 0]);
            // var color = d3.scale.category10();

            ///////////////////////////////////////////
            ////// Get the min/max for the y range/////
            ///////////////////////////////////////////

            


            //////////////////////////
            /// Define chart domain //
            //////////////////////////
            var city = $('.text').text();
            var year = $('.button.year.active').text();
            var result1 = calcMinMax(valsUse,category);
            var min =result1['min'] ;
            var max =result1['max'] ;

            x.domain([1928,2018]);
            y.domain([min,max]).nice();


            // Add the X Axis
            svg.append("g")
              .attr('class','x')
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x)
                        .tickFormat(d3.format("d")));
            
            // Add the Y Axis

            var format = d3.format(".0%");
            svg.append("g")
              .attr('class','y')
              .call(d3.axisLeft(y)
                        .ticks(8)
                        .tickFormat(d3.format(".0%")));

            svg.append('g')
                .attr('class','yearHighlight')
                .append('rect')
                .attr("x",x(year-2))
                .attr("y",0)
                .attr("width",14.5)
                .attr('height',height)
                .attr('fill','gray')
                .attr('opacity',0.1);
             
            var ind =0;
            /// Line function
            var line = d3.line()
                        .x(function(d) {return x(d.year); })
                        .y(function(d) {return y(returnNan(d.feat)); });
        
            updateText2(city,category);

            $.each(valsUse,function(i,gradeGrp){
                data=[]

                $.each(gradeGrp,function(k,v){
                    data.push({'year':parseInt(k),'feat':v[category][1],'featLower':v[category][0],'featUpper':v[category][2]});
                });

                
                

                //// Draw the line
                svg.append('g')
                    .attr('class','grade')
                    .append('path')
                    .datum(data)
                    .attr('class',"path"+i)
                    .attr("d", line)
                    .attr("fill", "none")
                    .attr("stroke",holc_colors[ind])
                    .attr("stroke-linejoin", "round")
                    .attr("stroke-width", 1.5);
                
                  
                // Draw the whiskers - top
                svg.append('g')
                    .attr('class','whiskersBottom'+i)
                    .selectAll('.whiskers')
                    .data(data)
                .enter().append("line")
                    .attr('class','whiskersT'+i)
                    .attr("x1", function(d){return x(parseInt(d.year)-whiskerLen)})
                    .attr("y1", function(d){return y(d.featUpper)})
                    .attr("x2", function(d){return x(parseInt(d.year)+whiskerLen)})
                    .attr("y2", function(d){return y(d.featUpper)})
                    .attr("stroke",holc_colors[ind])
                    .attr('stroke-width',1);
                // Draw the whiskers - bottom
                svg.append('g')
                    .attr('class','whiskersTop'+i)
                    .selectAll('.whiskers')
                    .data(data)
                .enter().append("line")
                    .attr('class','whiskersB'+i)
                    .attr("x1", function(d){return x(parseInt(d.year)-whiskerLen)})
                    .attr("y1", function(d){return y(d.featLower)})
                    .attr("x2", function(d){return x(parseInt(d.year)+whiskerLen)})
                    .attr("y2", function(d){return y(d.featLower)})
                    .attr("stroke",holc_colors[ind])
                    .attr('stroke-width',1);

                // Draw the middle line
                svg.append('g')
                    .attr('class','center'+i)
                    .selectAll('.whiskers')
                    .data(data)
                .enter().append("line")
                    .attr('class','middle'+i)
                    .attr("x1", function(d){return x(parseInt(d.year))})
                    .attr("y1", function(d){return y(d.featLower)})
                    .attr("x2", function(d){return x(parseInt(d.year))})
                    .attr("y2", function(d){return y(d.featUpper)})
                    .attr("stroke",holc_colors[ind])
                    .attr('stroke-width',0.5);
                
                /// Make the scatter plot
                svg.append('g')
                    .attr('class',i)
                    .selectAll(".dot")
                      .data(data)
                    .enter().append("circle")
                      .attr('class','circle'+i)
                      .attr("r",3)
                      .attr("cx", function(d) { return x(d.year); })
                      .attr("cy", function(d) { return y(d.feat); })
                      .style('fill',holc_colors[ind]);
               
                ind +=1
            })  
            
            $('.button.census').on('click',function(){
                city = $('.text').text();
                catNew = this.value;
                
                //////////////////////////////
                ///// Reset the y axis ///////
                //////////////////////////////

                updateHistoricalBoxPlot(valsUse,catNew);
                updateText2(city,catNew);
            })

            $('.button.year').on('click',function(){
                console.log("year changed!");

                var year = $('.button.year.active').text();
                console.log(year);
                var t = d3.transition().duration(dur);

                svg.select('.yearHighlight>rect')
                    .transition(t)
                    .attr("x",x(year-2))
                
                //////////////////////////////
                /////// Year highlight ///////
                //////////////////////////////

                // updateHistoricalBoxPlot(valsUse,catNew);

            })


            $('#cityDropdown1').on('change',function(){
                

                year = $('.button.year.active').text();
                city = $('.text').text();
                query = getBoundsAllSQL(city);

                catNew = $('.button.census.active').val();
                
                SQL_CLIENT.request({
                    params: {
                        q: query
                    },
                    }).then(function (response) {
                    if (response && response.data) {
                        dataReturned=response.data.rows;
                        var result=formatData(dataReturned);
                        var valsAll= result['valsAll'];
                        var valsUse = result['valsUse'];
                        var t = d3.transition().duration(dur);
                        
                        var svg= d3.select('.historicalBoxPlot>svg>g');
                        
                        
                        updateHistoricalBoxPlot(valsUse,catNew);
                        $('.button.census').on('click',function(){
                
                            catNew = this.value;
                            
                            //////////////////////////////
                            ///// Reset the y axis ///////
                            //////////////////////////////

                            updateHistoricalBoxPlot(valsUse,catNew);
                            updateText2(city,catNew);

            })
                    }
                })
            })
      
            ///////////////// 
            /// Functions ///
            /////////////////

            function updateHistoricalBoxPlot(valsDict,catNew){

                var t = d3.transition().duration(dur);
                var result1 = calcMinMax(valsDict,catNew);
                var min =result1['min'] ;
                var max =result1['max'] ;
                var format = d3.format(".0%");
                if (max>20){
                    format = d3.format("$.02s")
                }
                else{
                    format =  d3.format(".0%");
                }
                

                // var y = d3.scaleLinear().range([height, 0]);
                y.domain([min,max]).nice();
                
                svg.select('.y')
                    .transition(t)
                    .call(d3.axisLeft(y)
                        .ticks(8)
                        .tickFormat(format));


                $.each(valsDict,function(i,gradeGrp){
                    data=[]
                    
                    $.each(gradeGrp,function(k,v){
                        
                        data.push({'year':parseInt(k),'feat':v[catNew][1],'featLower':v[catNew][0],'featUpper':v[catNew][2]});
                    });


                    // console.log(data);
                    ///Update the chart data
                    svg.select(".path"+i)
                    .datum(data)
                    .transition(t)
                    .attr("d", line);  

                    svg.selectAll(".whiskersT"+i)
                    .data(data)
                    .transition(t)
                    .attr("x1", function(d){return x(parseInt(d.year)-whiskerLen)})
                    .attr("y1", function(d){return y(returnNan(d.featUpper))})
                    .attr("x2", function(d){return x(parseInt(d.year)+whiskerLen)})
                    .attr("y2", function(d){return y(returnNan(d.featUpper))})

                    svg.selectAll(".whiskersB"+i)
                    .data(data)
                    .transition(t)
                    .attr("x1", function(d){return x(parseInt(d.year)-whiskerLen)})
                    .attr("y1", function(d){return y(returnNan(d.featLower))})
                    .attr("x2", function(d){return x(parseInt(d.year)+whiskerLen)})
                    .attr("y2", function(d){return y(returnNan(d.featLower))});   
                    svg.selectAll('.middle'+i)
                    .data(data)
                    .transition(t)
                    .attr("x1", function(d){return x(parseInt(d.year))})
                    .attr("y1", function(d){return y(returnNan(d.featLower))})
                    .attr("x2", function(d){return x(parseInt(d.year))})
                    .attr("y2", function(d){return y(returnNan(d.featUpper))});
                    
                    d3.selectAll('.circle'+i)
                    .data(data)
                    .transition(t)
                    .attr("cx", function(d) { return x(d.year); })
                    .attr("cy", function(d) {return y(returnNan(d.feat))});
                })
            }
            
            function formatData(dataReturned){
                const holcGrades = ['A','B','C','D'];
                const years = [1930,1940,1950,1960,1970,1980,1990,2000,2010,2016];
                const allColsKeep = ['population','white_perc','colored_perc','unemploy_perc','college_perc','median_income'];
                
                

                var valsAll={'A':{},'B':{},'C':{},'D':{}};
                var valsUse={'A':{},'B':{},'C':{},'D':{}};
                /// For each grade 
                $.each(holcGrades,function(l,grade){
                    valsAll[grade]={};
                    valsUse[grade]={};

                    /// For each year
                    $.each(years,function(j,yr){
                        valsAll[grade][yr]={};
                        valsUse[grade][yr]={};
                            /// Filter for the year and grade that we want
                            var dictSnippet = $.grep(dataReturned, function( val, i ) {
                              return ( val.year==yr && val.holc_grade_y==grade);
                            
                            });

                           
                            /// Filter for the categories we want
                            dictSnippet = allColsKeep.map(function(key){ 

                                /// For all the rows 
                                valsAll[grade][yr][key]=dictSnippet.map(function(val){
                                    ///// Returns all the values for that key
                                    return val[key]
                                    })


                                /// Get standard dev
                                valsUse[grade][yr][key] = StdDev(
                                    dictSnippet.map(function(val){
                                    ///// Returns all the values for that key
                                    return val[key]
                                    }))
                                })
                                   
                    })
                })
                return {'valsAll':valsAll, 'valsUse':valsUse}
            }
            function Quartiles(d) {
                d = d.sort(d3.ascending);
              return [
                d3.quantile(d, .25),
                d3.quantile(d, .5),
                d3.quantile(d, .75)
              ];
            }
            function StdDev(d) {
                // d = d.sort(d3.ascending);
                mean = d3.mean(d);
                sdev = d3.deviation(d);
              return [
                mean - 0.5*sdev,
                mean, 
                mean + 0.5*sdev
              ];
            }
            
            function calcMinMax(valsDict,category){
                var minHolder = [],maxHolder=[];
                // 2.2. for each of the key/value pairs in the overall dictinary..
                $.each(valsDict,function(k,v){


                    minHolder.push(
                        // 2.3. Get the values of each their pairs - that is, their category data
                        Object.values(v).map(function(val){
                            // 2.4. Get only the category we currently care about and the lower quartile,  get the Min/Max, and push 
                            return val[category][0]
                        }).reduce(getMin));
                    maxHolder.push(
                        Object.values(v).map(function(val){
                            return val[category][2]
                        }).reduce(getMax));
                })
                
                min = minHolder.reduce(getMin);
                max = maxHolder.reduce(getMax);
                return {'min':min,'max':max}
            }
        // })
                // dataNew=getData(cat)
                // dataNew= [vals_A[category],vals_B[category],vals_C[category],vals_D[category]]
                // updateBoxPlot(dataNew);

            // })
         

  
        }
    })
}
            

// }
function getBoundsSQL(city,year){
    sql = "select  * from holc_overlay_"+year+" as a, (select st_envelope(the_geom) as envelope from holc_overlay_"+year+" where city='"+city+"') as b  where a.the_geom &&b.envelope"
    return sql
}
function getBoundsAllSQL(city){
    sql = "select  * from holc_overlay_all as a, (select st_envelope(the_geom) as envelope from holc_overlay_all where city='"+city+"') as b  where a.the_geom &&b.envelope"
    return sql
}
function getMax(total, num) {
                if(total>num){ return total}else{return num}
            }
function getMin(total, num) {
    if(total<num){ return total}else{return num}
}
function randomize(d) {
  if (!d.randomizer) d.randomizer = randomizer(d);
  return d.map(d.randomizer);
}

function randomizer(d) {
  var k = d3v3.max(d) * .02;
  return function(d) {
    return Math.max(min, Math.min(max, d + k * (Math.random() - .5)));
  };
}

// Returns a function to compute the interquartile range.
function iqr(k) {
  return function(d, i) {
    var q1 = d.quartiles[0],
        q3 = d.quartiles[2],
        iqr = (q3 - q1) * k,
        i = -1,
        j = d.length;
    while (d[++i] < q1 - iqr);
    while (d[--j] > q3 + iqr);
    return [i, j];
  };
}


function returnNan(d){
                if (!isNaN(d)){
                    return d;
                }
                else{return 0}
            }
function loadWords(){
    var word1 = {
            text: 'word',
            size: 32,
            color:'#FF00FF'
            };
    var word2 = {
            text: 'word2',
            size: 45,
            color:'#3498DB'
            };
    return [word,word2]
    }
function updateText1(city,category, year,data){
    text1= `<span>In ${year}, ${city} had a median ${catDict[category]} of </span>`
    if(category=='median_income'){
        var format =d3.format("$.3s")
        // textA = format(d3.mean(vals_A[category]))
        textA = `<span class=colorA> ${format(d3.median(data[0]))}</span> for class <span class = colorA> A,</span>` 
        textB = `<span class=colorB> ${format(d3.median(data[1]))}</span> for <span class = colorB> B,</span>` 
        textC = `<span class=colorC> ${format(d3.median(data[2]))}</span> for <span class = colorC> C,</span>` 
        textD = `<span class=colorD> ${format(d3.median(data[3]))}</span> for <span class = colorD> D</span><span>.</span>` 
    }
    else{
    // textA=  format(d3.mean(vals_A[category]))
    textA = `<span class=colorA> ${d3.format(".0%")(d3.median(data[0]))}</span> for class <span class = colorA> A,</span>` 
    textB = `<span class=colorB> ${d3.format(".0%")(d3.median(data[1]))}</span> for <span class = colorB> B,</span>` 
    textC = `<span class=colorC> ${d3.format(".0%")(d3.median(data[2]))}</span> for <span class = colorC> C,</span>` 
    textD = `<span class=colorD> ${d3.format(".0%")(d3.median(data[3]))}</span> for <span class = colorD> D</span><span>.</span>` 
    }
    finalText = String(text1)+String(textA)+String(textB)+String(textC)+String(textD)
    // console.log(finalText);

    $( ".infoDesc1" ).fadeOut(Math.floor(dur/2), function() {
        // $('.infoDesc1').remove();
        $('.infoDesc1').html(finalText);
        
        $( ".infoDesc1" ).fadeIn(Math.floor(dur/2), function() {
            
        });
    });

}
function updateText2(city,category){
    text2= `<span>Historical trends for mean ${catDict[category]} in ${city}.</span>`
     $( ".infoDesc2" ).fadeOut(Math.floor(dur/2), function() {
        // $('.infoDesc1').remove();
        $('.infoDesc2').html(text2);
        
        $( ".infoDesc2" ).fadeIn(Math.floor(dur/2), function() {
            
        });
    });

}




