//Bryan main issues are:
//1 = when going from dot2 back to dot1 (using top left and right arrows) the initial animation of the patches does not play again, (also the dragger does not reset back to 0) I tried to do in line 41 and line 24 of this file (these 2 lines is where code to reset the patch animation would happen) but it did not work.
//2 = initial load seems long, guessing there is more that can be taken out (there is a settimeout of 600 that would be nice to get rid of but it seems like currently it is needed in order to load)



/* ==========================================================================
// Variables
// -------------------------------------------------------------------------- */
var slideHasAnimation = 'true';

var eventUp = undefined;
    var eventDown = undefined;
    var eventMove = undefined;

    
        eventDown = 'touchstart';
        eventUp = 'touchend';
        eventMove = 'touchmove';

/* ==========================================================================
// animation function called from framework.js
// -------------------------------------------------------------------------- */
function animateSlide() {
	resetAllAnimation();
	if (!$('.submenu-dot1').hasClass('hide')) {
		setTimeout(function() {

			//Dot 1 animation
			gotoPatchStage(0);

		}, 250);
	} else if (!$('.submenu-dot2').hasClass('hide')) {
		setTimeout(function() {

			//DOT 2 animation
			$('.content-dot2-chart').addClass('animate');

		}, 250);
	}
}

function resetAllAnimation() {

	//dot 1 animation reset
	resetGridPatches();


	//dot 2 animation reset
	$('.content-dot2-chart').removeClass('animate');

}








/* ==========================================================================
// patch animation Config
// -------------------------------------------------------------------------- */

var PatchDefaults = [];

PatchDefaults['peel1'] = {
	"first": "peel_00000.png",
	"last": "peel_00067.png"
}
PatchDefaults['peel1_gray'] = {
	"first": "peel_00000.png",
	"last": "peel_00067.png"
}
PatchDefaults['peel2'] = {
	"first": "peel_00000.png",
	"last": "peel_00134.png"
}
PatchDefaults['peel2_gray'] = {
	"first": "peel_00000.png",
	"last": "peel_00134.png"
}

var fall1 = 67;
var fall2 = 134;

var down1 = 6;
var down2 = 15;
var down3 = 26;

var corner1 = 11;
var corner2 = 23;
var corner3 = 46;
var hanging = 61;


// only needed for any folder OTHER THAN "peel1" (which is the default)
var PatchConfig = [];

// PURPLE
PatchConfig[9] = {
	"folder": "peel2",
	"endpoints": [0, 0, corner1, corner1, corner1],
	"framerates": [30, 30, 30, 30, 30],
	"flipped": true
}
PatchConfig[16] = {
	"folder": "peel2",
	"endpoints": [0, corner1, corner2, corner3, hanging],
	"framerates": [30, 30, 30, 30, 30]
}
PatchConfig[23] = {
	"folder": "peel2",
	"endpoints": [0, 0, corner1, corner2, corner2],
	"framerates": [30, 30, 30, 30, 30]
}
PatchConfig[29] = {
	"folder": "peel2",
	"endpoints": [0, corner1, corner2, corner2, corner2],
	"framerates": [30, 30, 30, 30, 30]
}
PatchConfig[37] = {
	"folder": "peel2",
	"endpoints": [0, corner1, corner1, corner1, corner1],
	"framerates": [30, 30, 30, 30, 30]
}
PatchConfig[38] = {
	"folder": "peel2",
	"endpoints": [0, corner1, corner2, corner2, (corner3 + 5)],
	"framerates": [30, 30, 30, 30, 30],
	"flipped": true
}
PatchConfig[39] = {
	"folder": "peel1",
	"endpoints": [0, down1, down1, down2, down3],
	"framerates": [30, 30, 30, 30, 30]
}
PatchConfig[43] = {
	"folder": "peel2",
	"endpoints": [0, corner1, (corner2 - 4), corner2, (corner3 + 3)],
	"framerates": [30, 30, 30, 30, 30]
}
PatchConfig[44] = {
	"folder": "peel2",
	"endpoints": [0, corner1, corner1, corner1, corner1],
	"framerates": [30, 30, 30, 30, 30]
}
PatchConfig[45] = {
	"folder": "peel2",
	"endpoints": [0, corner1, corner2, corner2, corner3],
	"framerates": [30, 30, 30, 30, 30],
	"flipped": true
}

