/**
 * Created by michnik on 26.07.2016.
 */
logger.$inject = ['$q', '$http', 'tokenService'];
function logger($q, $http, tokenService) {
	var service = {
		requestGet: requestGet,
		requestPost: requestPost,
		requestDelete: requestDelete
	};
	return service;

	function requestGet(url) {
		function complete(response, resolve, reject) {
			var data = response.data;
			if (response.status === 200 && checkDataType(data.type)) {
				resolve(data);
			} else {
				reject(data);
			}
		}

		return $q(function (resolve, reject) {
			$http({
				method: 'GET',
				url: url,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'x-access-token': tokenService.get()
				}
			}).then(function (response) {
				return complete(response, resolve, reject);
			})
				.catch(function (error) {
					return reject(error);
				});
		})
	}

	function requestPost(url, data) {
		data = data || {};
		function complete(response, resolve, reject) {
			var data = response.data;
			if (response.status === 200 && checkDataType(data.type)) {
				return resolve(data);
			} else {
				return reject(data);
			}
		}

		return $q(function (resolve, reject) {
			$http({
				method: "POST",
				url: url,
				data: $.param(data),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'x-access-token': tokenService.get()
				}
			}).then(function (response) {
				return complete(response, resolve, reject);
			}).catch(function (error) {
				return reject(error);
			});
		})
	}

	function requestDelete(url) {
		function complete(response, resolve, reject) {
			var data = response.data;
			if (response.status === 200 && checkDataType(data.type)) {
				return resolve(data);
			} else {
				return reject(data);
			}
		}

		return $q(function (resolve, reject) {
			$http({
				method: 'DELETE',
				url: url,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'x-access-token': tokenService.get()
				}
			})
				.then(function (response) {
					return complete(response, resolve, reject);
				})
				.catch(function (error) {
					return reject(error);
				})
		});
	}

	function checkDataType(type) {
		return type == 'success' || type == 'data' || type == 'token';
	}
}

angular
	.module('Kotrak')
	.service('logger', logger);