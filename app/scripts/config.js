define([
	'jquery',
	'underscore',
	'backbone',
	'router',
	'collections/crimes',
	'leaflet'
	], function ($, _, Backbone, router, Crimes, L) {

		var CrimeType = function (code, name) {
			this.code = code;
			this.name = name;
		};

		var config = {};

		config.types = {};

		config.types['100'] = new CrimeType(100, 'Homicides');
		config.types['200'] = new CrimeType(200, 'Rapes');
		config.types['300'] = new CrimeType(300, 'Robberies');
		config.types['400'] = new CrimeType(400, 'Aggravated Assaults');
		config.types['500'] = new CrimeType(500, 'Burglaries');
		config.types['600'] = new CrimeType(600, 'Thefts');
		config.types['700'] = new CrimeType(700, 'Auto Thefts');

		return config;
	}
);