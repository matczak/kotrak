/**
 * Created by michnik on 23.08.2016.
 */
(function () {

	todoCtrl.$inject = ['todoService', 'toasterService', '$filter'];
	function todoCtrl(todoService, toasterService, $filter) {
		var vm    = this;
		var items = [];

		vm.items         = [];
		vm.item          = null;
		vm.maxSize       = 3;
		vm.searchText    = null;
		vm.currentPage   = 1;
		vm.itemsPerPage  = 5;
		vm.itemsToRender = [];

		vm.search     = search;
		vm.addItem    = addItem;
		vm.setPage    = setPage;
		vm.getItems   = getItems;
		vm.saveItem   = saveItem;
		vm.deleteItem = deleteItem;

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
					items    = data.data.items;
					vm.items = data.data.items;
					setPage();
				})
				.catch(function (data) {
					toasterService.error(data);
				});
		}

		function deleteItem(index) {
			var _index = vm.currentPage * vm.itemsPerPage + index - vm.itemsPerPage;

			todoService.remove(vm.items[_index]._id)
				.then(function (data) {
					toasterService.success(data);
					vm.items.splice(_index, 1);
					setPage();
				})
				.catch(function (data) {
					toasterService.error(data);
				});
		}

		function search() {
			vm.items = vm.searchText == '' ? items : $filter('filter')(items, {content: vm.searchText});

			vm.currentPage = 1;
			setPage();
		}

		function setPage() {

			var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
			var end   = (begin + vm.itemsPerPage > vm.items.length ? vm.items.length : begin + vm.itemsPerPage);

			vm.itemsToRender = vm.items.slice(begin, end);

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