// GRAY
PatchConfig[50] = {
	"folder": "peel1_gray",
	"endpoints": [0, down2, down2, down2, down2],
	"framerates": [30, 30, 30, 30, 30]
}
PatchConfig[51] = {
	"folder": "peel2_gray",
	"endpoints": [0, corner1, corner1, corner3, hanging],
	"framerates": [30, 30, 30, 30, 30]
}
PatchConfig[52] = {
	"folder": "peel1_gray",
	"endpoints": [0, 0, 0, 0, 0],
	"framerates": [30, 30, 30, 30, 30]
}
PatchConfig[53] = {
	"folder": "peel1_gray",
	"endpoints": [0, down3, down3, fall1, fall1],
	"framerates": [50, 50, 50, 60, 60]
}
PatchConfig[54] = {
	"folder": "peel1_gray",
	"endpoints": [0, down3, fall1, fall1, fall1],
	"framerates": [50, 50, 60, 60, 60]
}
PatchConfig[55] = {
	"folder": "peel1_gray",
	"endpoints": [0, down3, fall1, fall1, fall1],
	"framerates": [50, 50, 60, 60, 60]
}
PatchConfig[56] = {
	"folder": "peel2_gray",
	"endpoints": [0, corner1, corner2, corner2, corner2],
	"framerates": [30, 30, 30, 30, 30]
}
PatchConfig[57] = {
	"folder": "peel2_gray",
	"endpoints": [0, corner1, corner1, corner1, corner1],
	"framerates": [30, 30, 30, 30, 30]
}
PatchConfig[58] = {
	"folder": "peel1_gray",
	"endpoints": [0, down2, down3, down3, down3],
	"framerates": [40, 40, 50, 50, 50]
}
PatchConfig[59] = {
	"folder": "peel1_gray",
	"endpoints": [0, fall1, fall1, fall1, fall1],
	"framerates": [65, 65, 65, 65, 65]
}
PatchConfig[60] = {
	"folder": "peel1_gray",
	"endpoints": [0, down2, down2, down2, down2],
	"framerates": [50, 50, 50, 50, 50]
}
PatchConfig[61] = {
	"folder": "peel1_gray",
	"endpoints": [down3, down3, fall1, fall1, fall1],
	"framerates": [60, 60, 70, 70, 70],
	"flipped": true
}
PatchConfig[62] = {
	"folder": "peel2_gray",
	"endpoints": [corner2, corner2, corner2, corner2, corner2],
	"framerates": [30, 30, 30, 30, 30]
}
PatchConfig[63] = {
	"folder": "peel1_gray",
	"endpoints": [0, down3, down3, down3, down3],
	"framerates": [50, 50, 50, 50, 50],
	"flipped": true
}
PatchConfig[64] = {
	"folder": "peel1_gray",
	"endpoints": [down3, down3, down3, fall1, fall1],
	"framerates": [55, 55, 55, 65, 65],
	"flipped": true
}
PatchConfig[65] = {
	"folder": "peel1_gray",
	"endpoints": [0, down2, down2, down2, down3],
	"framerates": [50, 50, 50, 50, 30]
}
PatchConfig[66] = {
	"folder": "peel2_gray",
	"endpoints": [0, corner2, corner2, corner2, corner2],
	"framerates": [30, 30, 30, 30, 30]
}
PatchConfig[67] = {
	"folder": "peel1_gray",
	"endpoints": [0, down3, down3, down3, down3],
	"framerates": [45, 45, 45, 45, 45],
	"flipped": true
}
PatchConfig[68] = {
	"folder": "peel1_gray",
	"endpoints": [0, down3, down3, down3, down3],
	"framerates": [55, 55, 55, 55, 55],
	"flipped": true
}
PatchConfig[69] = {
	"folder": "peel1_gray",
	"endpoints": [0, down3, fall1, fall1, fall1],
	"framerates": [50, 50, 65, 65, 65]
}
PatchConfig[70] = {
	"folder": "peel2_gray",
	"endpoints": [corner2, fall2, fall2, fall2, fall2],
	"framerates": [35, 60, 60, 60, 60]
}
PatchConfig[71] = {
	"folder": "peel2_gray",
	"endpoints": [0, corner2, corner2, corner2, hanging],
	"framerates": [40, 40, 40, 40, 40]
}
PatchConfig[72] = {
	"folder": "peel2_gray",
	"endpoints": [0, corner2, corner2, corner2, corner2],
	"framerates": [35, 35, 35, 35, 35]
}
PatchConfig[73] = {
	"folder": "peel1_gray",
	"endpoints": [down1, down1, down2, down2, down2],
	"framerates": [43, 43, 43, 43, 43],
	"flipped": true
}
PatchConfig[74] = {
	"folder": "peel1_gray",
	"endpoints": [0, down2, down2, down3, fall1],
	"framerates": [50, 50, 65, 65, 65]
}
PatchConfig[75] = {
	"folder": "peel1_gray",
	"endpoints": [0, down1, down2, down2, down3],
	"framerates": [50, 50, 65, 65, 65]
}
PatchConfig[76] = {
	"folder": "peel1_gray",
	"endpoints": [down2, down2, down2, down3, down3],
	"framerates": [43, 43, 43, 43, 43]
}
PatchConfig[77] = {
	"folder": "peel2_gray",
	"endpoints": [0, fall2, fall2, fall2, fall2],
	"framerates": [65, 65, 65, 65, 65]
}
PatchConfig[78] = {
	"folder": "peel1_gray",
	"endpoints": [0, down2, down2, down3, down3],
	"framerates": [50, 50, 65, 65, 65]
}
PatchConfig[79] = {
	"folder": "peel1_gray",
	"endpoints": [0, down3, down3, down3, down3],
	"framerates": [45, 45, 71, 72, 73]
}
PatchConfig[80] = {
	"folder": "peel2_gray",
	"endpoints": [0, corner1, corner2, corner3, corner3],
	"framerates": [32, 32, 32, 32, 32]
}
PatchConfig[81] = {
	"folder": "peel2_gray",
	"endpoints": [0, corner1, corner2, corner2, corner2],
	"framerates": [35, 35, 35, 35, 35],
	"flipped": true
}
PatchConfig[82] = {
	"folder": "peel1_gray",
	"endpoints": [0, down2, down3, fall1, fall1],
	"framerates": [43, 43, 43, 63, 63]
}
PatchConfig[83] = {
	"folder": "peel1_gray",
	"endpoints": [0, fall1, fall1, fall1, fall1],
	"framerates": [73, 73, 73, 73, 73]
}
PatchConfig[84] = {
	"folder": "peel1_gray",
	"endpoints": [down2, fall1, fall1, fall1, fall1],
	"framerates": [64, 64, 64, 64, 64],
	"flipped": true
}
PatchConfig[85] = {
	"folder": "peel1_gray",
	"endpoints": [(down3 - 5), (down3 - 3), down3, down3, down3],
	"framerates": [50, 50, 65, 65, 65]
}
PatchConfig[86] = {
	"folder": "peel1_gray",
	"endpoints": [0, down3, down3, down3, down3],
	"framerates": [50, 50, 65, 65, 65]
}
PatchConfig[87] = {
	"folder": "peel2_gray",
	"endpoints": [0, 0, 0, 0, 0],
	"framerates": [38, 38, 38, 38, 38]
}
PatchConfig[88] = {
	"folder": "peel2_gray",
	"endpoints": [0, 0, 0, 0, 0],
	"framerates": [38, 38, 38, 38, 38]
}
PatchConfig[89] = {
	"folder": "peel2_gray",
	"endpoints": [0, 0, 0, 0, 0],
	"framerates": [38, 38, 38, 38, 38]
}
PatchConfig[90] = {
	"folder": "peel2_gray",
	"endpoints": [0, 0, 0, 0, 0],
	"framerates": [38, 38, 38, 38, 38]
}
PatchConfig[91] = {
	"folder": "peel2_gray",
	"endpoints": [0, corner1, corner1, corner1, corner1],
	"framerates": [25, 25, 25, 25, 25]
}
PatchConfig[92] = {
	"folder": "peel2_gray",
	"endpoints": [corner2, fall2, fall2, fall2, fall2],
	"framerates": [40, 63, 63, 63, 63],
	"flipped": true
}
PatchConfig[93] = {
	"folder": "peel2_gray",
	"endpoints": [corner1, corner1, corner1, corner2, (corner3 + 4)],
	"framerates": [30, 30, 30, 30, 30],
	"flipped": true
}
PatchConfig[94] = {
	"folder": "peel1_gray",
	"endpoints": [0, down1, down2, down2, down2],
	"framerates": [38, 38, 38, 38, 38]
}
PatchConfig[95] = {
	"folder": "peel2_gray",
	"endpoints": [0, 0, 0, 0, 0],
	"framerates": [38, 38, 38, 38, 38]
}
PatchConfig[96] = {
	"folder": "peel2_gray",
	"endpoints": [0, 0, 0, 0, 0],
	"framerates": [38, 38, 38, 38, 38]
}
PatchConfig[97] = {
	"folder": "peel2_gray",
	"endpoints": [0, corner1, corner1, corner2, corner2],
	"framerates": [31, 31, 31, 31, 31],
	"flipped": true
}
PatchConfig[98] = {
	"folder": "peel1_gray",
	"endpoints": [0, down1, down2, down2, down2],
	"framerates": [43, 43, 43, 43, 43]
}
PatchConfig[99] = {
	"folder": "peel1_gray",
	"endpoints": [0, down2, fall1, fall1, fall1],
	"framerates": [50, 50, 65, 65, 65]
}






