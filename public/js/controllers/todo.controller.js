/**
 * Created by michnik on 23.08.2016.
 */
(function () {

	todoCtrl.$inject = ['todoService', 'toasterService', '$filter'];
	function todoCtrl(todoService, toasterService, $filter) {
		var vm = this;

		vm.item          = null;
		vm.items         = [];
		vm.array         = [];
		vm.maxSize       = 3;
		vm.searchText    = null;
		vm.currentPage   = 1;
		vm.itemsPerPage  = 5;
		vm.itemsToRender = [];

		vm.search         = search;
		vm.addItem        = addItem;
		vm.setPage        = setPage;
		vm.getItems       = getItems;
		vm.saveItem       = saveItem;
		vm.deleteItem     = deleteItem;
		vm.getItemsLength = getItemsLength;

		getItems();

		function addItem() {
			todoService.add(getItem())
				.then(function (data) {
					vm.item = null;
					vm.items.push(data.data);
					toasterService.success(data);
					setPage();
				})
				.catch(function (data) {
					toasterService.error(data);
				});
		}

		function saveItem(item) {
			todoService.save(item)
				.then(function (data) {
					toasterService.success(data);
				})
				.catch(function (data) {
					toasterService.error(data);
				});
		}

		function getItems() {
			todoService.get()
				.then(function (data) {
					vm.items = data.data.items;
					setPage();
				})
				.catch(function (data) {
					toasterService.error(data);
				});
		}

		function deleteItem(item) {
			var index = 0;
			for (index = 0; index < vm.items.length; index++)
				if (vm.items[index]._id == item._id) break;

			todoService.remove(item._id)
				.then(function (data) {
					toasterService.success(data);
					vm.items.splice(index, 1);
					search();
				})
				.catch(function (data) {
					toasterService.error(data);
				});
		}

		function search() {
			var array = vm.searchText ? $filter('filter')(vm.items, {content: vm.searchText}) : vm.items;

			vm.currentPage = 1;
			setPage(array);
		}

		function setPage(array) {
			var arrayToRender = array || vm.items;

			var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
			var end   = (begin + vm.itemsPerPage > vm.items.length ? vm.items.length : begin + vm.itemsPerPage);

			vm.itemsToRender = arrayToRender.slice(begin, end);

		}

		function getItemsLength() {
			if (vm.searchText) {
				return $filter('filter')(vm.items, {content: vm.searchText}).length;
			} else {
				return vm.items.length;
			}
		}

		function getItem() {
			return {
				content: vm.item
			}
		}
	}

	angular.module('Kotrak')
		.controller('todoCtrl', todoCtrl);
})();