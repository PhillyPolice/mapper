define([
	'jquery',
	'underscore',
	'backbone'
	], function ($, _, Backbone) {
		var UserInput = Backbone.Model.extend({
			defaults: {
				geometry : '',
				startDate: '',
				endDate: ''
			}
		});

		return new UserInput();
	}
);