/* ==========================================================================
// patch animation Variables
// -------------------------------------------------------------------------- */

var max_blocks = 100;

var core_vis_id = 'ztlido_core_vis_aid';

var isDragging = false;
var startDragY, startDragX;
var dragOffsetY, dragOffsetX;

var Sequences = [];
var SequencesLoaded = [];
var curStep = 0;

var patchSequence;
var CurrentPatchStage = 0;

var SequencesLoadedInt;



/* ==========================================================================
// patch animation Functions
// -------------------------------------------------------------------------- */
function createPeelGrid() {
	var container1 = $('#peel_container1');
	var container2 = $('#peel_container2');
	container1.empty();
	container2.empty();
	var output1 = '';
	var output2 = '';
	for (var i = 0; i < max_blocks; ++i) {
		if (i < (max_blocks / 2)) {
			output1 += '<canvas id="video_container' + i + '" class="video_container on" width="70" height="617"></canvas>';
		} else {
			output2 += '<canvas id="video_container' + i + '" class="video_container on" width="70" height="617"></canvas>';
		}
	}
	container1.append(output1);
	container2.append(output2);
	alignGrid1();
	alignGrid2();
	//initPeelSequences();
	initPeelSequence(0);
}


function initPeelSequence(i) {
	//console.log("Creating Sequence: " + i);
	var first, last, folder;
	var flipped = '';
	if (PatchConfig[i] !== undefined) {
		var patch = PatchConfig[i];
		folder = patch.folder;
		if (patch.flipped !== undefined) {
			flipped = (patch.flipped === true) ? 'flipped' : '';
			$('#video_container' + i).addClass(flipped);
		}
	} else {
		folder = 'peel1';
	}
	// container listener
	$('#video_container' + i).on('loaded', function(ev, n) {			
		if (n == 0) {
			var id = $(this).attr('id');
			var idx = id.replace(/^\D+/g, '');
			// show first frame immediately
			//console.log("Showing first frame of: " + idx);
			Sequences['videoSequence' + idx].playFrame(0);
		}
	});
	$('#video_container' + i).on('ready', function(ev, n) {
		var id = $(this).attr('id');
		var idx = id.replace(/^\D+/g, '');
		//console.log("Sequence " + idx + " is ready!");
		//SequencesLoaded.push(idx);
		if (i < (max_blocks - 1)) {
			initPeelSequence(++i);
		} else {
			$('#grid_dragger').addClass('on');
			$('#section_grid').addClass('on');
			$('#dragger_hider').addClass('off');
			gotoPatchStage(0);
		}
	});
	//console.log("Folder for Patch " + i + ": " + folder);
	first = PatchDefaults[folder].first;
	last = PatchDefaults[folder].last;
	Sequences['videoSequence' + i] = new $.qSequence({
		container: '#video_container' + i,
		first: first,
		last: last,
		folder: 'assets/images/patchAnimation/' + folder + '/',
		width: 60,
		height: 511,
		framerate: 30,
		useRetina: true,
		debug: false
	});
}

