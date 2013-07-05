define([
	'../models/user-input',
	'../models/crime'
	], function (UserInput, Crime) {
		var Crimes = Backbone.Collection.extend({

			start: '',
			end: '',
			geometry: '',

			url: 'http://gis.phila.gov/ArcGIS/rest/services/PhilaGov/Police_Incidents/MapServer/0/query',

			model: Crime,

			fetch: function() {
				var options = {};
				this.whereClause = 'DISPATCH_DATE >= \'' + this.start + '\' AND DISPATCH_DATE <= \'' +
					this.end + '\'';
				options.data = {
					where : this.whereClause,
					geometry : this.geometry,
					geometryType : 'esriGeometryPolygon',
					spatialRel : 'esriSpatialRelContains',
					outFields : 'DISPATCH_DATE,DISPATCH_TIME,TEXT_GENERAL_CODE,HOUR,POINT_X,POINT_Y,UCR_GENERAL,LOCATION_BLOCK,DC_KEY',
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

				return models;
			}
		});

		return new Crimes();
	}
);