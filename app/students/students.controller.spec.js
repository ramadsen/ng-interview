'use strict';

describe('ngInterview module', function() {

	var $controller;

	beforeEach(function() {
		module('ngInterview');
		inject(function(_$controller_) {
			$controller = _$controller_;
		});
	});

	describe('StudentsController', function() {

		it('should instantiate', function() {
			var studentsCtrl = $controller('StudentsController');
			expect(studentsCtrl).toBeDefined();
		});

	});

});
