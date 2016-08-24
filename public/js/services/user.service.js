/**
 * Created by michnik on 17.06.2016.
 */
(function () {

	userService.$inject = ['$http', '$q', 'logger'];
	function userService($http, $q, logger) {
		var service = {
			login: login,
			signUp: signUp,
			logout: logout
		};
		return service;

		function login(data) {
			return logger.requestPost('/api/login', data);
		}

		function logout() {
			return logger.requestGet('/api/logout');
		}

		function signUp(data) {
			return logger.requestPost('/api/signup', data);
		}

	}

	angular.module('Kotrak')
		.service('userService', userService);
})();