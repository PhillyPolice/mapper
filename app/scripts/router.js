define([
	'jquery',
	'underscore',
	'backbone',
	'views/home'
	], function ($, _, Backbone, HomeView) {
		var AppRouter = Backbone.Router.extend({
			routes: {
				'': 'home'
			},

			home: function () {
				var homeView = new HomeView();
				homeView.render();
			}
		});

		var initialize = function () {
			var appRouter = new AppRouter();

			Backbone.history.start();
		};

		return {
			initialize: initialize
		};
	}
);