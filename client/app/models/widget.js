DataBuffet.Chart = Ember.Object.extend({
	init: function init() {
		this._super();
		this.connected = false;
	},
	put: function put(callback) {
		var chart = this;
		$.ajax({
			"url":"http://trydatabuffet.com/charts/"+chart.id,
			"type":"PUT",
			"dataType":"json",
			"data": {
				"highchart": JSON.stringify(chart.highchart)
			},
			success: function success(response) {
				if (callback) {
					callback(response);
				}
			},
			error: function error(response) {
				console.log(response);
			}
		});
	},
	connectChart: function connectChart() {
		var chart = this;
		if (!chart.connected) {
			var host = 'ws://trydatabuffet.com:8000/chartdata?chart_id=' + chart.id;
			console.log(host);
			var websocket = new WebSocket(host);
			chart.set('connected', true);
			websocket.onopen = function (evt) {
				console.log(evt);
			};
			websocket.onmessage = function(evt) {
				var updated_chart = $.parseJSON(evt.data);
				console.log(updated_chart);
				updated_chart = JSON.parse(updated_chart.highchart);
				if (updated_chart["chart"]) {
					updated_chart["chart"]["renderTo"] = chart.id;
				} else {
					updated_chart["chart"] = {"renderTo": chart.id};
				}
				console.log(updated_chart);
				chart.renderedChart.destroy();
				chart.set('highchart', updated_chart);
				chart.set('renderedChart', new Highcharts.Chart(updated_chart));
			};
			websocket.onerror = function (evt) {
				console.log(evt);
			};
		}
	}
});
DataBuffet.Chart.reopenClass({
	find: function find(id) {
		var chart = DataBuffet.Chart.create();
		chart.set('id', id);
		amplify.request('chart', {'id':id}, function(data) {
			chart.set('highchart', JSON.parse(data['highchart']));
		});
		return chart;
	},
	findAll: function findAll() {
		var charts = [];
		amplify.request('charts', function(data) {
			$.each(data.charts, function(index, elem) {
				var chart = DataBuffet.Chart.create(elem);
				chart.set('highchart', JSON.parse(elem['highchart']));
				charts.pushObject(chart);
			});
		});
		return charts;
	},
	post: function post(params, callback) {
		var chart = DataBuffet.Chart.create();
		$.ajax({
			"url":"http://trydatabuffet.com/charts",
			"type":"POST",
			"dataType":"json",
			"data": {
				"highchart": JSON.stringify(params)
			},
			success: function success(data) {
				chart.id = data.id;
				console.log(chart.id);
				callback();
			},
			error: function error(response) {
				console.log(response);
			}
		});
		return chart;
	}
});