function initPeelSequences() {
	for (var i = 0; i < max_blocks; ++i) {
		var first, last, folder;
		var flipped = '';
		if (PatchConfig[i] !== undefined) {
			var patch = PatchConfig[i];
			folder = patch.folder;
			if (patch.flipped !== undefined) {
				flipped = (patch.flipped === true) ? 'flipped' : '';
				$('#video_container' + i).addClass(flipped);
			}
		} else {
			folder = 'peel1';
		}
		// container listener
		$('#video_container' + i).on('loaded', function(ev, n) {			
			if (n == 0) {
				var id = $(this).attr('id');
				var idx = id.replace(/^\D+/g, '');
				// show first frame immediately
				Sequences['videoSequence' + idx].playFrame(0);
			}
		});
		$('#video_container' + i).on('ready', function(ev, n) {
			var id = $(this).attr('id');
			var idx = id.replace(/^\D+/g, '');
			//console.log("Sequence " + idx + " is ready!");
			SequencesLoaded.push(idx);
		});
		//console.log("Folder for Patch " + i + ": " + folder);
		first = PatchDefaults[folder].first;
		last = PatchDefaults[folder].last;
		Sequences['videoSequence' + i] = new $.qSequence({
			container: '#video_container' + i,
			first: first,
			last: last,
			folder: 'assets/images/patchAnimation/' + folder + '/',
            width: 60,
            height: 511,
			framerate: 30,
			useRetina: true,
			debug: false
		});
	}
	SequencesLoadedInt = setInterval(function() {
		waitForSequencesToLoad();
	}, 20);
}

