define([
	'jquery',
	'underscore',
	'backbone',
	'views/home',
	'models/user-input'
	//'collections/crimes'
	], function ($, _, Backbone, HomeView, UserInput, Crimes) {
		var AppRouter = Backbone.Router.extend({
			routes: {
				'': 'home'
			},

			home: function () {

				var homeView = new HomeView({model: UserInput});
				homeView.render();

				//crimes = new Crimes();
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