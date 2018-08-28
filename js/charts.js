var dataReturned,dataNew,dataUsed;
var data_dict ={};
// var vals_A={}, vals_B={}, vals_C={}, vals_D={};
const holc_colors = ['#5fce23', '#0bc0ed', '#ffd419', '#ff4b19'];

////////////////////////////
//// Transition duration ///
////////////////////////////
const dur = 1500;

///////////////////////////////////////
// Setting the initial box dimensions//
///////////////////////////////////////
const whiskerLen = 1;
const boxMargin = 2;
var chart1BoxWidth = 120;
var chart1Height = 140;

var chart2Width = 360;
var chart2Height = 200;

var t = d3.transition().duration(dur);

var category,city,year
function yearBoxPlot(query,category){     


    var infoPanelDiv = document.getElementById("info");
    var width = infoPanelDiv.clientWidth;
    var height = infoPanelDiv.clientHeight;
    // $( window ).resize(function() {
    //   var width = infoPanelDiv.clientWidth;
    //     var height = infoPanelDiv.clientHeight;
    // });
    chart1BoxWidth = width/4-10;
    chart1Height = height/4

    $.getJSON('https://parksgps.carto.com/api/v2/sql/?q='+query, function(data) {

    
            // Get the new features
            newFeatures = getFeatures()
            category=newFeatures[0]
            city = newFeatures[1]
            year = newFeatures[2]
            
            ////////////////////////////////////////////
            ////////////// Get the data ////////////////
            ////////////////////////////////////////////

            var dataReturned=data.rows;
            var allCols = Object.keys(dataReturned[0]);
            // var holcCols = $.map(dataReturned,function(val,key){
            //     return val['holc_grade_y']
            // });

            var allColsKeep = allCols
            // .slice(9,allCols.length);
            
            var vals_A={}, vals_B={}, vals_C={}, vals_D={};
            var data_dict = {'A':{},'B':{},'C':{},"D":{}}
           
            $.each(dataReturned,function(i,v){
                $.each(allColsKeep,function(k,feat){
                    if (data_dict[v['holc_grade_y']][feat]){

                            data_dict[v['holc_grade_y']][feat].push(v[feat])
                        }
                        else{
                            data_dict[v['holc_grade_y']][feat]=[v[feat]]
                        }
                    })
            })
                

            dataUsed = [data_dict['A'][category],data_dict['B'][category],data_dict['C'][category],data_dict['D'][category]]
            var dataNew = fillMissingData(dataUsed,1)

            //////////////////////////////////
            //////////// Draw the chart //////
            ///////////////////////////////////

            // Dimension of the individual boxes
            var margin = {top: 10, right: 33, bottom: 10, left: 33},
            width = chart1BoxWidth  - margin.left - margin.right,
            height = chart1Height - margin.top - margin.bottom;

            var boxPlotFormat;
            shortformFormat = getShortformFormat(category);

            var chart = d3v3.box()
                .whiskers(iqr(1.5))
                .width(width)
                .height(height)
                .tickFormat(shortformFormat);

            $(window).resize(chart);
  
            // Set the domain for the chart
            var minHolder = [],maxHolder=[];
            $.each(dataNew,function(i,v){

                minHolder.push( v.reduce(getMin));
                maxHolder.push(v.reduce(getMax))});
            
            min = minHolder.reduce(getMin);
            max = maxHolder.reduce(getMax);


            chart.domain([min, max]);



            var svg = d3v3.select(".boxPlot").selectAll("svg")
                  .data(dataNew)
                .enter().append("svg")
                  .attr("class", "box")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.bottom + margin.top)
                .append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                  .call(chart);

            ///CHECK THIS
            updateText1(city,category,year,dataNew);


            //  /// When the census category is changed, also update the chart
            // $('#censusDropdown1').on('change',function(){
                    
            //         var t = d3.transition().duration(dur);


            //         // Get the new features
            //         newFeatures = getFeatures()
            //         category=newFeatures[0]
            //         city = newFeatures[1]
            //         year = newFeatures[2]
                    
            //         dataNew= fillMissingData([data_dict['A'][category],data_dict['B'][category],data_dict['C'][category],data_dict['D'][category]],1);
                            
            //         //CHECK THIS        
            //         updateBoxPlot(dataNew,category);
            //         updateText1(city,category,year,dataNew);
                
            // })
            $('#censusDropdown1').dropdown({
                onChange:function(val){ 
                updateBoxPlotAll()
            }});
            // Update plot on city and year change
            $('#cityDropdown1').dropdown({
                onChange:function(val){ 
                updateBoxPlotAll()
            }
            });
            $('#yearSlider>svg>g>.slider>.parameter-value>text').bind("DOMSubtreeModified",function(){
                updateBoxPlotAll()});
                
          
            
            function updateBoxPlot(data,category){
                    // Get the text format
                    shortformFormat = getShortformFormat(category);
            

                    // Find the max and min for each class
                    var minHolder = [],maxHolder=[];
                    $.each(data,function(i,v){
                        minHolder.push(v.reduce(getMin));
                        maxHolder.push(v.reduce(getMax));
                       
                        
                    });
                    
                    
                    min = Math.min(...minHolder);
                    max = Math.max(...maxHolder);

                    chart.domain([min, max]);
                    chart.tickFormat(shortformFormat);

                    svg.data(data).call(chart.duration(1500)).exit().remove();
                } 
            function updateBoxPlotAll(){
               // Get the new features
                newFeatures = getFeatures();
                category=newFeatures[0]
                city = newFeatures[1]
                year = newFeatures[2]

                query = getBoundsSQL(city,year);

                    $.getJSON('https://parksgps.carto.com/api/v2/sql/?q='+query, function(data) {
                        // var vals_A={}, vals_B={}, vals_C={}, vals_D={};

                        dataReturned=data.rows;
                        var allCols = Object.keys(dataReturned[0]);
                        var allColsKeep = allCols;
                        // .slice(9,allCols.length);
                        var data_dict = {'A':{},'B':{},'C':{},"D":{}}

                        /// Update our data
                        $.each(dataReturned,function(i,v){
                            $.each(allColsKeep,function(k,feat){
                                if (data_dict[v['holc_grade_y']][feat]){
                                        data_dict[v['holc_grade_y']][feat].push(v[feat])
                                    }
                                    else{
                                        data_dict[v['holc_grade_y']][feat]=[v[feat]]
                                    }
                                })
                        })
                        
                        //// Fill missing data
                        dataNew= fillMissingData([data_dict['A'][category],data_dict['B'][category],data_dict['C'][category],data_dict['D'][category]],1);
                                                /// For each cateogry, get the min and max                        
                        $.each(dataNew,function(i,v){
                        if(v==null){
                            
                            minHolder.push(0);
                            maxHolder.push(0);    
                        }
                            else{
                        
                        minHolder.push(v.reduce(getMin));
                        maxHolder.push(v.reduce(getMax));
                       
                            }
                        });
                        
                        
                        updateBoxPlot(dataNew,category);
                        /// CHECK THIS
                        updateText1(city,category, year,dataNew);
                        updateText2(city,category);
                    // }
                })
            }    
            
        })


}

