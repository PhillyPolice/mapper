define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/home.html' // Pull in the HTML template
	], function ($, _, Backbone, HomeTemplate) {
		var HomeView = Backbone.View.extend({
			el: $('#container'),
			render: function () {
				var data = {adj: 'awesome'}; // Test data

				var template = _.template(HomeTemplate, data);

				this.$el.append(template);
			}
		});

		return HomeView;
	}
);