define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/home.html',
	'text!templates/attribution.html',
	'leaflet',
	'controls/polygon-draw'
	], function ($, _, Backbone, HomeTemplate, AttributionTemplate, L, DrawControl) {
		var HomeView = Backbone.View.extend({

			el: $('body'),

			initialize: function () {

				var map = L.map('map', {
					center: new L.LatLng(39.952335, -75.163789),
					zoom: 13,
					attributionControl: false,
					touchZoom: true,
					dragging: true
				});

				var tonerUrl = 'http://{S}tile.stamen.com/toner/{Z}/{X}/{Y}.png';

				var url = tonerUrl.replace(/({[A-Z]})/g, function(s) {
                    return s.toLowerCase();
                });

				var basemap = new L.tileLayer(url, {
					subdomains: ['','a.','b.','c.','d.'],
					minZoom: 0,
					maxZoom: 20,
					type: 'png'
				});
				basemap.addTo(map);

				var mapAttribution = new L.Control.Attribution({
					prefix: false,
					position: 'bottomright'
				});

				mapAttribution.addAttribution(AttributionTemplate);
				map.addControl(mapAttribution);

				var drawControl = DrawControl;

				map.addControl(drawControl);

				this.render();

			},

			render: function () {

				return this;
			}
		});

		return HomeView;
	}
);