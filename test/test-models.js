define([
	'jquery',
	'underscore',
	'backbone',
	'chai',
	'../app/scripts/models/user-input',
	'../app/scripts/models/crime-type'
	], function ($, _, Backbone, chai, UserInput, CrimeType) {

		'use strict';
		/* jshint -W030 */
		var should = chai.should();
		var assert = chai.assert;
		var expect = chai.expect;

		describe('Model Tests', function () {

			describe('Default values', function () {
				it('UserInput can be created with an empty geometry', function () {
					var userInput = UserInput;

					expect(userInput.get('geometry')).to.equal('');
				});

				it('UserInput can be created with an empty start date', function () {
					var userInput = UserInput;

					expect(userInput.get('startDate')).to.equal('');
				});

				it('UserInput can be created with an empty end date', function () {
					var userInput = UserInput;

					expect(userInput.get('endDate')).to.equal('');
				});

				it('CrimeType can be created with visiblity of true', function () {
					var crimeType = new CrimeType();

					expect(crimeType.get('visibility')).to.be.ok;
				});

				it('CrimeType can be created with an empty code', function () {
					var crimeType = new CrimeType();

					expect(crimeType.get('code')).to.equal('');
				});

				it('CrimeType can be created with an empty name', function () {
					var crimeType = new CrimeType();

					expect(crimeType.get('name')).to.equal('');
				});

				it('CrimeType can be created with a count set to zero', function () {
					var crimeType = new CrimeType();

					expect(crimeType.get('count')).to.equal(0);
				});

			});

      describe('Value assignment', function () {
        it('CrimeType can have its visibility set to false', function () {
          var crimeType = new CrimeType();

          crimeType.toggleVisibility();

          expect(crimeType.get('visibility')).to.not.be.ok;
        });

      });

		});
	}
);