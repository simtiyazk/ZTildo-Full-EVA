/* ===========================================================================================
// qSequencer - jQuery Plugin
// (c) GSW 2015 ... by: Brian Ayers
// -------------------------------------------------------------------------------------------
// Image Sequencer Plugin
// -- best for use with large images
// -- uses canvas for hardware acceleration
// -- more efficient and better performance than most other CSS/JS options
// -- images are fully loaded during initialization
// ---- images are loaded as objects and placed in an array for faster access during animation
// -- includes polyfill for request/cancel animation frame (credit: Paul Irish)
// ===========================================================================================
// Required Properties
// -------------------------------------------------------------------------------------------
// -- container (string: DOM element for canvas - with or without hash tag)
// -- first (string: filename of first image in sequence - with file extension)
// -- last (string: filename of last image in sequence - with file extension)
// -- folder (string: path to images folder - relative to HTML)
// -- width (INT: pixel width of images)
// -- height (INT: pixel height of images)
// ===========================================================================================
// Optional Properties
// -------------------------------------------------------------------------------------------
// -- framerate (INT: desired framerate ... defaults to 30)
// -- debug (boolean: turn on console debugging messages ... defaults to false)
// ===========================================================================================
// Hidden Properties (defined at initialization)
// -------------------------------------------------------------------------------------------
// -- settings.start (first image number without padding)
// -- settings.end (last image number without padding)
// -- settings.length (total numerical string length - with padding included ... zero if no padding)
// -- settings.filename (full file name without numeric string)
// -- settings.extension (file extension without dot)
// -- error (error message given for fatal errors)
// ===========================================================================================
// Methods / Functions
// -------------------------------------------------------------------------------------------
// -- play (first, last)
// ---- if first and last are omitted, sequence will play from default start to default end
// ---- if last is omitted, sequence will play from first to default end
// ---- if first > last, sequence will play in reverse from first to last
// -- pause
// ===========================================================================================
// Events / Callbacks
// -------------------------------------------------------------------------------------------
// -- init (initializing, can access properties/methods, but shouldn't until it's ready, so nevermind!)
// -- fail (fatal error)
// -- loaded (returns: current loaded image number without padding, current loaded image file path)
// -- ready (image sequence is fully loaded and ready to manipulate)
// -- playing (returns: current image number without padding, current image file path);
// -- paused (playing has stopped, params: current image number it stopped on)
// -- completed (animation has finished)
// ------------------------------------------------------------------------------------------- */

