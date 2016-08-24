/**
 * Created by michnik on 20.08.2016.
 */
(function () {
	var app = angular.module('Kotrak', ['ui.router', 'toaster', 'oitozero.ngSweetAlert', 'ui.bootstrap']);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function config($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('login');

		$stateProvider
			.state('signUp', {
				url: '/signup',
				templateUrl: 'views/signup.html',
				controller: 'signUpCtrl',
				controllerAs: 'signUp'
			})
			.state('login', {
				url: '/login',
				templateUrl: 'views/login.html',
				controller: 'loginCtrl',
				controllerAs: 'login'
			})
			.state('todo', {
				url: '/todo',
				templateUrl: 'views/todo.html',
				controller: 'todoCtrl',
				controllerAs: 'todo'
			})
	}

	app.config(config);
})();