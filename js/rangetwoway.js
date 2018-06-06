/*!
 * # Range slider for Semantic UI.
 * 
 */
 
;(function ( $, window, document, undefined ) {

"use strict";

$.fn.rangetwoway = function(parameters) {

	var
		$allModules    = $(this),
		
		offset         = 10,
		
		query          = arguments[0],
    methodInvoked  = (typeof query == 'string'),
    queryArguments = [].slice.call(arguments, 1)
	;
	
  $allModules
    .each(function() {
			
			var
				settings          = ( $.isPlainObject(parameters) )
					? $.extend(true, {}, $.fn.rangetwoway.settings, parameters)
					: $.extend({}, $.fn.rangetwoway.settings),

				namespace       = settings.namespace,
				min             = settings.min,
				max             = settings.max,
				step            = settings.step,
				start1          = settings.start1,
				start2          = settings.start2,
				input           = settings.input,

				eventNamespace  = '.' + namespace,
				moduleNamespace = 'module-' + namespace,

				$module         = $(this),

				element         = this,
				instance        = $module.data(moduleNamespace),
				
				inner,
				thumb1,
				thumb2,
				trackLeft,
				precision,
				
				module
			;
			
			module = {
				
				initialize: function() {
					module.instantiate();
					module.sanitize();
				},
				
				instantiate: function() {
					instance = module;
					$module
						.data(moduleNamespace, module)
					;
					$(element).html("<div class='inner'><div class='track'></div><div class='track-fill'></div><div class='thumb1'></div><div class='thumb2'></div></div>");
					inner = $(element).children('.inner')[0];
					thumb1 = $(element).find('.thumb1')[0];
					thumb2 = $(element).find('.thumb2')[0];
					trackLeft = $(element).find('.track-fill')[0];
					// find precision of step, used in calculating the value
					module.determinePrecision();
					// set start location
					module.setValuePosition(settings.start1,settings.start2);
					
					// event listeners
					$(element).find('.track, .thumb1, .inner').on('mousedown', function(event) {
						event.stopImmediatePropagation();
						event.preventDefault();
						$(this).closest(".range").trigger('mousedown', event);
					});
					$(element).find('.track, .thumb1, .inner').on('touchstart', function(event) {
						event.stopImmediatePropagation();
						event.preventDefault();
						$(this).closest(".range").trigger('touchstart', event);
					});
					$(element).find('.track, .thumb2, .inner').on('mousedown', function(event) {
						event.stopImmediatePropagation();
						event.preventDefault();
						$(this).closest(".range").trigger('mousedown', event);
					});
					$(element).find('.track, .thumb2, .inner').on('touchstart', function(event) {
						event.stopImmediatePropagation();
						event.preventDefault();
						$(this).closest(".range").trigger('touchstart', event);
					});


					$(element).on('mousedown', function(event, originalEvent) {
						module.rangeMousedown(event, false, originalEvent);
					});
					$(element).on('touchstart', function(event, originalEvent) {
						module.rangeMousedown(event, true, originalEvent);
					});
				},

				sanitize: function() {
					if (typeof settings.min != 'number') {
						settings.min = parseInt(settings.min) || 0;
					}
					if (typeof settings.max != 'number') {
						settings.max = parseInt(settings.max) || false;
					}
					if (typeof settings.start != 'number') {
						settings.start = parseInt(settings.start) || 0;
					}
				},

				determinePrecision: function() {
					var split = String(settings.step).split('.');
					var decimalPlaces;
					if(split.length == 2) {
						decimalPlaces = split[1].length;
					} else {
						decimalPlaces = 0;
					}
					precision = Math.pow(10, decimalPlaces);
				},
				
				determineValue: function(startPos, endPos, currentPos) {
					var ratio = (currentPos - startPos) / (endPos - startPos);
					var range = settings.max - settings.min;
					var difference = Math.round(ratio * range / step) * step;
					// Use precision to avoid ugly Javascript floating point rounding issues
					// (like 35 * .01 = 0.35000000000000003)
					difference = Math.round(difference * precision) / precision;
					return difference + settings.min;
				},

				determinePosition: function(value1,value2) {
					var ratio1 = (value1 - settings.min) / (settings.max - settings.min);
					var ratio2 = (value2 - settings.min) / (settings.max - settings.min);

					return [Math.round(ratio1 * $(inner).width()) + $(trackLeft).position().left - offset,
							Math.round(ratio2 * $(inner).width()) + $(trackLeft).position().left - offset,];
				},

				setValue: function(newValue1,newValue2, triggeredByUser) {
					if(typeof triggeredByUser === 'undefined') {
						triggeredByUser = true;
					}
					if(settings.input) {
						$(settings.input).val(newValue1,newValue2);
					}
					if(settings.onChange) {
						settings.onChange(newValue1,newValue2, {triggeredByUser: triggeredByUser});
					}
				},

				setPosition: function(value1,value2) {

					$(thumb1).css({left: String(value1) + 'px'});
					// $(trackLeft).css({width: String(value1 + offset) + 'px'});
					$(thumb2).css({left: String(value2) + 'px'});
					$(trackLeft).css({width: String(value2 - value1 + offset) + 'px',left: String(value1) + 'px'});
				},

				rangeMousedown: function(mdEvent, isTouch, originalEvent) {
					if( !$(element).hasClass('disabled') ) {
						/// Clicking somewhere along the bar
						mdEvent.preventDefault();
						var left = $(inner).offset().left;
						var right = left + $(inner).width();
						var thumb1X = $(thumb1).offset().left;
						var thumb2X = $(thumb2).offset().left;
						var pageX;
						var pageXOther;

						if(isTouch) {
							pageX = originalEvent.originalEvent.touches[0].pageX;
							if (originalEvent.originalEvent.touches[1].pageX=='thumb1'){
									pageXOther = thumb2X;
									console.log("other is 2");
								}
								else if(originalEvent.originalEvent.touches[1].pageX=='thumb2') {
									pageXOther = thumb1X;
									console.log("other is 1");
								}
								else if(pageX < thumb1X && pageX <= thumb2X){
									pageXOther = thumb2X
									console.log("other is 2");
								}
								else if(pageX < thumb2X && pageX > thumb1X){
									pageXOther = thumb2X
									console.log("other is 2");
								}
								else {
									pageXOther = thumb1X
									console.log("other is 1");
								}
							console.log("other position is "+pageXOther);
						} else {
							pageX = (typeof mdEvent.pageX != 'undefined') ? mdEvent.pageX : originalEvent.pageX;
							if($(originalEvent.target).hasClass('thumb1')){
								pageXOther = thumb2X;
								console.log("other is 2");
								}
								else if($(originalEvent.target).hasClass('thumb2')) {
									pageXOther = thumb1X;
									console.log("other is 1");
								}
								else if(pageX < thumb1X && pageX <= thumb2X){
									pageXOther = thumb2X;
									console.log("other is 2");
								}
								else if(pageX < thumb2X && pageX > thumb1X){
									pageXOther = thumb2X;
									console.log("other is 2");
								}
								else {
									pageXOther = thumb1X;
									console.log("other is 1");
								}
							console.log("other position is "+pageXOther);
						}
						
						var value1 = module.determineValue(left, right, pageX);
						var value2 = module.determineValue(left, right, pageX);
						if(pageX >= left && pageX <= right) {
							module.setPosition(pageX - left - offset,pageXOther - left - offset);
							module.setValue(value1,value2);
						}

						/// Dragging the button
						var rangeMousemove = function(mmEvent) {
							mmEvent.preventDefault();
							if(isTouch) {
								if (originalEvent.originalEvent.touches[1].pageX=='thumb1'){
									pageXOther = thumb2X;
								}
								else if(originalEvent.originalEvent.touches[1].pageX=='thumb2') {
									pageXOther = thumb1X;
								}
								else if(pageX < thumb1X && pageX <= thumb2X){
									pageXOther = thumb2X
								}
								else if(pageX < thumb2X && pageX > thumb1X){
									pageXOther = thumb2X
								}
								else {
									pageXOther = thumb1X
								}
								pageX = mmEvent.originalEvent.touches[0].pageX;
								console.log("other position is "+pageXOther);
							} else {
								pageX = mmEvent.pageX;
								/// Want to get the name of the thumb touched so that we can get teh X value for the other one
								if($(originalEvent.target).hasClass('thumb1')){
								pageXOther = thumb2X;
								}
								else if($(originalEvent.target).hasClass('thumb2')) {
									pageXOther = thumb1X;
								}
								else if(pageX < thumb1X && pageX <= thumb2X){
									pageXOther = thumb2X
								}
								else if(pageX < thumb2X && pageX > thumb1X){
									pageXOther = thumb2X
								}
								else {
									pageXOther = thumb1X
								}
								console.log("other position is "+pageXOther);
								// console.log("original event target is "+originalEvent.originalEvent.touches[1].length);
							}
							value1 = module.determineValue(left, right, pageX);
							value2 = module.determineValue(left, right, pageXOther);
							if(pageX >= left && pageX <= right) {
								console.log('this is true!');
								if(value1 >= settings.min && value1 <= settings.max) {
									module.setPosition(pageX - left - offset,pageXOther - left - offset);
									module.setValue(value1,value2);
								}
							}
						}
						var rangeMouseup = function(muEvent) {
							if(isTouch) {
								$(document).off('touchmove', rangeMousemove);
								$(document).off('touchend', rangeMouseup);
							} else {
								$(document).off('mousemove', rangeMousemove);
								$(document).off('mouseup', rangeMouseup);
							}
						}
						if(isTouch) {
							$(document).on('touchmove', rangeMousemove);
							$(document).on('touchend', rangeMouseup);
						}
						else {
							$(document).on('mousemove', rangeMousemove);
							$(document).on('mouseup', rangeMouseup);
						}
					}
				},
				
				setValuePosition: function(val1,val2, triggeredByUser) {
					if(typeof triggeredByUser === 'undefined') {
						triggeredByUser = true;
					}
					var position = module.determinePosition(val1,val2);
					console.log(position);
					module.setPosition(position[0],position[1]);
					module.setValue(val1,val2, triggeredByUser);
				},
				
				invoke: function(query) {
					switch(query) {
						case 'set value':
							if(queryArguments.length > 0) {
								instance.setValuePosition(queryArguments[0], false);
							}
							break;
					}
				},
			
			};
			
      if(methodInvoked) {
        if(instance === undefined) {
          module.initialize();
        }
        module.invoke(query);
      }
      else {
        module.initialize();
      }
			
    })
  ;
  
  return this;

};

$.fn.rangetwoway.settings = {

  name         : 'Range',
  namespace    : 'rangetwoway',

	min          : 0,
	max          : false,
	step         : 1,
	start1       : 0.1,
	start2 		 : 0.5,	
	input        : false,
	
	onChange     : function(value){},

};


})( jQuery, window, document );
