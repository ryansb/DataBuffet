DataBuffet.LoginController = Ember.Controller.extend({
	loginUser: function loginUser() {
		var email = $("#email-entry").val();
		var password = $("#password-entry").val();
		$.ajax({
			type: "POST",
			url: "http://trydatabuffet.com/sessions",
			data: {
				"username":email,
				"password":password
			},
			success: function success(response) {
				DataBuffet.router.transitionTo('root.dashboards.index');
			},
			error: function error(response) {
				console.log(response);
			}
		});
	}
});
DataBuffet.SignupController = Ember.Controller.extend({
	createUser: function createUser() {
		var email = $("#email-entry").val();
		var password = $("#password-entry").val();
		$.ajax({
			type: "POST",
			url: "http://trydatabuffet.com/users",
			data: {
				"username":email,
				"password":password
			},
			success: function success(response) {
				DataBuffet.router.transitionTo('root.dashboards.index');
			},
			error: function error(response) {
				console.log(error);
			}
		});
	}
});
DataBuffet.UserController = Ember.Controller.extend();