function waitForSequencesToLoad() {
	var total = SequencesLoaded.length;
	//console.log("Sequences Loaded: " + total);
	if (total == max_blocks) {
		clearInterval(SequencesLoadedInt);
		//console.log("Done Loading!");
		$('#grid_dragger').addClass('on');
		$('#section_grid').addClass('on');
		$('#dragger_hider').addClass('off');
		gotoPatchStage(0);
	}
}

function resetGridPatches() {
	var total = Sequences.length;
	for (var seq in Sequences) {
		Sequences[seq].playFrame(0);
		Sequences[seq].currentImage = 0;
	}
	var dragger = $('#grid_dragger .slider_track').find('.dragger');
	dragger.css('left', '0px');
	updateGrid(0);
}


function alignGrid1() {
	var cur_row = 1;
	var cur_col = 0;
	var left_offset = 36;
	var top_offset = 50;
	var start_top = 0;

	$('#peel_container1 .video_container').each(function(idx) {
		if ((idx / 10) >= cur_row) {
			cur_row = cur_row + 1;
			cur_col = 0;
		}
		$(this).css('top', (start_top + (top_offset * cur_row)) + 'px');
		$(this).css('left', (left_offset * cur_col) + 'px');
		$(this).css('z-index', -(idx));
		cur_col = cur_col + 1;
	});
}

