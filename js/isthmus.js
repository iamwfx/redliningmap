//IMPORT VEGA LITE

//STYLES

function sidebarColor(c) {
//just make one giant function that does all this together with the colors and map title
};

function iconColor(c) {

};

function iconImg(c) {

};



//ACCOUNT DEFS

function accountCreds(settings) {

  this.accountName = settings.username;
  this.apiKey = settings.apiKey;
	this.sqlURL = 'https://'+settings.username+'.carto.com/api/v2/sql?q=';
  this.exportURL = 'https://'+settings.username+'.carto.com/api/v2/sql?';
	this.jobURL = 'https://'+settings.username+'.carto.com/api/v2/sql/job/';
	this.sqlEnd = '&api_key='+settings.apiKey+'';
	this.batchEnd = '?api_key='+settings.apiKey+'';
  this.map = settings.map;

};

//TEXT QUERY

function textQuery(settings) {
  v = settings.variable
  c = settings.column
  n = settings.name
  d = settings.dropdown

  function g() {
    if (d === true) {
    var v = $("#"+n+"").val();

  } else {
    v = settings.variable
  }
    return v
  };

  var v = g();

  joined = ""

  if (v.length === 0) {
    joined = null
  }
  else {
    joined = ""+c+" IN (" + "'" + v.join("'" + ',' + "'") + "'" + ")"
  };
  return joined
}


//CHECKBOX ARRAY

function newCheckboxList(settings) {

  var list = []
  var joined = ""
  var sub = settings.name
  var query = settings.query._query
  var url = `${settings.credentials.sqlURL}WITH a AS (${query}) SELECT a.${settings.column} as name, lower(replace(a.${settings.column}, ' ', '')) as id, ${settings.aggregation}(*) from a group by a.${settings.column}, id order by ${settings.aggregation} desc${settings.credentials.sqlEnd}`


  $("<div></div>").addClass(""+settings.name+"").attr("id", "checklist").appendTo( ".widget-content" );

  $("."+settings.name+"").before(`
      <br></br>
      <p><b class="wisconsin">${settings.title}</b></p>
  `)



  // $(".ui.multiple.search.dropdown").mouseout( function () {
  $("#button").mouseup( function () {
  	var query = settings.query._query
  	console.log(query)
  	var url = `${settings.credentials.sqlURL}WITH a as (${query}), b as (select count(*), ${settings.column} from a group by ${settings.column}) SELECT ${settings.dataset}.${settings.column} as name, lower(replace( ${settings.dataset}.${settings.column}, ' ', '')) as id, COALESCE(b.count, 0) from ${settings.dataset} LEFT JOIN b on ${settings.dataset}.${settings.column}  = b.${settings.column} group by ${settings.dataset}.${settings.column}, id, count order by coalesce desc${settings.credentials.sqlEnd}`

  	$.getJSON(`${settings.credentials.sqlURL}WITH a as (${query}), b as (select count(*), ${settings.column} from a group by ${settings.column}) SELECT ${settings.dataset}.${settings.column} as name, lower(replace( ${settings.dataset}.${settings.column}, ' ', '')) as id, COALESCE(b.count, 0) from ${settings.dataset} LEFT JOIN b on ${settings.dataset}.${settings.column}  = b.${settings.column} group by ${settings.dataset}.${settings.column}, id, count order by coalesce desc${settings.credentials.sqlEnd}`, function( data ) {

  		//$("."+settings.name+"").empty();

  	  var items = [];

  	  $.each(data.rows, function(key, val) {
  			if (val.coalesce === 0) {

  				items.push( "<div class=\"ui checkbox "+sub+" "+val.id+"\"> <input type=\"checkbox\" id=\""+sub+"\" value=\""+val.name+"\" tabindex=\"0\"> <label>"+val.name+" ("+val.coalesce+")</label> </div> <div class=\"smallspace\"></div>" );

  			} else {

  	    	items.push( "<div class=\"ui checkbox "+sub+" "+val.id+"\"> <input type=\"checkbox\" id=\""+sub+"\" checked=\"\" value=\""+val.name+"\" tabindex=\"0\"> <label>"+val.name+" ("+val.coalesce+")</label> </div> <div class=\"smallspace\"></div>" );

  			}

  	  });

  		$("."+settings.name+"").empty()

  	  $("."+settings.name+"").append(items.join(""))

  	  $.each(data.rows, function(key, val) {

  	  $('.ui.checkbox.'+sub+'.'+val.id+'').checkbox({
  	    //fireOnInit: true,
  	    onChecked: function () { list.push(''+val.name+'') },
  	    onUnchecked: function () {
  	      for(var i = 0; i < list.length; i++) {
  	      if(list[i] == ''+val.name+'') {
  	          list.splice(i, 1);
  	          break;
  	          }
  	        }
  	      }

  	    });
  	  });

  	//return joined

  	}); //END DATA FUNCTION

  });



  $.getJSON(`
    ${url}
    `, function( data ) {

    var items = [];

    $.each(data.rows, function(key, val) {

      items.push( "<div class=\"ui checkbox "+sub+" "+val.id+"\"> <input type=\"checkbox\" id=\""+sub+"\" checked=\"\" value=\""+val.name+"\" tabindex=\"0\"> <label>"+val.name+" ("+val.count+")</label> </div> <div class=\"smallspace\"></div>" );

    });

    $("."+settings.name+"").append(items.join(""))

    $.each(data.rows, function(key, val) {



    $('.ui.checkbox.'+sub+'.'+val.id+'').checkbox({
      fireOnInit: true,
      onChecked: function () { list.push(''+val.name+'') },
      onUnchecked: function () {
        for(var i = 0; i < list.length; i++) {
        if(list[i] == ''+val.name+'') {
            list.splice(i, 1);
            break;
            }
          }
        }

      });
    });

  //return joined
  console.log(query)

  }); //END DATA FUNCTION

  return list

};

