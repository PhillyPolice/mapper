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
						color: '#bada55'
					}
				}
			},
			edit: false
		};

		var DrawControl = new L.Control.Draw(options);

		return DrawControl;
	}
);