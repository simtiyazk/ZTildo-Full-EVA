/* ==========================================================================
// Global Variables
// -------------------------------------------------------------------------- */

// Events to use for jquery.bind instead of 'click', 'mousedown', 'touchstart', etc.
var eventDown, eventUp, eventMove, eventClick;

var hasTouch = 'ontouchstart' in window;
var IsRetina = window.devicePixelRatio > 1 ? true : false;
var isIOS = (/iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) && !window.MSStream;
var isWin = (navigator.platform.indexOf('Win') > -1);
var isSafari = (navigator.userAgent.indexOf("Safari") > -1);

// iOS Version Detection

function iOSversion() {
	if (/iP(hone|od|ad)/.test(navigator.platform)) {
		// supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
		var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
		return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
	}
}

var iOS_Version = iOSversion();

/* From Modernizr */
function whichTransitionEvent() {
	var t;
	var el = document.createElement('fakeelement');
	var transitions = {
		'transition': 'transitionend',
		'OTransition': 'oTransitionEnd',
		'MozTransition': 'transitionend',
		'WebkitTransition': 'webkitTransitionEnd'
	};

	for (t in transitions) {
		if (el.style[t] !== undefined) {
			return transitions[t];
		}
	}
}

/* Listen for a transition! */
var transitionEvent = whichTransitionEvent();

/* ==========================================================================
// Local Storage
// -------------------------------------------------------------------------- */
// Detect and define local storage capabilities
var storage, bfail, uid;
try {
	uid = new Date();
	(storage = window.localStorage).setItem(uid, uid);
	bfail = storage.getItem(uid) != uid;
	storage.removeItem(uid);
	bfail && (storage = false);
} catch (e) {
	console.log("Local Storage Error: " + e);
}

function setStorage(key, val) {
	if (val == null || val == "") {
		storage.removeItem(key);
	} else if (val != undefined) {
		storage.setItem(key, val);
	}
}

function getLocalStorage() {
	//setTempStorage();
	//console.groupCollapsed("Local Storage ...");
	for (var obj in storage) {
		//console.log(obj + ": " + storage[obj]);
		if (obj.indexOf(ParentSlideKey) == 0) {
			ParentSlide = storage[obj];
		}
	}
	//console.groupEnd();
}

function getStorage(key) {
	//
	return storage.getItem(key);
}

function clearStorage(key) {
	//console.log("Clearing Local Storage: " + key);
	storage.removeItem(key);
}

/* ==========================================================================
// Touch Event Handlers
// -- normalize touch events for mobile or mouse
// -- allows for variations by iOS version numbers
// -------------------------------------------------------------------------- */
function setTouchEvents() {
	if (isIOS) {
		eventDown = 'touchstart';
		eventUp = 'touchend';
		eventMove = 'touchmove';
		eventClick = 'touchstart';
	} else {
		eventDown = 'mousedown';
		eventUp = 'mouseup';
		eventMove = 'mousemove';
		eventClick = 'click';
	}
}

// initialize
setTouchEvents();

// return a normalized touch event
function getTouchEvent(e) {
	var touch = (hasTouch) ? (e.originalEvent.touches[0] || e.originalEvent.changedTouches[0]) : e;
	return touch;
}


/* ==========================================================================
// Touch Position Handlers
// -- coordinate tracking and comparison
// -------------------------------------------------------------------------- */
var TouchStartX, TouchStartY, TouchEndX, TouchEndY, TouchDiffX, TouchDiffY;

function setTouchStart(e) {
	var touch = getTouchEvent(e);
	TouchStartX = touch.pageX;
	TouchStartY = touch.pageY;
	//console.log("Event StartX: " + TouchStartX + " || Event StartY: " + TouchStartY);
}

function setTouchEnd(e) {
	var touch = getTouchEvent(e);
	TouchEndX = touch.pageX;
	TouchEndY = touch.pageY;
	//console.log("Event EndX: " + TouchEndX + " || Event EndY: " + TouchEndY);
}

function getTouchPos(e) {
	var pos = {};
	var touch = getTouchEvent(e);
	TouchEndX = touch.pageX;
	TouchEndY = touch.pageY;
	return {
		x: touch.pageX,
		y: touch.pageY
	};
}

function getTouchPosDiff() {
	var diffX = Math.abs(TouchEndX - TouchStartX);
	var diffY = Math.abs(TouchEndY - TouchStartY);
	//console.log("Event Diff X: " + diffX + " || Event Diff Y: " + diffY);
	return {
		x: diffX,
		y: diffY
	};
}