function historicalBoxPlot(query,category){
    // Need to create a function that takes each category, year, and quantiles and plots
    //// Specify the dimensions
    var infoPanelDiv = document.getElementById("info");
    var width = infoPanelDiv.clientWidth;
    var height = infoPanelDiv.clientHeight;

    chart2Width = width-30;
    chart1Height = height/4;
    var margin = {top: 10, right: 10, bottom: 20, left:32},
            width = chart2Width - margin.left - margin.right,
            height = chart2Height - margin.top - margin.bottom;           
    
    // 1. Get all the data
    $.getJSON('https://parksgps.carto.com/api/v2/sql/?q='+query, function(data) { 
            ////////////////////////////////////////////
            ////////////// Get the data ////////////////
            ////////////////////////////////////////////

            dataReturned=data.rows;
            
            var result=formatData(dataReturned);
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
            $(window).resize(d3.select(".historicalBoxPlot"));

            /// Initialize the scales
            var x = d3.scaleLinear().range([0, width]);
            var y = d3.scaleLinear().range([height, 0]);


            //////////////////////////
            /// Define chart domain //
            //////////////////////////
            newFeatures = getFeatures()
            category=newFeatures[0]
            city = newFeatures[1]
            year = newFeatures[2]


            updateText2(city,category);


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
            // var format = d3.format(".0%");
            var format = getShortformFormat(category);

            svg.append("g")
              .attr('class','y')
              .call(d3.axisLeft(y)
                        .ticks(8)
                        .tickFormat(format));

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
                      .style('fill',holc_colors[ind])
                      .exit().remove();
               
                ind +=1
            })  
            
            $('#censusDropdown1').on('change',function(){
                newFeatures = getFeatures()
                category=newFeatures[0]
                city = newFeatures[1]
                year = newFeatures[2]

                //////////////////////////////
                ///// Reset the y axis ///////
                //////////////////////////////

                updateHistoricalBoxPlot(valsUse,category);
                updateText2(city,category);
            })

            // $('.button.year').on('click',function(){
            $('#yearSlider>svg>g>.slider>.parameter-value>text').bind("DOMSubtreeModified",function(){
                newFeatures = getFeatures()
                category=newFeatures[0]
                city = newFeatures[1]
                year = newFeatures[2]
                

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
                // Get the new features
                newFeatures = getFeatures()
                category=newFeatures[0]
                city = newFeatures[1]
                year = newFeatures[2]

                
                query = getBoundsAllSQL(city);
 
                $.getJSON('https://parksgps.carto.com/api/v2/sql/?q='+query, function(data) {        
                        dataReturned=data.rows;
                        var result=formatData(dataReturned);
                        var valsAll= result['valsAll'];
                        var valsUse = result['valsUse'];
                        var t = d3.transition().duration(dur);
                        
                        var svg= d3.select('.historicalBoxPlot>svg>g');
                        
                        
                        updateHistoricalBoxPlot(valsUse,category);
                        updateText2(city,category);
                        // $('#censusDropdown1').on('change',function(){
                        //     catNew=catDict1[$('#censusDropdown1 .text').text()];
                        //     //////////////////////////////
                        //     ///// Reset the y axis ///////
                        //     //////////////////////////////

                        //     updateHistoricalBoxPlot(valsUse,catNew);
                        //     updateText2(city,catNew);

                        })
                })
    

            // })
      
            ///////////////// 
            /// Functions ///
            /////////////////

            function updateHistoricalBoxPlot(valsDict,catNew){
                var t = d3.transition().duration(dur);
                var result1 = calcMinMax(valsDict,catNew);
                var min =result1['min'] ;
                var max =result1['max'] ;
                var shortformFormat = getShortformFormat(category);


                
                y.domain([min,max]).nice();
                
                svg.select('.y')
                    .transition(t)
                    .call(d3.axisLeft(y)
                        .ticks(8)
                        .tickFormat(shortformFormat));


                $.each(valsDict,function(i,gradeGrp){
                    data=[]
                    
                    $.each(gradeGrp,function(k,v){
                        data.push({'year':parseInt(k),'feat':v[catNew][1],'featLower':v[catNew][0],'featUpper':v[catNew][2]});
                    });


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
                const allColsKeep = ['population','population_density','white_perc','colored_perc','hispanic_perc','other_perc','unemployed_perc','college_perc','median_income_adj'];
                // allColsKeep = censusFeatures[parseInt(year)];
                
                

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
                                valsUse[grade][yr][key] = Quartiles2(
                                    dictSnippet.map(function(val){
                                    ///// Returns all the values for that key
                                    return val[key]
                                    }))
                                })
                                   
                    })
                })
                return {'valsAll':valsAll, 'valsUse':valsUse}
            }
            
            
            function calcMinMax(valsDict,category){
                var minHolder = [],maxHolder=[];
                
                // 2.2. for each of the key/value pairs in the overall dictinary..
                $.each(valsDict,function(k,v){


                    minHolder.push(
                        // 2.3. Get the values of each their pairs - that is, their category data
                        Object.values(v).map(function(val){
                            // 2.4. Get only the category we currently care about and the lower quartile,  get the Min/Max, and push 
                            if(isNaN(val[category][0])){
                                return 0
                            }
                            else{
                            return val[category][0]}
                        }).reduce(getMin));
                    maxHolder.push(
                        Object.values(v).map(function(val){

                            if(isNaN(val[category][2])){
                                return 0
                            }
                            else{
                            return val[category][2]}
                        }).reduce(getMax));
                })
                
                
                min = Math.min(...minHolder);
                max = Math.max(...maxHolder);
                return {'min':min,'max':max}
            }
 
    })
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

