(function () {
	'use strict';

	// Setting up the third-party libraries
	requirejs.config({
		baseUrl: 'scripts/',
		paths: {
			'jquery': 'vendor/jquery/jquery',
			'underscore': 'vendor/underscore/underscore',
			'backbone': 'vendor/backbone/backbone',
			'text': 'vendor/requirejs-text/text'
		},
		shim: {
			underscore: {
				exports: '_'
			},
			backbone: {
				exports: 'Backbone',
				deps: ['jquery', 'underscore']
			}
		}
	});

	// Starting the application
	require(['app'], function (app) {
		app.init();
	});
}());