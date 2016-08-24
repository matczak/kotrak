/**
 * Created by michnik on 23.08.2016.
 */
(function () {

	function tokenService() {
		var token = null;
		return {
			set: function(val) {
				token = val;
			},
			get: function() {
				return token;
			}
		}
	}

	angular.module('Kotrak')
		.factory('tokenService', tokenService);
})();