//DROPDOWNS

//first create the dropdown, then assemble the query with input for column name, then generate the html

function newDropdown(s) {

  var name = s.id;
  var values = s.max;
  var col = s.column;
  var table = s.table;
  var link = s.linked;
  var urlStart = s.credentials.sqlURL
  var query = s.query._query
  var urlEnd = s.credentials.sqlEnd

  //ADD IN AN OPTION FOR GROUPINGS & COUNTS
  //ASSEMBLE URL HERE THEN PASS IN
  //update it to be .html content
  //ADD IN BREAKS AND TITLES

  var url = ""

  $("#checklist").click( function () {
  	console.log('This is the dropdown working')

  	var url = ""+s.credentials.sqlURL+"with a as ("+s.query._query+") select a."+col+" as name, a."+col+"  as value from a group by a."+col+" order by a."+col+" asc"+s.credentials.sqlEnd+""
  	//console.log(s.query._query)
  	//console.log(url)
  	return url

  });

  $("<select></select>").attr("id", ""+name+"", "multiple", "").addClass("ui multiple search dropdown "+name+"").appendTo( ".widget-content" );

  $(".ui.multiple.dropdown."+name+"").before(`
      <p><b class="wisconsin">${s.title}</b></p>
      `)

  $('.ui.multiple.dropdown.'+name+'').dropdown({
    maxSelections: values,
    fields: { name: "name", value: "value" },
    apiSettings: {
        cache: false,
        beforeSend: function(settings) {
  				//console.log(query)
  				var url = ""+s.credentials.sqlURL+"with a as ("+s.query._query+") select a."+col+" as name, a."+col+"  as value from a group by a."+col+" order by a."+col+" asc"+s.credentials.sqlEnd+""
          //console.log(url)
  				settings.url = url
  				return settings
        },
        onResponse: function(cartoResponse) {
          return {
              "success": true,
              "results": cartoResponse.rows
          };
      },
      url: url
      },
    saveRemoteData: false,
    filterRemoteData: true,
    dataType: JSON
  });

};


//CHECKBOXES