function alignGrid2() {
	var cur_row = 1;
	var cur_col = 0;
	var left_offset = 36;
	var top_offset = 50;
	var start_top = 0;

	$('#peel_container2 .video_container').each(function(idx) {
		if ((idx / 10) >= cur_row) {
			cur_row = cur_row + 1;
			cur_col = 0;
		}
		$(this).css('top', (start_top + (top_offset * cur_row)) + 'px');
		$(this).css('left', (left_offset * cur_col) + 'px');
		$(this).css('z-index', -(idx));
		cur_col = cur_col + 1;
	});
}



function gotoPatchStage(stageNum) {
	for (var i = 0; i < max_blocks; ++i) {
		if (PatchConfig[i] !== undefined) {
			var node = PatchConfig[i];
			var end = (node.endpoints !== undefined) ? node.endpoints[stageNum] : 0;
			var fps = (node.framerates !== undefined) ? node.framerates[stageNum] : 30;
			var seq = Sequences['videoSequence' + i];
			var cur = seq.currentImage;
			seq.play(cur, end, fps);
		}
	}
	var slider_num = 0;
	var zt_num = 0;
	var generic_num = 0;
	if (stageNum == 0) {
		slider_num = 0;
		zt_num = 100;
		generic_num = 80;
	} else if (stageNum == 1) {
		slider_num = 3;
		zt_num = 97;
		generic_num = 52;
	} else if (stageNum == 2) {
		slider_num = 6;
		zt_num = 96;
		generic_num = 41;
	} else if (stageNum == 3) {
		slider_num = 9;
		zt_num = 95;
		generic_num = 31;
	} else if (stageNum == 4) {
		slider_num = 12;
		zt_num = 93;
		generic_num = 27;
	}
	var cur_zt = parseFloat($('#zt_number .num').text());
	if (isNaN(cur_zt)) {
		cur_zt = 93;
	}
	var cur_generic = parseFloat($('#generic_number .num').text());
	// animate numbers
	animateCounter('#slider_num', 0, slider_num, 0);
	animateCounter('#zt_number_counter', cur_zt, zt_num, 0);
	animateCounter('#generic_number_counter', cur_generic, generic_num, 0);
	// move the slider bttn
	curGridPos = stageNum;
}



function animateCounter(counterEl, startValue, endValue, duration) {
	//console.log("Animating Counter: " + counterEl);
	$(counterEl).each(function() {
		var $this = $(this);
		$({ Counter: startValue }).animate({ Counter: endValue }, {
			duration: duration,
			easing: 'swing',
			step: function() {
				var cur = Math.floor(this.Counter);
				//console.log("cur: " + cur);
				if (counterEl == '#grid_slider_num') {
					$this.html(cur);
				} else {
					$this.html(cur + '<sup>%</sup>');
				}

			},
			complete: function() {
				// show end value no matter what Counter is
				if (endValue == 93 && counterEl == '#zt_number_counter') {
					$this.html("&gt;" + endValue + '<sup>%</sup>');
				} else if (counterEl == '#slider_num') {
					$this.html(endValue);
				} else {
					$this.html(endValue + '<sup>%</sup>');
				}

			}
		});
	});
}

function resetCounters() {
	$('.counter').html('0<sup>%</sup>');
}


function startSlider(el, e) {
	//console.log("startSlider");
	// dragger has been touched, can remove the directional label
	//firstLoad = false;
	// Get touch position relative to bar/track
	var bar = el.get(0);
	var barRect = bar.getBoundingClientRect();
	startDragY = barRect.top;
	startDragX = barRect.left;

	var draggerEl = el.find('.dragger')[0];
	var draggerRect = draggerEl.getBoundingClientRect();
	var draggerOffsetY = e.clientY - draggerRect.top;
	var draggerOffsetX = e.clientX - draggerRect.left;
	// set global var to match starting offset
	dragOffsetY = draggerOffsetY;
	dragOffsetX = draggerOffsetX;
	//
	var draggerW = parseFloat($(draggerEl).outerWidth());
	dragOffsetX = draggerW / 2;
	updateSlider(el, e);
}

// Function to animate slider
// Receives a new X value to move and the dagger element
function animateSlider(newX, el) {
  // set dragger position
  el.css('left', newX + 'px');
  updateGrid(newX);
  console.log(newX);
}

