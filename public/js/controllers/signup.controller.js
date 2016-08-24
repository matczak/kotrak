/**
 * Created by michn on 08.06.2016.
 */
(function () {

	signUpCtrl.$inject = ['userService', 'toasterService', '$state', 'tokenService'];
	function signUpCtrl(userService, toasterService, $state, tokenService) {
		var vm = this;
		vm.formData = {};
		vm.sendForm = sendForm;

		function sendForm() {
			userService.signUp(vm.formData)
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
		.controller('signUpCtrl', signUpCtrl);
})();