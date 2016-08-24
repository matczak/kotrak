/**
 * Created by michnik on 23.08.2016.
 */
(function () {

	todoService.$inject = ['logger'];
	function todoService(logger) {
		var service = {
			add: add,
			get: get,
			save: save,
			remove: remove
		};
		return service;

		function add(obj) {
			return logger.requestPost('/api/todos', obj);
		}

		function get() {
			return logger.requestGet('/api/todos');
		}

		function save(obj) {
			return logger.requestPost('/api/todos/update', obj);
		}

		function remove(id) {
			return logger.requestDelete('/api/todos/' + id);
		}

	}

	angular.module('Kotrak')
		.service('todoService', todoService);
})();