function updateSlider(el, e) {
	//console.log("updateSlider");
	var thisParent = el.parent();
	var barW = parseFloat(el.width());
	var barH = parseFloat(el.height());
	var dragger = el.find('.dragger');
	var draggerH = parseFloat(dragger.outerHeight());
	var draggerW = parseFloat(dragger.outerWidth());
	// Get global to relative touch position inside bar/track
	var barOffsetY = e.clientY - startDragY;
	var barOffsetX = e.clientX - startDragX;

	var newX = barOffsetX - (dragOffsetX);
	if (newX <= 0) {
		newX = 0;
		console.log("less than zero");
	} else if (newX >= (barW - draggerW)) {
		newX = barW - draggerW;
		console.log("greater than max");
	}

  animateSlider(newX, dragger);
	// debug
	//console.log("perc: " + perc + " || min: " + topVal + " || max: " + bottomVal + " || curVal: " + curVal);
}



function endSlider(el, e) {
	//console.log("endSlider");
	var pos = dragPoints[curGridPos];
	var dragger = el.find('.dragger');
	dragger.css('left', pos + 'px');
}

var curGridPos = 0;
var dragPoints = [0, 133, 264, 395, 531];

function updateGrid(newX) {
	var newGridPos = 0;
	var pos1 = 0;
	var pos2 = 133;
	var pos3 = 264;
	var pos4 = 395;
	var pos5 = 531;
	// the maths
	var pos1_mid = (pos2 / 2);
	var pos2_mid = pos2 + ((pos3 - pos2) / 2);
	var pos3_mid = pos3 + ((pos4 - pos3) / 2);
	var pos4_mid = pos4 + ((pos5 - pos4) / 2);
	// hard-coded, because I don't have time ... sorry
	if (newX >= pos1 && newX < pos1_mid) {
		newGridPos = 0;
	} else if (newX >= pos1_mid && newX < pos2_mid) {
		newGridPos = 1;
	} else if (newX >= pos2_mid && newX < pos3_mid) {
		newGridPos = 2;
	} else if (newX >= pos3_mid && newX < pos4_mid) {
		newGridPos = 3;
	} else if (newX >= pos4_mid && newX <= pos5) {
		newGridPos = 4;
	}
	if (newGridPos != curGridPos) {
		curGridPos = newGridPos;
		gotoPatchStage(curGridPos);
	}
}


/* ==========================================================================
// READY SET GO
// -------------------------------------------------------------------------- */

$(window).on("load", function(){

	createPeelGrid();

	$('#grid_dragger .slider_track').on(eventDown, function(e) {
		e.stopPropagation();
		e.preventDefault();
		e.stopImmediatePropagation();
		//console.log('touchstart working');
		isDragging = true;
		startSlider($(this), getTouchEvent(e));	
	}).on(eventMove, function(e) {
		e.stopPropagation();
		e.preventDefault();
		e.stopImmediatePropagation();
		//console.log('touchmove working');
		if (isDragging) {
			updateSlider($(this), getTouchEvent(e));
		}	
	}).on(eventUp, function(e) {
		e.stopPropagation();
		e.preventDefault();
		e.stopImmediatePropagation();
		//console.log('touchend working');
		isDragging = false;
		setTouchEnd(e);
		endSlider($(this), e);
	});

	$('.anim-outside-cta').on('click', function(e){
		var targetX = $(this).data('x');
		$('#grid_dragger_left .label').removeClass('actv');
		$(this).addClass('actv')
		var $dagger = $('.dragger');
		animateSlider(targetX, $dagger);
	});


	$('#cta-7').on('click', function() {
		animateSlide();
		$('#grid_dragger_left .label').removeClass('actv');
		$('#grid_dragger_left .label:first-child').addClass('actv');
	});
	//load up the patch animation grid first thing
	//jumpToGrid();


});






/* ==========================================================================
// Completely Pointless EOF Comment ... I like space down here ... sue me! - ME TOO LMAO
// -------------------------------------------------------------------------- */
