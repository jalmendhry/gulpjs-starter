customersModule.directive('customerTable', function() {
	return {
	    restrict: 'E',
	    scope: {
	    	customerData: '=',
	    	deleteCustomer: '&',
	    	addCustomerDetails: '&'
	    },
	    templateUrl: 'customers.html',
	    link: function(scope) {
	    	scope.formOpen = false;

    		scope.deleteMe = function(index) {
    			scope.deleteCustomer({index: index});
    		};

    		scope.addCustomer = function() {
    			scope.formOpen = !scope.formOpen;
    		};

    		scope.submitAdd = function(model) {
    			scope.addCustomerDetails(model);
    			scope.user = null;
    		};
	    }
  	};
});