function newCheckbox(settings) {

  var b = settings.name;
  var a = settings.layer;
  var map = settings.credentials.map;
  var c = settings.checked;
  var t

  function check() {

    if (c === false) {
      var t = `<input type="checkbox" name="${b}">`
    } else {
      var t = `<input type="checkbox" name="${b}" checked="">`
    }

    return t

  };

  var d = check();

  $("<div></div>").html(`
    ${d}
    <label>${settings.label}</label>
    `).addClass("ui checkbox "+settings.name+" checked").appendTo( ".widget-content" );

  $(".ui.checkbox."+b+"").before(`
    <br></br>
    <p><b class="wisconsin">${settings.title}</b></p>
    `)

  var client = new carto.Client({
    apiKey: settings.credentials.apiKey,
    username: settings.credentials.accountName
  });


  $('.ui.checkbox.'+b+'').checkbox({
    fireOnInit: true,
    onChecked: function () { client.addLayers([ a ]); client.getLeafletLayer().addTo(map);},
    onUnchecked: function () { client.removeLayers([ a ]); }

  });

};


//SLIDER
function newSlider(s){
  //This function should do the following: 
  // 0. Create a div called categoryslider
  // 1. Using a set of min/max weights (should these be pre-determined?)
  // 2. Change of these weights returns a value that changes the score + way 
  // the graph is being shaded
  // 3. These weights should be dypamic
  var sliderID = 'categorySlider'+s.sliderName
  $(`<div class= 'silder'><p><b class="wisconsin">${s.title}</b></p><div id=${sliderID} class ='ui range' ></div></div>`).appendTo('.widget-content');
  

  // $('<div/>', {
  //   id: 'categorySlider'+s.sliderName,
  //   class:'ui range slider'

  //   }).appendTo('.widget-content');
  // $(".widget-content").append(<div>hello</div>);

  $('#categorySlider'+s.sliderName).range({
      min: 0,
      max: 10,
      start: 5
    });

  // Returns the current slider value 
  return parseInt($('#categorySlidertest1'++s.sliderName+' >.inner >.track-fill').css('width').replace('px',''))
}


//RANG INPUT



function rangeInput(s) {

	var query = s.query._query
	var col = s.column
	var name = s.name
	var title = s.title
	var range = ""

$.getJSON(`${s.credentials.sqlURL}WITH a as (${query}) SELECT max(${col}) as max, min(${col}) as min from a${s.credentials.sqlEnd}`, function( data ) {

	var min = data.rows[0].min
	var max = data.rows[0].max
	console.log(min)
	console.log(max)

$("<div></div>").html(`
	<div class="ui labeled input min" id="${name}-input-min">
  <div class="ui label">
    MIN
  </div>
  <input class="${name}-input-min" type="text" id="${name}-input-min-input" placeholder="${min}" value="${min}">
	</div>

  <div class="smallspace"></div>

	<div class="ui labeled input max" id="${name}-input-max">
  <div class="ui label">
    MAX
  </div>
	<input class="${name}-input-max" type="text" id="${name}-input-max-input" placeholder="${max}" value="${max}">
	</div>
`).addClass("range").appendTo( ".widget-content" )
.attr("id", ""+name+"");

$("#"+name+"").before(`
	<br></br>
	<p><b class="wisconsin">${title}</b></p>
`)

// $('#'+name+'-input-min').keyup(function () {
//  value = $('#'+name+'-input-min').val()
//  if (value < min || value > max) {
// 	 $('#'+name+'-input-min').addClass('error');
//  } else {
// 	 $('#'+name+'-input-min').removeClass('error');
//  }
// });
//
// $('#'+name+'-input-max').keyup(function () {
//  value = $('#'+name+'-input-max').val()
//  if (value < min || value > max) {
// 	 $('#'+name+'-input-max').addClass('error');
//  } else {
// 	 $('#'+name+'-input-max').removeClass('error');
//  }
// });

});

}
function rangeQuery(s) {
	var name = s.name
	var col = s.column

	var inMin = $('#'+name+'-input-min-input').val()
	var inMax = $('#'+name+'-input-max-input').val()

	var range = ""+col+" BETWEEN "+inMin+" AND "+inMax+""
	return range

}

