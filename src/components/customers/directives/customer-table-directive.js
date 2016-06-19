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
	    	scope.addForm = false;
	    	scope.editForm = false;
	    	scope.btnType = '';

    		scope.deleteMe = function(index) {
    			scope.deleteCustomer({index: index});
    		};

    		scope.toggleForm = function(type, index) {
    			if (type === 'add') {
    				scope.buttonText = 'Add Customer';
    				scope.btnType = 'add';
    				scope.addForm = !scope.addForm;

    				if (scope.editForm)
						scope.editForm = false;
    			} else {

    				if (index !== undefined) {
    					scope.buttonText = 'Save';
    					scope.btnType = 'edit';
    					scope.currentCustomer = index;
    					scope.editForm = !scope.editForm;
    					
    					if (scope.addForm)
							scope.addForm = false;
    				}
    			}
    		};

    		scope.submit = function(model, type) {    			
    			if (type === 'add') {
    				scope.addCustomerDetails({customer: model});
    				scope.addForm = false;
    			} else {
					// Edit
					scope.editForm = false;
    			}

    			scope.user = null;
    		};
	    }
  	};
});