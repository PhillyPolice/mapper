define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/home.html',
	'text!templates/attribution.html',
	'leaflet',
	'models/user-input',
	'controls/polygon-draw',
	'controls/date-picker',
	'../channel'
	], function ($, _, Backbone, HomeTemplate, AttributionTemplate, L, UserInput, DrawControl, DatePicker, channel) {
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

				var drawnItems = new L.featureGroup();

				var self = this;

				// Update userInput model when geometry drawn
				map.on('draw:created', function(evt) {
					//console.log(evt);

					geometry = {};
					geometry.rings = [];
					var tempArray = [];
					geometry.spatialReference = {'wkid': 4326};

					for (var i=0; i < evt.layer._latlngs.length; i = i + 1) {
						var lat = evt.layer._latlngs[i].lat;
						var lng = evt.layer._latlngs[i].lng;
						tempArray.push([lng, lat]);
					}

					tempArray.push([evt.layer._latlngs[0].lng, evt.layer._latlngs[0].lat]);
					geometry.rings.push(tempArray);
					var queryGeometry = JSON.stringify(geometry);

					self.model.set('geometry', queryGeometry);

					drawnItems.clearLayers();
					map.addLayer(drawnItems);
					drawnItems.addLayer(evt.layer);
					map.fitBounds(drawnItems.getBounds());

				});

				// Update userInput model when dates changed
				channel.on('startDate', function (date) {
					self.model.set('startDate', date);
				});

				channel.on('endDate', function (date) {
					self.model.set('endDate', date);
				});

				this.render();

			},

			render: function () {

				return this;
			}
		});

		return HomeView;
	}
);