'use strict'; // Following is a SuperClass for your app
// ISI autoscroll Global
$(document).ready(function() {
	// Variables
	var isi = $('.isi');
	var isiMain = $('#isiMain');
	var isiWrapper = $('#isi_wrapper');
	var initialScrollSpeed = 36000;
	var scrollToTop = true; // Set to false if you do not need to scroll to the top when the auto scroll finished

	var myScroll = null;
	var scrollBar = null;
	var scrollSpeed = 0;
	var scrolledPercentage = 0;
	var isiHeight = 0;
	var isiFinished = false;
	var animationFinished = false;
	var isAnimating = true;
	var scrollWrapHeight = isiWrapper.clientHeight; // Assign timeline to window to be able to test.


	function initScrollBars() {
		myScroll = new IScroll('#isi_wrapper', {
			scrollbars: 'custom',
			interactiveScrollbars: true,
			mouseWheel: true,
			momentum: true,
			click: true,
			disablePointer: true,
			disableTouch: false,
			disableMouse: false
		});
		window.myScroll = myScroll;
		scrollBar = $('.iScrollVerticalScrollbar');
	}

	function scrollSetUp(e) {
		myScroll.scrollBy(0, 0, 1, {
			fn: function fn(k) {
				return k;
			}
		});
	}

	function startScroll() {
		scrollWrapHeight = $('#isi_wrapper').outerHeight(), isiHeight = -1 * (isi.outerHeight() - scrollWrapHeight), scrolledPercentage = myScroll.y * 100 / isiHeight, scrollSpeed = initialScrollSpeed - initialScrollSpeed * (scrolledPercentage / 100);
		myScroll.refresh();
		setTimeout(function() {
			if (scrolledPercentage >= 100) {
				isiFinished = true;
			}

			myScroll.scrollTo(0, isiHeight, scrollSpeed, {
				fn: function fn(k) {
					return k;
				}
			});
		}, 300);
	}

	function finishedAnimation() {
		animationFinished = true;
		startScroll();
	}

	function stopScroll() {
		myScroll.isAnimating = false; // stop animation
	} // scroll init


	initScrollBars();
	scrollBar.mouseenter(function() {
		scrollSetUp();
	});
	isiMain.mouseenter(function() {
		stopScroll();
	});
	isiMain.mouseleave(function() {
		if (animationFinished) {
			if (!isiFinished) {
				startScroll();
			}
		}
	});
	myScroll.on('scrollStart', function() {
		if (animationFinished) {
			if (myScroll.isAnimating) {
				stopScroll();
			}
		}
	});
	myScroll.on('scrollEnd', function() {
		if (isAnimating) {
			isAnimating = false;
			animationFinished = true;
			setTimeout(function () {
			  myScroll.scrollTo(0, 0, 2000);
			}, 3000);
		  }
	});
	setTimeout(function() {
		finishedAnimation();
	}, 2000)
});
