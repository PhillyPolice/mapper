requirejs.config({
	baseUrl: 'scripts/',
	paths: {
		'jquery': '../app/scripts/vendor/jquery/jquery',
		'underscore': '../app/scripts/vendor/underscore/underscore',
		'backbone': '../app/scripts/vendor/backbone/backbone',
		'text': 'vendor/requirejs-text/text',
		'chai': '../app/scripts/vendor/chai/chai'
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

require(['chai'], function (chai) {

	require(['../test/test-boilerplate'], function () {
		// Start runner!
		mocha.run();
	});
});