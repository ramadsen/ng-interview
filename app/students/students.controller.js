(function() {
	'use strict';

	angular
		.module('ngInterview.students')
		.controller('StudentsController', StudentsController);

	StudentsController.$inject = ['StudentsService'];
	function StudentsController(StudentsService) {

		/**
		 * Model
		 */

		var vm = this;
		var requestCounter = 0;

		/**
		 * Initialization
		 */

		activate();

		/**
		 * Implementations
		 */

		function activate() {
			// Initialization code goes here
			loadStudents();

		}

		function loadStudents() {
			requestCounter++;
		    var getStudents = StudentsService.getStudents();
		    getStudents.then(function (data) {
		    	vm.state = "good-data";
		    	vm.students = data;

		    }).catch(function(e){
		    	console.error(e || "Request failed");
		    	//limiting the number of times it tries to avoid infinite loop
		    	if (e == 503 && requestCounter <= 5) {
		    		loadStudents();
		    	} else if (requestCounter >= 6) {
		    		vm.state = "service-down";
		    	} else {
		    		vm.state = "bad-data";
		    	}
		    });
		}
	}
})();
