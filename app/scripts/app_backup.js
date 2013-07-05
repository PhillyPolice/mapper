define([
	//'underscore',
	//'jquery',
	//'backbone',
	'router',
	'collections/crimes'
	], function (router, Crimes) {

		var app = {};

		app.init = function () {
			console.log('In init of app');
			router.initialize();
		};

		// For objects that all modules need to access
		app.crimes = new Crimes();

		console.log(app.crimes);

		return app;
	}
);