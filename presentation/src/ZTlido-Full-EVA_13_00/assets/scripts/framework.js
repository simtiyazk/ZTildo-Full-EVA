// --------------------------------------------------------------------------
// Global Variables
// --------------------------------------------------------------------------

// var isiScroll;
var slideHasAnimation = 'false';


function gotoNextSlideInFlow() {
	if ($('div').hasClass('dot-menu') && $('.dot-menu .dot:last-child').hasClass('active')) {
		slideJumpNext();

	} else if ($('div').hasClass('dot-menu') && !$('.submenu-dot1').hasClass('hide')) {
		$('.submenu-dot-content').addClass('hide');
		$('.submenu-dot-content.submenu-dot2').removeClass('hide');
		$('.dot-menu .dot').removeClass('active');
		$('.dot-menu .dot.dot2').addClass('active');
		if (slideHasAnimation === 'true') {
			animateSlide();
		}

	} else if ($('div').hasClass('dot-menu') && !$('.submenu-dot2').hasClass('hide')) {
		$('.submenu-dot-content').addClass('hide');
		$('.submenu-dot-content.submenu-dot3').removeClass('hide');
		$('.dot-menu .dot').removeClass('active');
		$('.dot-menu .dot.dot3').addClass('active');
		if (slideHasAnimation === 'true') {
			animateSlide();
		}

	} else {
		slideJumpNext();
	}
}



function gotoPrevSlideInFlow() {
	if ($('div').hasClass('dot-menu') && !$('.submenu-dot1').hasClass('hide')) {
		slideJumpPrevious();
	} else if ($('div').hasClass('dot-menu') && !$('.submenu-dot2').hasClass('hide')) {
		$('.submenu-dot-content').addClass('hide');
		$('.submenu-dot-content.submenu-dot1').removeClass('hide');
		$('.dot-menu .dot').removeClass('active');
		$('.dot-menu .dot.dot1').addClass('active');
		if (slideHasAnimation === 'true') {
			animateSlide();
		}

	} else if ($('div').hasClass('dot-menu') && !$('.submenu-dot3').hasClass('hide')) {
		$('.submenu-dot-content').addClass('hide');
		$('.submenu-dot-content.submenu-dot2').removeClass('hide');
		$('.dot-menu .dot').removeClass('active');
		$('.dot-menu .dot.dot2').addClass('active');
		if (slideHasAnimation === 'true') {
			animateSlide();
		}

	} else {
		slideJumpPrevious();
	}
}










/* ======================================================================================
// DOMinatrix
// -------------------------------------------------------------------------------------- */

$(document).ready(function () {

	//functions to fire on load
	
	// activateiScrolls();
	// activateSwipe();
	//activateTopArrows();
	
	

	// fix veeva's issue with moving the whole frame
	document.addEventListener('touchmove', function (event) {
		return event.preventDefault();
	}, { capture: false, once: false, passive: false });

});