//INPUT

function newInput(settings) {
  $("<div></div>").html(`
    <input type="text" id="${settings.name}-input" placeholder="${settings.placeholder}" value="${settings.start}">
    `).addClass("ui input").appendTo( ".widget-content" )
    .attr("id", ""+settings.name+"");

  $("#"+settings.name+"").before(`
    <br></br>
    <p><b class="wisconsin">${settings.title}</b></p>
    `)

var min = settings.min
var max = settings.max
var name = settings.name

 $('#'+name+'').keyup(function () {
  value = $('#'+name+'-input').val()
  if (value < min || value > max) {
    $('#'+name+'').addClass('error');
  } else {
    $('#'+name+'').removeClass('error');
  }
});
};

//AUTO STYLE


function autoStyle(settings) {

    var a = settings.layer
    var b = settings.cartocss
    var c = settings.defaultCartocss


$("<div></div>").html(`
  <p class="autostyle"><i class="marker icon"></i>   APPLY STYLE TO MAP</p>
  `).appendTo( ".widget-content" )
  .attr("id", ""+settings.name+"");

$("#"+settings.name+"").before(`
  <br></br>
  <p><b class="wisconsin">${settings.title}</b></p>
  `)

$("p.autostyle").click( function() {
  //$( this ).not().attr('class', 'autostyle');
  $( this ).toggleClass( "active" )
  $( "p.autostyle.active" ).not(this).attr('class', "autostyle")
});


var css = new carto.style.CartoCSS(`${settings.cartocss}`);

$("p.autostyle").click( function() {

  if ( this.className === "autostyle active" ) {

    a.setStyle(css);
  }
  else if ( this.className === "autostyle" ) {
    a.setStyle(c)
  }
});

}


//SOME FUNCTION TO HANDLE THE ASSEMBLY OF QUERY VARS - inputs can take the values you want to grab and assemble them if text or numeric and if null s
//NEED A FUNCTION TO GET THE VALUES OF EACH VARIABLE


function queryFactory(settings) {
  var a = settings.items;
  var join = $.grep(a, Boolean).join(" AND ")
  var query = "SELECT * FROM "+settings.table+" WHERE "+join+""
  return query
}


//TIME SLIDER

//PIE CHART

//POP-UPS

//SLIDEOUT


function sidebarInfo(settings) {

$('.ui.left.sidebar.popout').html(`

<i class="inverted remove icon" style="right: 10px; top: 10px; position: absolute; padding: 3px;"></i>

${settings.content}

`);

$('.ui.left.sidebar.popout').sidebar('show');

$('.inverted.remove.icon').click(function() {
  $('.ui.left.sidebar.popout').sidebar('hide');
});


}

//HOVERS

//EXPORT

function fileExport(s) {

  $("<div></div>").html(`
  <p id="button-download" class="button button--blue">
  <button  class="ui primary button">
  <a style="color:white;" href="#">EXPORT</a>
  </button>
  `).appendTo( ".ui.sidebar.menu" );

  $("#button-download").click( function (){
  window.location=""+s.credentials.exportURL+"filename="+s.filename+"&format="+s.format+"&q="+s.query._query+""+s.credentials.sqlEnd+""
  $(this).target = "_blank";
  })

  console.log(s.query)
}

//BATCH EXPORT

