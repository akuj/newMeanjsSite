var moduuli = angular.module('moduuli', []);

function mainController($scope, $http) {
    $scope.formData = {};
	
	$scope.user = "";
	$scope.password = "";
	
	$scope.accessdenied = 3;
	
    // when landing on the page, get all todos and show them
    $http.get('/api/topics')
        .success(function(data) {
            $scope.topics = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTopic = function() {
        $http.post('/api/topics', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.topics = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTopic = function(id) {
        $http.delete('/api/topics/' + id)
            .success(function(data) {
                $scope.topics = data;
                console.log(data);
				
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
	
	
	$scope.logOut = function() {  
		$scope.loggedin = false;
		$scope.accessdenied = 2;
		$scope.user = "";
		$scope.password = "";
	
};


	$scope.logIn = function() {  
	
		if ($scope.user === "kuma" & $scope.password === "bear") {
			$scope.loggedin = true;
			$scope.accessdenied = 0;
		}
		
		else {
			$scope.accessdenied = 1;
		}
};


	
	
}