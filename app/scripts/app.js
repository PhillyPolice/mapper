define([
	'underscore',
	'jquery',
	'backbone',
	'router' // router.js
	], function ($, _, Backbone, router) {
		'use strict';

		var initialize = function () {
			router.initialize();
		};

		return {
			init: initialize
		};
	});