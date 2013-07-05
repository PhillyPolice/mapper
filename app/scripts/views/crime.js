define([
	'jquery',
	'underscore',
	'backbone',
	'leaflet',
	'text!templates/popup.html',
  '../channel'
	], function ($, _, Backbone, L, PopupTemplate, channel) {
		var Marker = Backbone.View.extend({

			returnMarker: function () {
				var marker = L.marker([
					this.model.get('POINT_Y'),
					this.model.get('POINT_X')],
					{
						icon: L.divIcon({
							className: 'icon-circle icon-4x ' + '_' + this.model.get('UCR_GENERAL') + ' ' + this.model.get('DC_KEY'),
							iconSize: [20,20],
							iconAnchor: [8,8],
							popupAnchor: [1,-10]
						}),
						title: this.model.get('TEXT_GENERAL_CODE')
					});

				return marker;
			},

      markerClicked: function () {
        console.log('marker clicked!!!!');
        console.log(this.model.toJSON());
      }
		});

		return Marker;
	}
);