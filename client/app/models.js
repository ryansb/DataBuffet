DataBuffet.Dashboard = Ember.Object.extend({
	init: function init() {
		this._super();
	}
});
DataBuffet.Dashboard.reopenClass({
	find: function find(id) {
		var dashboard = DataBuffet.Dashboard.create();
		dashboard.set('id', id);
		amplify.request('dashboard', {'id':id}, function(data) {
			dashboard.setProperties(data);
		});
		return dashboard;
	},
	findAll: function findAll() {

	}
});DataBuffet.User = Ember.Object.extend({
	init: function init() {
		this._super();
	}
});
DataBuffet.User.reopenClass({
	find: function find(id) {
		var user = DataBuffet.User.create();
		user.set('id', id);
		amplify.request('user', {'id':id}, function(data) {
			user.setProperties(data);
		});
		return user;
	},
	findAll: function findAll() {

	}
});DataBuffet.Chart = Ember.Object.extend({
	init: function init() {
		this._super();
	},
	connectChart: function connectChart() {
		var host = 'ws://www.trydatabuffet.com/chartdata?chart_id=' + document.chart_id;
		var first_round = true;
		var websocket = new WebSocket(host);

		websocket.onopen = function (evt) { };
		websocket.onmessage = function(evt) {
			p = $.parseJSON(evt.data)['chartPoints'];
			if (first_round) {
				for (i=1; i<p.length; i++) {
					chart.series[0].addPoint(p[i], false, false);
				}
				first_round = false;
			}
			$('#count').html("[" + p[p.length-1] + "]");
			chart.series[0].addPoint(p[p.length-1], true, true);
		};
		websocket.onerror = function (evt) { };
	}

});
DataBuffet.Chart.reopenClass({
	find: function find(id) {
		var chart = DataBuffet.Chart.create();
		chart.set('id', id);
		amplify.request('chart', {'id':id}, function(data) {
			chart.setProperties(data);
		});
		return chart;
	},
	findAll: function findAll() {

	}
});