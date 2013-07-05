define([
	'jquery',
	'underscore',
	'backbone',
	'leaflet',
	'text!templates/popup.html'
	], function ($, _, Backbone, L, PopupTemplate) {
		var Marker = Backbone.View.extend({
			returnMarker: function () {
				var popup = _.template(PopupTemplate, this.model.toJSON());
				var marker = L.marker([
					this.model.get('POINT_Y'),
					this.model.get('POINT_X')],
					{
						icon: L.divIcon({
							className: 'icon-circle icon-4x ' + '_' + this.model.get('UCR_GENERAL'),
							iconSize: [20,20],
							iconAnchor: [8,8],
							popupAnchor: [1,-10]
						}),
						title: this.model.get('TEXT_GENERAL_CODE')
					}).bindPopup(popup);

				return marker;
			}
		});

		return Marker;
	}
);