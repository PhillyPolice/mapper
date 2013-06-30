define([
	'jquery',
	'underscore',
	'backbone',
	'leaflet',
	'../models/user-input',
	'../models/crime'
	], function ($, _, Backbone, L, UserInput, Crime) {

		var Crimes = Backbone.Collection.extend({

			url: 'http://gis.phila.gov/ArcGIS/rest/services/PhilaGov/Police_Incidents/MapServer/0/query',

			model: Crime,

			fetch: function() {
				var options = {};
				this.whereClause = 'DISPATCH_DATE >= \'' + UserInput.get('startDate') + '\' AND DISPATCH_DATE <= \'' +
					UserInput.get('endDate') + '\'';
				options.data = { where : this.whereClause,
					geometry : UserInput.get('geometry'),
					geometryType : 'esriGeometryPolygon',
					spatialRel : 'esriSpatialRelContains',
					outFields : 'DISPATCH_DATE,DISPATCH_TIME,TEXT_GENERAL_CODE,HOUR,POINT_X,POINT_Y,UCR_GENERAL,LOCATION_BLOCK',
					inSr : 4326,
					outSR : 4326,
					f : 'pjson'
				};
				return Backbone.Collection.prototype.fetch.call(this, options);
			},

			// TODO: Validate that the service brought back actual crimes and not a 400 or 404	
			parse: function(data) {
				var models = [];

				for (var i = 0; i < data.features.length; i = i + 1) {
					models.push(data.features[i].attributes);
				}

				this.trigger('doneParsing');
				return models;
			}
		});

		var crimes = new Crimes();

		return crimes;
	}
);