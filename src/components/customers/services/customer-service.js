customersModule.service('CustomerService', function() {

	var self = this;

	this.customerData = [
		{
			'firstname': 'Joe',
			'surname': 'Al-Mendhry',
			'location': 'UK'
		},
		{
			'firstname': 'Alan',
			'surname': 'Tate',
			'location': 'France'
		}
	];

	this.deleteCustomer = function(index) {
		self.customerData.splice(index, 1);
	};

	this.addCustomer = function(customer) {
		self.customerData.push(customer);
	};

	this.getCustomerData = function() {
		return self.customerData;
	};
});