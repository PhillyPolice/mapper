define([
	'jquery',
	'underscore',
	'backbone',
	'leaflet',
	'../views/crime',
	'../channel'
	], function ($, _, Backbone, L, Crime, channel) {
		var CrimeType = Backbone.View.extend({
			initialize: function () {
				this.layer = new L.LayerGroup();

				_.bindAll(this, 'render', 'addMarker', 'removeLayer', 'addLayer', 'updateCrimes');
				this.model.on('hide', this.removeLayer);
				this.model.on('show', this.addLayer);
				this.model.crimes.on('reset', this.render);
				channel.on('newCrimes', this.updateCrimes);
			},

			render: function () {
				this.removeLayer();
				this.layer.clearLayers();
				this.model.crimes.each(this.addMarker);
				if (this.model.get('visibility')) {
					this.addLayer();
				}
			},

			addMarker: function (model) {
				var crime = new Crime({model: model});
				var marker = crime.returnMarker();
				marker.addTo(this.layer);
			},

			removeLayer: function () {
				window.map.removeLayer(this.layer);
			},

			addLayer: function () {
				window.map.addLayer(this.layer);
			},

			updateCrimes: function (crimes) {
				this.model.updateCrimes(crimes);
			}
		});

		return CrimeType;
	}
);