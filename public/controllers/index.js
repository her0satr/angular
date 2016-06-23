var app = angular.module("myApp", []);
app.controller("AppCtrl", function($scope, $http) {
	$scope.page_no = 1;
	
	var page = {
		init: function() {
			page.contact_load();
		},
		contact_load: function() {
			$http.post('/contact_list', { no: $scope.page_no }).success(function(response) {
				$scope.contact_list = response.rows;
				$scope.pages = response.page;
			});
		},
		contact_reset: function() {
			$scope.contact = {};
		}
	}
	page.init();
	
	$scope.reloadTable = function(req) {
		$scope.page_no = req.no;
		page.contact_load();
	}
	
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