(function($) {
	$.qSequence = function(options) {
		// Plugin root
		var root = this;
		root.images = [];

		// Define Canvas Elements
		var container, canvasEl, canvas, context;

		// Plugin Default Settings
		var defaults = {
			container: undefined,
			first: undefined,
			last: undefined,
			folder: undefined,
			width: 1,
			height: 1,
			framerate: 30,
			useRetina: false,
			debug: false
		};

		var animationINT = undefined;
		var fps, startTime, curTime;
		var reverse = false;

		// Container object for all settings
		root.settings = {};

		// Failure
		root.error = undefined;

		root.currentImage = 0;

		var triggerEvent = function(event, params) {
			if (root.settings.debug == true) {
				console.log('Triggering Event: ' + event);
			}
			if (params != undefined) {
				container.trigger(event, params);
			} else {
				container.trigger(event);
			}
		};

		var recordError = function(err) {
			if (root.settings.debug == true) {
				console.error(err);
			}
			root.error = err;
			triggerEvent('fail');
		};

		var debug = function(str) {
			if (root.settings.debug == true) {
				console.log(str);
			}
		};

		var init = function() {
			root.settings = $.extend({}, defaults, options);
			if (
				root.settings.container != undefined &&
				root.settings.first != undefined &&
				root.settings.last != undefined
			) {
				// set canvas elements
				canvasEl = root.settings.container;
				canvasEl = canvasEl.indexOf('#') == 0 ? canvasEl.substring(1) : canvasEl; // Allow '#' at the start ... or not, will work either way
				container = $('#' + canvasEl); // jQuery object reference
				canvas = document.getElementById(canvasEl); // canvas
				context = canvas.getContext('2d'); // canvas' context
				canvas.width = root.settings.width * 2;
				canvas.height = root.settings.height * 2;
				canvas.style.width = root.settings.width + "px";
				canvas.style.height = root.settings.height + "px";
				
				if (root.settings.useRetina === true) {
					context.scale(2,2);

				}

				// request/cancel animation frame polyfill (Paul Irish: https://gist.github.com/paulirish/1579671)
				window.cancelAnimationSequence = (function() {
					return (
						window.cancelAnimationFrame ||
						window.webkitCancelRequestAnimationFrame ||
						window.mozCancelRequestAnimationFrame ||
						window.oCancelRequestAnimationFrame ||
						window.msCancelRequestAnimationFrame ||
						clearTimeout
					);
				})();

				window.requestAnimationSequence = (function() {
					return (
						window.requestAnimationFrame ||
						window.webkitRequestAnimationFrame ||
						window.mozRequestAnimationFrame ||
						window.oRequestAnimationFrame ||
						window.msRequestAnimationFrame ||
						function(callback, element) {
							return window.setTimeout(callback, 1000 / root.settings.framerate);
						}
					);
				})();
				// add forward slash at end of folder if it doesn't exist
				var folder = root.settings.folder;
				root.settings.folder = folder.charAt(folder.length - 1) == '/' ? folder : folder + '/';
				// debugging
				// debug("Canvas ID: " + container.attr('id'));
				// debug("First Image: " + root.settings.first);
				// debug("Last Image: " + root.settings.last);
				triggerEvent('init');
				getImageType(root.settings.first, root.settings.last);
			} else {
				recordError('Error: Missing Container Element');
			}
		};

		var getImageType = function(first, last) {
			var ext_first = first.substr(first.lastIndexOf('.') + 1);
			var ext_last = last.substr(last.lastIndexOf('.') + 1);
			if (ext_first === ext_last) {
				root.settings.extension = ext_first;
				debug('Image File Type: ' + root.settings.extension);
				getNumericLength(first, last);
			} else {
				recordError('Error: Image file extensions do not match!');
			}
		};

		var getNumericLength = function(first, last) {
			var first_num, last_num, first_pad, last_pad;
			var first_file = first.split('.' + root.settings.extension)[0];
			var last_file = last.split('.' + root.settings.extension)[0];
			// get full numeric string at the end of the file name (before the extension)
			var num_regex = /[0-9]+$/;
			first_num = first_file.match(num_regex);
			last_num = last_file.match(num_regex);
			if (first_num != null && last_num != null) {
				first_num = first_num[0];
				last_num = last_num[0];
				root.settings.filename = first_file.split(first_num)[0];
				debug('Base Image File Name: ' + root.settings.filename);
				debug('First Number String: ' + first_num + '(' + first_num.length + ')');
				debug('Last Number String: ' + last_num + '(' + last_num.length + ')');
				// if same length (except for single digit), check for zero padding
				if (first_num.length == last_num.length && last_num.length > 1) {
					root.settings.length = first_num.length;
					var pad_regex = /[0]+/;
					first_pad = pad_regex.exec(first_num);
					last_pad = pad_regex.exec(last_num);
					if (first_pad != null) {
						first_pad = first_pad[0];
						if (first_pad.length == first_num.length) {
							root.settings.start = 0;
						} else {
							root.settings.start = first_num.slice(first_pad.length);
						}
					}
					if (last_pad != null) {
						last_pad = last_pad[0];
						root.settings.end = last_num.slice(last_pad.length);
					}
					if (parseFloat(root.settings.start) >= parseFloat(root.settings.end)) {
						recordError('Error: Last image number is not greater than the first');
						triggerEvent('fail');
						return false;
					} else {
						debug('Start At: ' + root.settings.start);
						debug('End At: ' + root.settings.end);
					}
				} else {
					// no zero-padding, set start/end
					root.settings.start = first_num;
					root.settings.end = last_num;
					root.settings.length = 0;
				}
				debug('Number Length: ' + root.settings.length);
			} else {
				recordError('Error: Image filename missing numeric sequence');
				triggerEvent('fail');
				return false;
			}
			loadImages();
		};

		var loadImages = function(n) {
			var img = new Image();
			n = n != undefined ? n : root.settings.start;
			var path =
				root.settings.folder + root.settings.filename + formatNumericString(n) + '.' + root.settings.extension;
			debug('Adding Image: ' + path);
			img.onerror = function() {
				recordError('Error: Image load failed');
				triggerEvent('fail');
			};
			img.onload = function() {
				root.images[n] = img;
				triggerEvent('loaded', [n, img.src]);
				if (n < root.settings.end) {
					loadImages(++n);
				} else {
					triggerEvent('ready'); //
				}
			};
			img.src = path;
		};

		var formatNumericString = function(n) {
			var len = root.settings.length;
			if (len > 0) {
				n = n.toString();
				return n.length < len ? formatNumericString('0' + n) : n;
			} else {
				return n;
			}
		};

		root.play = function(first, last, framerate) {
			cancelAnimationSequence(animationINT);
			first = first != undefined ? first : root.settings.start;
			last = last != undefined ? last : root.settings.end;
			// set global vars
			fps = 1000 / root.settings.framerate;
			startTime = Date.now();
			debug('Animating Image Sequence: ' + first + ' to ' + last);
			if (first <= last) {
				reverse = false;
				animate(first, last, framerate);
			} else {
				reverse = true;
				reverseAnimate(first, last, framerate);
			}
		};

		root.playFrame = function(n) {
			cancelAnimationSequence(animationINT);
			// set global vars
			n = n > root.settings.end ? root.settings.end : n;
			fps = 1000 / root.settings.framerate;
			startTime = Date.now();
			//console.log("Animating Image Frame: " + n);
			var img = root.images[n];
			context.clearRect(0, 0, root.settings.width, root.settings.height);
			context.drawImage(img, 0, 0, root.settings.width, root.settings.height);
		};

		root.pause = function() {
			cancelAnimationSequence(animationINT);
		};

		var animate = function(first, last, framerate) {
			var start = first;
			var end = last;
			if (framerate != undefined) {
				fps = 1000 / framerate;
			}
			debug('Animating ... ' + first + ' to ' + last);
			animationINT = requestAnimationSequence(function() {
				animate(start, end);
			});
			if (start <= end) {
				var now = Date.now();
				var elapsed = now - startTime;

				if (elapsed >= fps) {
					startTime = now - (elapsed % fps);
					var img = root.images[start];
					var perc = Math.ceil((start / end) * 100);
					root.currentImage = start;
					triggerEvent('playing', [start, perc, img.src]);
					context.clearRect(0, 0, root.settings.width, root.settings.height);
					context.drawImage(img, 0, 0, root.settings.width, root.settings.height);
					start = start + 1;
				}
			} else {
				cancelAnimationSequence(animationINT);
				triggerEvent('completed');
			}
		};

		var reverseAnimate = function(first, last, framerate) {
			var start = first;
			var end = last;
			if (framerate != undefined) {
				fps = 1000 / framerate;
			}
			debug('Reverse Animating ... ' + first + ' to ' + last);
			animationINT = requestAnimationSequence(function() {
				reverseAnimate(start, end);
			});
			if (start >= end) {
				var now = Date.now();
				var elapsed = now - startTime;

				if (elapsed >= fps) {
					startTime = now - (elapsed % fps);
					var img = root.images[start];
					root.currentImage = start;
					triggerEvent('playing', [start, img.src]);
					context.clearRect(0, 0, root.settings.width, root.settings.height);
					context.drawImage(img, 0, 0, root.settings.width, root.settings.height);
					start = start - 1;
				}
			} else {
				cancelAnimationSequence(animationINT);
				triggerEvent('completed');
			}
		};

		root.getCurrent = function() {
			return root.currentImage;
		};

		init();
	};
})(jQuery);