function batchExport(s) {

$("<div></div>").html(`
	<div class=\"smallspace\"></div>
	<h1>${s.name}</h1>
	<p>${s.description}</p>
	<p>Enter a name for your new dataset below:</p>
	<p><i>Name must be one word with no spaces</i></p>
	<div class="ui input" >
	  <input type="text" placeholder="Dataset Name" id="datasetname">
	</div>
	<br><br />
	<p><i>Check the box below and enter an amount to return a limited dataset of .</i></p>
	<div class="ui checkbox limit">
	  <input type="checkbox" name="limit">
	  <label>Return Limited Dataset</label>
	</div>
	<br><br />
	<p>Number of records to return (Max 10,000)</p>
	<div class="ui input" id="limit-input">
	  <input type="text" placeholder="Limit" value="100" id="limit" min="0" max="10000">
	</div>
	<br><br />
	<p id="button-download" class="button button--orange">
	<button class="ui blue button batch">
	EXPORT
	</button>

	</p>
	<div id="jobs">
	</div>
`).appendTo( ".ui.sidebar.menu" );

var timers = {};

function check(job_id, $el) {

  $.ajax({
    url: ""+s.credentials.jobURL+""+ job_id +""+s.credentials.batchEnd+"",
  }).done(function (resp) {

    $el.text(JSON.stringify(resp, undefined, 2));
    $el.parent().addClass(resp.status);
    var job = resp.job_id
    if (resp.status === 'pending' || resp.status === 'running') {
      $('.ui.blue.button.batch').addClass('loading');
      $( "#jobs" )
      .html(`<div class="ui message"> <p>The data export is running. The status will update once the export is complete but do not close or refresh the page.</p><p>Job ID: ${job}</p> </div>`)
      //headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
      // $('.ui.button.cancel').click(function() {
      //   $.ajax({
      //     method: 'DELETE',
      //     url: "https://mforrest.carto.com/api/v2/sql/job/"+job+"?api_key=665b6d21a3b9c20906057414b7da378b519df141"
      //   })
      // });
     }
	    else if (resp.status === 'done') {
	      clearInterval(timers[job_id]);
	      var tablename = $('#datasetname').val();
	      var tableURL = "https://team.carto.com/u/"+s.credentials.accountName+"/dataset/"+tablename+""
	      var exportURL = ""+s.credentials.exportURL+"filename="+s.filename+"&format="+s.format+"&q="+s.query._query+""+s.credentials.sqlEnd+""
	      $('.ui.blue.button.batch').removeClass('loading');
	      $( "#jobs" ).html(`<div class="ui green message"> <p>The data export is complete. You can see your dataset <a href=${tableURL} target="_blank">here</a> or download your data <a href=${exportURL} target="_blank">here</a></p> </div>`)
	    }
	    else {
	      var job = resp.job_id
	      var errorURL = ""+s.credentials.jobURL+""+job+"?"+s.credentials.batchEnd+""
	      $( "#jobs" ).html(`<div class="ui red message"> <p>The data export failed! Please try again. If this error is persisting click <a href=${errorURL} target="_blank">this link</a> to see the error.</p><p>Job ID: ${job}</p> </div>`);
	      clearInterval(timers[job_id]);
	      $('.ui.blue.button.batch').removeClass('loading');
	    }
	  }).fail(function (err) {
	    $('.ui.blue.button.batch').removeClass('loading');
	    clearInterval(timers[job_id]);
	  });
	}
	$('.ui.blue.button.batch').click(function (evt) {
	  var tablename = $('#datasetname').val();
	  evt.preventDefault();
	  var exportSQL = s.query._query
		console.log("create table "+tablename+" as "+exportSQL+"", "select cdb_cartodbfytable('mforrest', '"+tablename+"')")
		console.log(exportSQL)
	  $.ajax({
	    method: 'POST',
	    url: "https://"+s.credentials.accountName+".carto.com/api/v2/sql/job?api_key="+s.credentials.apiKey+"" ,
	    //contentType: 'json',
	    data: {
	      query: ["create table "+tablename+" as "+exportSQL+"", "select cdb_cartodbfytable('mforrest', '"+tablename+"')"]
	    }
	  }).done(function (resp) {
	    var $result = $('<pre class="result">');
	    $('#jobs').prepend($('<div />')
	        .data('job_id', resp.job_id)
	        //.text(resp.job_id)
	        //.addClass('job')
	        .append($result)); //.on('click', check));
	    timers[resp.job_id] = setInterval(function () {
	      check(resp.job_id, $result);
	    }, 1000);
	  }).fail(function (err) {
	    // $('#error').text(err);
	  });
	  return false;
	});

}

//IMPORTS
