define([
	'jquery',
	'underscore',
	'backbone'
	], function ($, _, Backbone) {
		var channel = _.extend({}, Backbone.Events);

		console.log(channel);

		return channel;
	}
);