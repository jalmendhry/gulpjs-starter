customersModule.controller('customerCtrl', function(CustomerService) {
	this.customerData = CustomerService.getCustomerData();

	this.deleteCustomer = function(customer) {
		CustomerService.deleteCustomer(customer);
	};

	this.addCustomerDetails = function(model) {
		CustomerService.addCustomer(model);
	};
});