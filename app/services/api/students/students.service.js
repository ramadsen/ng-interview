(function() {
	'use strict';

	angular
		.module('ngInterview.api.students')
		.service('StudentsService', StudentsService);

	StudentsService.$inject = ['$http', '$q'];
	function StudentsService($http, $q) {

		/**
		 * Exposed functions
		 */
		var service = {
			getStudents: getStudents
		}
		return service;

		////////////		 

		// this.getStudents = getStudents; // This function serves no purpose. It's just here as an example.

		/**
		 * Implementations
		 */

		function getStudents() {
		    var req = {
		      method: 'GET',
		      url: 'http://il-resume-api.azurewebsites.net/api/students',
		      timeout: '30000'
		    }
		    var defer = $q.defer();
		    $http(req).success(function (data, status, headers, config) {
		      try{
		      	if (status == 503) {
		      		defer.reject("Student service down");
		      	}
		      	//since the data is good if it's an array, I'm just checking for that.
		      	//I would do other checks if it could come back as other stuff or malformed in some other way.
		      	else if (Object.prototype.toString.call( data ) != '[object Array]') {
		      		defer.reject("Malformed data");
		      	} else {
		      		for (var i = 0; i < data.length; i++) {
		      			data[i].Name = data[i].FirstName + ' ' + data[i].LastName;
		      			data[i].showData = false;
		      		}
		      		defer.resolve(data);
		      	}
		      }
		      catch(e){
		        defer.reject("Malformed data");
		      }
		    }).error(function (data, status, headers, config) {
		      defer.reject(status);
		    });
		    return defer.promise;
		}
	}
})();
