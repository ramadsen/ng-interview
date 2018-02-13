'use strict';

describe('ngInterview.students module', function() {

	var $controller;

	beforeEach(function() {
		module('ngInterview.students');
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
