DataBuffet.Dashboard = Ember.Object.extend({
	init: function init() {
		this._super();
		this.charts = [];
		this.name = "";
	},
	put: function put(callback) {
		var dashboard = this;
		$.ajax({
			"url":"http://trydatabuffet.com/dashboards/"+dashboard.id,
			"type":"PUT",
			"dataType":"json",
			"data":{
				"charts":JSON.stringify(dashboard.charts),
				"name":dashboard.name
			},
			success: function success(response) {
				if (callback) {
					callback(response);
				}
			}
		});
	}
});
DataBuffet.Dashboard.reopenClass({
	find: function find(id) {
		var dashboard = DataBuffet.Dashboard.create();
		dashboard.set('id', id);
		amplify.request('dashboard', {'id':id}, function(data) {
			dashboard.setProperties(data);
			var charts = [];
			$.each(dashboard.charts, function(index, elem) {
				var chart = DataBuffet.Chart.find(elem);
				charts.pushObject(chart);
			});
			dashboard.set('charts', charts);
		});
		return dashboard;
	},
	findAll: function findAll() {
		var dashboards = [];
		amplify.request('dashboards', function(data) {
			console.log(data);
			$.each(data.dashboards, function(index, elem) {
				var dashboard = DataBuffet.Dashboard.create(elem);
				dashboard.setProperties(elem);
				console.log(elem);
				var charts = [];
				$.each(dashboard.charts, function(index, elem) {
					var chart = DataBuffet.Chart.find(elem);
					charts.pushObject(chart);
				});
				dashboard.set('charts', charts);
				dashboards.pushObject(dashboard);
			});
		});
		return dashboards;
	},
	post: function post(params) {
		var dashboard = DataBuffet.Dashboard.create();
		$.ajax({
			"url":"http://trydatabuffet.com/dashboards",
			"type":"POST",
			"dataType":"json",
			"data":{
				"charts":JSON.stringify(params.charts),
				"name":params.name
			},
			success: function success(response) {
				dashboard.setProperties(response);
				if (callback) {
					callback(response);
				}
			}
		});
		return dashboard;
	}
});