function getLongformFormat(category){
    var longformFormat
    if(category=='median_income_adj'){
        longformFormat =d3.format("$.3s")
    }
    else if((category=='population')|(category=='population_density')){
        longformFormat = d3.format(",.0f")
        longformFormat = d3.format(",.0f")
    }

    else{
        longformFormat =d3.format(".0%")
    }
    return longformFormat;
}

function getShortformFormat(category){
    var shortformFormat
    if(category=='median_income_adj'){
        shortformFormat =d3.format("$.2s")
    }
    else if((category=='population')|(category=='population_density')){
        shortformFormat = d3.format(".2s")
        shortformFormat = d3.format(".2s")
    }

    else{
        shortformFormat =d3.format(".0%")
    }
    return shortformFormat;
}
            
function updateText1(city,category, year,data){
    text1= `<span>In ${year}, the median <strong> ${catDict[category].toLowerCase()} </strong> for <strong> ${city}'s</strong> HOLC neighborhoods was </span>`
    longformFormat = getLongformFormat(category);

    textA = `<span class=colorA><strong> ${longformFormat(d3.median(data[0]))}</strong></span> for class <span class = colorA> <strong>A</strong>,</span>` 
        textB = `<span class=colorB><strong>  ${longformFormat(d3.median(data[1]))}</strong></span> for <span class = colorB> <strong>B</strong>,</span>` 
        textC = `<span class=colorC><strong>  ${longformFormat(d3.median(data[2]))}</strong></span> for <span class = colorC> <strong>C</strong>,</span>` 
        textD = `<span class=colorD><strong>  ${longformFormat(d3.median(data[3]))}</strong></span> for <span class = colorD> <strong>D</strong></span><span>.</span>` 
    
    finalText = String(text1)+String(textA)+String(textB)+String(textC)+String(textD)

    $( ".infoDesc1" ).fadeOut(Math.floor(dur/2), function() {
        $('.infoDesc1').html(finalText);
        
        $( ".infoDesc1" ).fadeIn(Math.floor(dur/2), function() {
            
        });
    });

}
function updateText2(city,category){
    text2= `<span>These are the historical trends for median <strong> ${catDict[category].toLowerCase()}</strong> in <strong> ${city}'s</strong> HOLC neighborhoods.**<span class=""></span></span>`
     $( ".infoDesc2" ).fadeOut(Math.floor(dur/2), function() {
        $('.infoDesc2').html(text2);
        
        $( ".infoDesc2" ).fadeIn(Math.floor(dur/2), function() {
            
        });
    });

}

