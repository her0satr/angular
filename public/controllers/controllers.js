var app = angular.module("myApp", []);
app.controller("AppCtrl", function($scope, $http) {
	var page = {
		init: function() {
			page.contact_load();
		},
		contact_load: function() {
			$http.get('/contact_list').success(function(response) {
				$scope.contact_list = response;
			});
		},
		contact_reset: function() {
			$scope.contact = {};
		}
	}
	page.init();
	
	$scope.addContact = function() {
		if ($scope.contact == null) {
			return;
		}
		
		$scope.contact.action = 'contact_insert';
		$http.post('/contact_update', $scope.contact).success(function(response) {
			page.contact_load();
			page.contact_reset();
		});
	}
	
	$scope.updateContact = function(contact) {
		contact.action = 'contact_get_by_id';
		$http.post('/contact_update', contact).success(function(response) {
			$scope.contact = response;
		});
	}
	
	$scope.removeContact = function(contact) {
		contact.action = 'contact_delete';
		$http.post('/contact_update', contact).success(function(response) {
			page.contact_load();
		});
	}
});
