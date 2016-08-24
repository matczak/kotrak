/**
 * Created by michnik on 23.08.2016.
 */
(function () {

	var item = {
		templateUrl: '/views/item.html',
		controller: 'itemCtrl',
		controllerAs: 'item',
		bindings: {
			content: '=',
			onDelete: '&',
			onSave: '&'
		}
	};

	angular.module('Kotrak')
		.component('item', item);
})();