function fillMissingData(data,lenArray){
    var newdata = []
    $.each(data,function(i,v){
        if(v==null){
            newdata[i]=Array(lenArray).fill(0)
        }
        else{
            newdata[i]=v   
        }
    })
    return newdata
}

function getFeatures() {
    category=catDict1[$('#censusDropdown1 .text').text()];
    city = $('#cityDropdown1 .text').text();
    year = $('#yearSlider>svg>g>.slider>.parameter-value>text').text()
    
    // Change the available cities
    cityList = cities[parseInt(year)].sort();
   
    // Change the available census features
    censusList1 = censusFeatures[parseInt(year)];

    // If the current city isn't in the new list, then default to the first on the list
    if ($.inArray(city,cityList)==-1){
        city = cityList[0];
    }
    // If the current category isn't in the new list, then default to the first on the list
    if ($.inArray(category,censusList1)==-1){
        category=censusList1[0];
    }
   return [category,city,year]
}

function Quartiles(d) {
                d = d.sort(d3.ascending);
              return [
                d3.quantile(d, .25),
                d3.quantile(d, .5),
                d3.quantile(d, .75)
              ];
            }
function Quartiles2(d) {
    d = d.sort(d3.ascending);
  return [
    d3.quantile(d, .4),
    d3.quantile(d, .5),
    d3.quantile(d, .6)
  ];
}
function StdDev(d) {
    // d = d.sort(d3.ascending);
    mean = d3.median(d);
    sdev = d3.deviation(d);
  return [
    mean - 0.5*sdev,
    mean, 
    mean + 0.5*sdev
  ];
}
