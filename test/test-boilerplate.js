// Define the Mocha tests here
define([
	'jquery',
	'underscore',
	'backbone',
	'chai'
	], function ($, _, Backbone, chai) {

		'use strict';

		var should = chai.should();
		var assert = chai.assert;
		var expect = chai.expect;

		describe('Sample Tests', function () {

			describe('Math', function () {
				it('can add two numbers', function () {
					var num1 = 2;
					var num2 = 3;

					expect(num1 + num2).to.equal(5);
				});

				it('can add subtract numbers', function () {
					var num1 = 3;
					var num2 = 2;

					expect(num1 - num2).to.equal(1);
				});
			});
		});
	}
);