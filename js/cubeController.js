var cubeApp = angular.module('cubeApp', []);
cubeApp.controller('CubeAppController',['$scope',function($scope) {
	$scope.init = function(){
		$scope.size = null; //size of the wood received from user
		$scope.width = null;//width of the wood received from user
		$scope.height = null;//height of the wood received from user
		$scope.length = 0; // calculated value based on given user input(inside calculate length)
		$scope.verticalType = "Type1";
		$scope.horizontalType = "Type1";
		$scope.volume = 0;
		$scope.defaultMetric = null;
		$scope.metric = null;
		$scope.shape = 'cube';
		$scope.cut_details = "";
		$scope.shape = 'cube';
		$scope.assemblyTypes = [];
		$scope.selectedAssembly = "Ease of assembly";
		$scope.img1 = "images/eoa/eoa-top.png";
	    $scope.img2 = "images/eoa/eoa-side.png";
	    $scope.img3 = "images/eoa/eoa-final.png";
	    var types = ["Ease of assembly","Ease of manufacture","Symmetry"];
		$scope.assemblyTypes = types;
		$scope.templates = [
			{ name: 'cube-eoa.html', url: 'templates/cube-eoa.html'},
			{ name: 'cube-eom.html', url: 'templates/cube-eom.html'},
			{ name: 'cube-symmetry.html', url: 'templates/cube-symmetry.html'},
			{ name: 'tripy-def.html', url: 'templates/tripy-def.html'},
			{ name: 'recpy-def.html', url: 'templates/recpy-def.html'}
		];
		$scope.template = $scope.templates[0];
	};

	$scope.assemblyTypeSelected = function(type) {
		$scope.selectedAssembly = type;
		if($scope.selectedAssembly === "Ease of assembly")
	    {
	    	$scope.img1 = "images/eoa/eoa-top.png";
	    	$scope.img2 = "images/eoa/eoa-side.png";
	    	$scope.img3 = "images/eoa/eoa-final.png";
	    	$scope.template = $scope.templates[0];
	    }
	    else if($scope.selectedAssembly === "Ease of manufacture")
	    {
	    	$scope.img1 = "images/eom/eom-top.png";
	    	$scope.img2 = "images/eom/eom-side.png";
	    	$scope.img3 = "images/eom/eom-final.png";
	    	$scope.template = $scope.templates[1];
	    }
	    else if($scope.selectedAssembly === "Symmetry")
	    {
	    	$scope.img1 = "images/eos/eos-top.png";
	    	$scope.img2 = "images/eos/eos-side.png";
	    	$scope.img3 = "images/eos/eos-final.png";
	    	$scope.template = $scope.templates[2];
	    }
		else if ($scope.shape === "triangular-pyramid") {
			$scope.img1 = "images/pyramid/top.png";
			$scope.img2 = "images/pyramid/side.png";
			$scope.img3 = "images/pyramid/final.png";
			$scope.template = $scope.templates[3];	
		}
		else if ($scope.shape === "rectangular-pyramid") {
			$scope.img1 = "images/tetrahedron/top.png";
	    	$scope.img2 = "images/tetrahedron/side.png";
	    	$scope.img3 = "images/tetrahedron/final.png";
	    	$scope.template = $scope.templates[4];
		}
	}

	$scope.reset = function() {
		$scope.notReset = false;
		$scope.init();
		$("#renderCube").addClass("hidden");
		$(".disclaimer").addClass("hidden");
		$(".thumbnail").addClass("hidden");
		$(".btn-group > .btn").removeClass("active");
	};

	 $scope.updateShape = function(shapeInput){
    	
    	$scope.shape = shapeInput;

    	if ($scope.shape === "cube") {
		    $scope.selectedAssembly = "Ease of assembly";
			var types = ["Ease of assembly","Ease of manufacture","Symmetry"];
			$scope.assemblyTypes = types;
			$scope.img1 = "images/eoa/eoa-top.png";
	    	$scope.img2 = "images/eoa/eoa-side.png";
	    	$scope.img3 = "images/eoa/eoa-final.png";
	    	$scope.template = $scope.templates[0];
		}
		else if ($scope.shape === "triangular-pyramid") {
			$scope.selectedAssembly = "Default";
			var types = ["Default"];
			$scope.assemblyTypes = types;
			$scope.img1 = "images/tetrahedron/top.png";
	    	$scope.img2 = "images/tetrahedron/side.png";
	    	$scope.img3 = "images/tetrahedron/final.png";
	    	$scope.template = $scope.templates[3];
		}
    	else if ($scope.shape === "rectangular-pyramid") {
			$scope.selectedAssembly = "Default";
			var types = ["Default"];
			$scope.assemblyTypes = types;
			$scope.img1 = "images/pyramid/top.png";
	    	$scope.img2 = "images/pyramid/side.png";
	    	$scope.img3 = "images/pyramid/final.png";
	    	$scope.template = $scope.templates[4];
		}
		$scope.size && $scope.width && $scope.height && $scope.metric && $scope.submit();
    };

    $scope.calculateLength = function() {
		if ($scope.shape === "cube") {
			$scope.length = ($scope.size/12).toPrecision(4);
			$scope.volume = Math.pow($scope.length, 3).toPrecision(4);
		}
		else if ($scope.shape === "triangular-pyramid") {
			$scope.length = ($scope.size/6).toPrecision(4);
			$scope.volume = (Math.pow($scope.length, 3)/(Math.sqrt(2)*6)).toPrecision(4);
		}
    	else if ($scope.shape === "rectangular-pyramid") {
			$scope.length = ($scope.size/8).toPrecision(4);
			$scope.volume = (Math.pow($scope.length, 3)*Math.sqrt(2)/6).toPrecision(4);
			
		}
		
    	$scope.defaultLength = $scope.length;
    	
    	$scope.defaultMetric = $scope.metric;
    	$scope.notReset = true; // Keep track of reset
    },
    
    $scope.updateMetric = function(metricInput) {
    	$(".btn-group > .btn").click(function(){
    		$(".btn-group > .btn").removeClass("active");
    	    $(this).addClass("active");
    	});

		$scope.metric = metricInput;
		if($scope.metric !== $scope.defaultMetric) {
			if(metricInput === "in") {
				$scope.length = ($scope.defaultMetric === "yrd"? 
					$scope.defaultLength * 36.0 : $scope.defaultMetric === "cm"? 
					$scope.defaultLength * 0.3937 : $scope.defaultLength * 39.37);
				$scope.length = $scope.length.toPrecision(4);
				$scope.volume = Math.pow($scope.length, 3).toPrecision(4);
			
			} else if(metricInput === "yrd") {
				$scope.length = ($scope.defaultMetric === "in"? 
					$scope.defaultLength * 0.028 : $scope.defaultMetric === "cm"? 
					$scope.defaultLength * 0.011 : $scope.defaultLength * 1.09);
				$scope.length = $scope.length.toPrecision(4);
				$scope.volume = Math.pow($scope.length, 3).toPrecision(4);
			
			} else if(metricInput === "cm") {
				$scope.length = ($scope.defaultMetric === "in"? 
					$scope.defaultLength * 2.54 : $scope.defaultMetric === "yrd"? 
					$scope.defaultLength * 91.44 : $scope.defaultLength * 100);
				$scope.length = $scope.length.toPrecision(4);
				$scope.volume = Math.pow($scope.length, 3).toPrecision(4);
			
			} else if(metricInput === "m") {
				$scope.length = ($scope.defaultMetric === "in"? 
					$scope.defaultLength * 0.0254 : $scope.defaultMetric === "yrd"? 
					$scope.defaultLength * 0.9144 : $scope.defaultLength * 0.01);
				$scope.length = $scope.length.toPrecision(4);
				$scope.volume = Math.pow($scope.length, 3).toPrecision(4);
			}
		} else {
			$scope.length = $scope.defaultLength;
			$scope.volume = Math.pow($scope.length, 3).toPrecision(4);
		}

		return true;
    };

    $scope.displayAlert = function() {
		
    	$(".alerts").append('<div class="alert alert-warning alert-dismissible" role="alert">'+$scope.error+
    	  '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
    	 '</div>');
    	$(".alerts").removeClass("hidden");
    };

    $scope.submit = function(){
		if ($scope.size === null) {
			$scope.error = 'Length is NULL';
			$scope.displayAlert();
			return;
		}
    	else if(isNaN($scope.size)){				
			$scope.error = 'Length should be a positive number';
			$scope.displayAlert();
			return;
		}

    	else if($scope.size <= 0) {
			$scope.error = 'Enter a length greater than zero';
			$scope.displayAlert();
			return;
		}

		if ($scope.width === null) {
			$scope.error = 'Width is NULL';
			$scope.displayAlert();
			return;
		}
    	else if(isNaN($scope.width)){				
			$scope.error = 'Width should be a positive number';
			$scope.displayAlert();
			return;
		}

    	else if($scope.width <= 0){
			$scope.error = 'Enter a Width greater than zero';
			$scope.displayAlert();
			return;
		}

		if ($scope.height === null) {
			$scope.error = 'Height is NULL';
			$scope.displayAlert();
			return;
		}
    	else if(isNaN($scope.height)){				
			$scope.error = 'Height should be a positive number';
			$scope.displayAlert();
			return;
		}

    	else if($scope.height <= 0){
			
			$scope.error = 'Enter a Height greater than zero';
			$scope.displayAlert();
			return;
		}
		$scope.changeShape();
    };

    $scope.changeShape = function() {
    	if($scope.shape === "cube"){
    		$scope.calculateLength();

    		$("#renderCube").removeClass("hidden");
    		$(".disclaimer").removeClass("hidden");
    		$(".thumbnail").removeClass("hidden");
    		if($scope.selectedAssembly === "Ease of assembly")
    		{
    			$scope.template = $scope.templates[0];
    		}
    		else if($scope.selectedAssembly === "Ease of manufacture")
    		{
    			$scope.template = $scope.templates[1];
    		}
    		else if($scope.selectedAssembly === "Symmetry")
    		{
    			$scope.template = $scope.templates[2];
    		}

    		renderCube(120);

    	} else if($scope.shape === "triangular-pyramid"){
    		$scope.calculateLength();
    		$("#renderCube").removeClass("hidden");
    		$(".disclaimer").removeClass("hidden");
    		$(".thumbnail").removeClass("hidden");
    		$scope.template = $scope.templates[3];
    		renderPyramid(100,100,3);

    	} else if($scope.shape === "rectangular-pyramid"){
    		$scope.calculateLength();
    		$("#renderCube").removeClass("hidden");
    		$(".disclaimer").removeClass("hidden");
    		$(".thumbnail").removeClass("hidden");
    		$scope.template = $scope.templates[4];
    		renderPyramid(100,100,4);
    	}
	};

  //   $scope.cubeScale = function() {
  //   	var from = [0, 2000];
  //   	var to = [50, 140];
  //   	if($scope.defaultLength > 2000) return 2000;
		// return to[0] + ($scope.defaultLength - from[0]) * (to[1] - to[0]) / (from[1] - from[0]);
  //   };

    $scope.init();
  }]);