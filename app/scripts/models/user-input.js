define([
	'jquery',
	'underscore',
	'backbone',
	'leaflet'
	], function ($, _, Backbone, L) {
		var UserInput = Backbone.Model.extend({
			defaults: {
				geometry : '',
				startDate: '',
				endDate: '',
				firstDraw: true // Need this anymore?
			}
		});

		var userInput = new UserInput();

		return userInput;
	}
);