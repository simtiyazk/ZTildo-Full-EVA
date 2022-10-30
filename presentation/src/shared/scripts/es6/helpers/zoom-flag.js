let isZoomed = false; 

class ZoomModel {
	constructor(args) {
		if (args !== undefined){
			isZoomed = args;
		}
	}

	getZoomed() {
		return isZoomed;
	}

	setZoomed(args) {
		isZoomed = args;
	}
}

export let zoomed = new ZoomModel(false);

