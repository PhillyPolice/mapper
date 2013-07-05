define([
	'jquery',
	'underscore',
	'backbone',
	'leaflet',
	'draw'
	], function ($, _, Backbone, L) {

		var options = {
			draw: {
				circle: false,
				polyline: false,
				rectangle: false,
				marker: false,
				polygon: {
					shapeOptions: {
						color: '#FFBC00',
						opacity: 0.1
					}
				}
			},
			edit: false
		};

		var DrawControl = new L.Control.Draw(options);

		return DrawControl;
	}
);