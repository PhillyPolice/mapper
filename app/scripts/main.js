(function () {
	'use strict';

	// Setting up the third-party libraries
	requirejs.config({
		baseUrl: 'scripts/',
		paths: {
			'jquery': 'vendor/jquery/jquery',
			'underscore': 'vendor/underscore/underscore',
			'backbone': 'vendor/backbone/backbone',
			'text': 'vendor/requirejs-text/text',
			'leaflet': 'vendor/leaflet/dist/leaflet-src',
			'draw': 'vendor/leaflet.draw/dist/leaflet.draw-src',
			'zebra': 'vendor/Zebra_Datepicker/public/javascript/zebra_datepicker.src'
		},
		shim: {
			underscore: {
				exports: '_'
			},
			backbone: {
				exports: 'Backbone',
				deps: ['jquery', 'underscore']
			},
			draw: ['leaflet'],
			zebra: ['jquery']
		}
	});

	// Starting the application
	require([
		'backbone',
		'views/app',
		'router'
		], function (Backbone, AppView, AppRouter) {
		// Deal with different devices here?
		/* jshint -W031 */
		new AppRouter();
		Backbone.history.start();

		new AppView();
	});
}());