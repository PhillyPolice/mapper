define([
	'jquery',
	'underscore',
	'backbone',
	'../collections/crimes',
	'../collections/crime-type'
	], function ($, _, Backbone, Crimes, CrimeTypeCollection) {
		var CrimeType = Backbone.Model.extend({
			defaults: {
				visibility: true,
				count: 0,
				code: '',
				name: ''
			},

			initialize: function () {
				this.crimes = new CrimeTypeCollection();
				_.bindAll(this, 'updateCrimes');
			},

			toggle: function () {
        this.set('visibility', !this.get('visibility'));
			},

			updateCrimes: function (crimes) {
				var code = this.get('code');
				code = code.toString();
				var models = crimes.where({UCR_GENERAL: code});
        this.set('count', models.length);
				this.crimes.reset(models);
			}
		});
		return CrimeType;
	}
);