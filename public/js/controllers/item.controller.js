/**
 * Created by michnik on 23.08.2016.
 */
(function () {

	itemCtrl.$inject = [];
	function itemCtrl() {
		var vm  = this;
		vm.edit = false;

		vm.editItem   = editItem;
		vm.saveItem   = saveItem;
		vm.deleteItem = deleteItem;

		function editItem() {
			vm.edit = true;
		}

		function saveItem() {
			vm.edit = false;
			vm.onSave();
		}

		function deleteItem() {
			vm.onDelete();
		}

	}

	angular.module('Kotrak')
		.controller('itemCtrl', itemCtrl);
})();