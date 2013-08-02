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
						color: '#FF0DFF'
					}
				}
			},
			edit: false,
      position: 'topleft'
		};

    console.log(L.Control.Draw);

		return new L.Control.Draw(options);
	}
);