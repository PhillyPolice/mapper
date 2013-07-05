define([
	'jquery',
	'underscore',
	'backbone',
	'chai',
	'../app/scripts/collections/crimes'
	], function ($, _, Backbone, chai, Crimes) {

		'use strict';
		/* jshint -W030 */
		var should = chai.should();
		var assert = chai.assert;
		var expect = chai.expect;

		describe('Collection Tests', function () {

			describe('Default values', function () {
				it('Crimes can be created with an empty geometry', function () {
					expect(Crimes.geometry).to.equal('');
				});

				it('Crimes can be created with an start date', function () {
					expect(Crimes.start).to.equal('');
				});

				it('Crimes can be created with an end date', function () {
					expect(Crimes.end).to.equal('');
				});

				it('Crimes can be created with the correst REST endpoint', function () {
					expect(Crimes.url).to.equal('http://gis.phila.gov/ArcGIS/rest/services/PhilaGov/Police_Incidents/MapServer/0/query');
				});

				//PhantomJS is having problems w/ async tests for now - grrrr
				//it('Crimes can fetch the correct number of crimes', function (done) {
				//Crimes.start = '2013-06-01';
				//Crimes.end = '2013-06-03';
				//Crimes.geometry = '{"rings":[[[-75.17772674560547,39.939093223452986],[-75.15369415283203,39.9393564578778],[-75.1526641845703,39.928694653732364],[-75.17549514770508,39.925535281697286],[-75.17772674560547,39.939093223452986]]],"spatialReference":{"wkid":4326}}';
				//Crimes.fetch();
				//done();

				//expect(Crimes.length).to.equal(13);

				//});

			});
		});
	}
);