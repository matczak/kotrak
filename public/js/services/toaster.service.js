/**
 * Created by michnik on 14.06.2016.
 */
(function () {

	toasterService.$inject = ['toaster'];
	function toasterService(toaster) {
		var service = {
			success: success,
			error: error
		};
		return service;

		function success(data) {
			if (data.msg) {
				popToaster(data.msg, 'success');
			}
		}

		function error(data) {
			if (data.msg) {
				popToaster(data.msg, 'error');
			}
		}

		function popToaster(msg, type) {
			toaster.pop({
				type: type,
				body: msg,
				timeout: 2000
			});
		}
	}

	angular.module('Kotrak')
		.service('toasterService', toasterService);
})();