var app = angular.module('mainApp', [
	'ngRoute',
	'firebase']);

app.config(function ($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'contacts/contact.html',
		controller: 'contactctrl'
	})
	.when('/error',{
		templateUrl : 'error.html'
	})
	.otherwise({
		redirectTo : '/error'
	});
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
});

app.controller('contactctrl', function($scope, $firebaseArray){

	$scope.addUserForm = true;
	$scope.editUserForm = false;
	$scope.userDeleteAlert = false;
	$scope.userAddAlert = false;
	$scope.userEditAlert = false;

	// Initialize firebase
	var config = {
		apiKey: "AIzaSyBAI8sKwBpiGsSz-9PiCZF0e2mO2RGnaDo",
		authDomain: "contactlist-d6a98.firebaseapp.com",
		databaseURL: "https://contactlist-d6a98.firebaseio.com",
		projectId: "contactlist-d6a98",
		storageBucket: "contactlist-d6a98.appspot.com",
		messagingSenderId: "443817918188"
	};
	firebase.initializeApp(config);

	var ref = firebase.database().ref("users");
	$scope.usersdata = $firebaseArray(ref);

	$scope.addUser = function(){		
		var ref = firebase.database().ref("users");
		$firebaseArray(ref).$add($scope.user)
		.then(function(ref){
			$scope.userAddAlert = true;
			window.setTimeout(function() {
			    $scope.$apply(function(){
			    	$scope.userAddAlert = false;
			    })
			}, 3000);
			$scope.user.name = "";
			$scope.user.email = "";
			$scope.user.phone = "";
		});
	}

	$scope.deleteUser = function(user){
		$scope.usersdata.$remove(user)
		.then(function(ref){
			$scope.userDeleteAlert = true;
			window.setTimeout(function() {
			    $scope.$apply(function(){
			    	$scope.userDeleteAlert = false;
			    })
			}, 3000);
		});
	}

	$scope.editList = function(user){
		$scope.addUserForm = false;
		$scope.editUserForm = true;		
		$scope.id = user.$id;
		$scope.name = user.name;
		$scope.email = user.email;
		$scope.phone = user.phone;
	}

	$scope.editUser = function(){
		var id = $scope.id;
		var record = $scope.usersdata.$getRecord(id);
		record.name = $scope.name;
		record.email = $scope.email;
		record.phone = $scope.phone;
		$scope.usersdata.$save(record)
		.then(function(ref){
			console.log(ref.key);
			$scope.userEditAlert = true;
			window.setTimeout(function() {
			    $scope.$apply(function(){
			    	$scope.userEditAlert = false;
			    })
			}, 3000);
		});
	}

});