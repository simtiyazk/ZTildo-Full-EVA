'use strict';

const SlideSwipeConfig = {
	id: 'ZTlido-Full-EVA_15_30'
};

$(() => {

//private
var self, el;

class Slide {

	constructor() {
		//set vars
		self = this;
		el = $('#ZTlido-Full-EVA_15_30');

		//Flip cards snippet
		var cards = document.querySelectorAll('.card');

			[...cards].forEach((card)=>{
			card.addEventListener( 'click', function() {
				card.classList.toggle('is-flipped');
			});
		});
		//listeners
	}

	//----- handlers ------//


	//----- utils ------//

}

var slide = new Slide();

});
