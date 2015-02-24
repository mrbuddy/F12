var myapp = angular.module("myapp",['ngRoute'])	;

myapp.run(function($rootScope){
$rootScope.testdata = "Root - Data from angular";
});

//hello
myapp.config(["$routeProvider", function($routeProvider){
	$routeProvider
	.when('/:id',{
		templateUrl : "profile.html",
		controller : "myappCtrl"
	});
}
]);

myapp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function(){
                scope.$apply(function(){
					if (element[0].files[0]) {
						console.log("goes here");
						var reader = new FileReader();
						reader.onload = imageIsLoaded;
						reader.readAsDataURL(element[0].files[0]);
            		}
                    //modelSetter(scope, element[0].files[0]);
                    //console.log(element[0].files[0]);
                    //$scope.file = element[0].files[0];
                	//console.log($scope.file);
                });
                
            });
        }
    };
}]);

function imageIsLoaded(e) {
    angular.element(document.querySelector('#myImg')).attr('src', e.target.result);
    //$('#myImg').attr('background-image', e.target.result);
};

myapp.controller("myappCtrl",["$scope",'$http',
	function($scope,$http)
	{
		 $http.get('/myposts').then(function(res){
		 	$scope.posts = res.data;
		 });
		console.log($scope.posts);
		$scope.testdata = "Data from Angular JS";
		$scope.profileid = "M56";
		// var file = $scope.myFile;
		// console.log(file);
		// if(file !== undefined){
		// 	console.log('file is ' + JSON.stringify(file.name));	
		// 	$scope.filename = JSON.stringify(file.name);
		// }
       	
       	
	}
]);	

