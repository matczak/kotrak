/**
 * Created by michnik on 20.08.2016.
 */
(function () {

	loginCtrl.$inject = ['userService', '$state', 'toasterService', 'tokenService'];
	function loginCtrl(userService, $state, toasterService, tokenService) {
		var vm = this;
		vm.formData = {};
		vm.sendForm = sendForm;

		function sendForm() {
			userService.login(vm.formData)
				.then(function (data) {
					toasterService.success(data);
					$state.go('todo');
					tokenService.set(data.token);
				})
				.catch(function (data) {
					toasterService.error(data);
				})
		}

	}

	angular.module('Kotrak')
		.controller('loginCtrl', loginCtrl);
})();