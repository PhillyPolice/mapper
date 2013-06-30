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
			'draw': 'vendor/leaflet.draw/dist/leaflet.draw'
		},
		shim: {
			underscore: {
				exports: '_'
			},
			backbone: {
				exports: 'Backbone',
				deps: ['jquery', 'underscore']
			},
			draw: ['leaflet']	
		}
	});

	// Starting the application
	require(['app'], function (app) {
		// Deal with different devices here?
		app.init();
	});
}());