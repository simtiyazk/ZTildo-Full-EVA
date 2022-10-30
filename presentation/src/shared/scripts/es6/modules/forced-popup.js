export default () => {
	const slide = $('.slide'),
				popup = $(`#${slide.data('forced-popup')}`);

	let viewedPopup = sessionStorage.getItem('studyPopup');

	if (!viewedPopup && popup.length) { 
		popup.toggleClass('hide active');
    sessionStorage.setItem('studyPopup', true); 
	}
};