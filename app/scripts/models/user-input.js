define([
	'jquery',
	'underscore',
	'backbone',
	'leaflet'
	], function ($, _, Backbone, L) {
		var UserInput = Backbone.Model.extend({
			defaults: {
				geometry : '',
				firstDraw: true // Need this anymore?
			}
		});

		return UserInput;
	}
);