define([
	'jquery',
	'underscore',
	'backbone',
	'views/home',
	'models/user-input'
	], function ($, _, Backbone, HomeView, UserInput) {
		var AppRouter = Backbone.Router.extend({
			routes: {
				'': 'home'
			},

			home: function () {
				var userInput = new UserInput();

				var homeView = new HomeView({model: userInput});
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