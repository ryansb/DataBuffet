DataBuffet = Ember.Application.create({
	version: "0.0.1"
});

$.ajaxSetup({
	statusCode: {
		401: function() {
			DataBuffet.router.get('applicationController').connectOutlet('login');
		},
		403: function() {
			DataBuffet.router.get('applicationController').connectOutlet('login');
		}
	}
});

amplify.request.define('dashboards', 'ajax', {
	url: "http://trydatabuffet.com/dashboards",
	dataType: "json",
	type: "GET"
});

amplify.request.define('dashboard', 'ajax', {
	url: "http://trydatabuffet.com/dashboards/{id}",
	dataType: "json",
	type: "GET"
});

amplify.request.define('charts', 'ajax', {
	url: "http://trydatabuffet.com/charts",
	dataType: "json",
	type: "GET"
});

amplify.request.define('chart', 'ajax', {
	url: "http://trydatabuffet.com/charts/{id}",
	dataType: "json",
	type: "GET"
});