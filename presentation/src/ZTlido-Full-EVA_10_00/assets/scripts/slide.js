'use strict';

const SlideSwipeConfig = {
	id: 'ZTlido-Full-EVA_10_00'
};

$(() => {

//private
var self, el;

class Slide {

	constructor() {
		//set vars
		self = this;
		el = $('#ZTlido-Full-EVA_10_00');

		//initial setup
		const range = document.getElementById('range');
		const mask = document.querySelector('.mask');

		range.addEventListener('input', function(e){
		mask.style.width = `${range.value}%`;
		}, false);
				//listeners
				
		$('#cta-11').on('click', function(){
			mask.style.width = `0%`;
			range.value = 0;
		});
	}

	//----- handlers ------//


	//----- utils ------//

}

var slide = new Slide();

});
