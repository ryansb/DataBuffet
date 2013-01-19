DataBuffet.ApplicationView = Ember.View.extend({
	template: Ember["TEMPLATES"]["application"]
});
DataBuffet.MainView = Ember.View.extend({
	template: Ember["TEMPLATES"]["main"]
});
DataBuffet.DashboardView = Ember.View.extend({
	template: Ember["TEMPLATES"]["dashboard"],
	didInsertElement: function didInsertElement() {
		setTimeout(function () {
			DataBuffet.router.get('dashboardController').renderCharts();
		}, 1000);
	}
});
DataBuffet.NewDashboardView = Ember.View.extend({
	template: Ember["TEMPLATES"]["newDashboard"]
});
DataBuffet.EditDashboardView = Ember.View.extend({
	template: Ember["TEMPLATES"]["editDashboard"]
});
DataBuffet.DashboardsView = Ember.View.extend({
	template: Ember["TEMPLATES"]["dashboards"]
});
DataBuffet.ChartView = Ember.View.extend({
	template: Ember["TEMPLATES"]["chart"]
});
DataBuffet.SelectedChartView = Ember.View.extend({
	template: Ember["TEMPLATES"]["selectedChart"]
});
DataBuffet.ChartsView = Ember.View.extend({
	template: Ember["TEMPLATES"]["charts"]
});
DataBuffet.NewChartView = Ember.View.extend({
	template: Ember["TEMPLATES"]["newChart"],
	didInsertElement: function didInsertElement() {
		$(".chart-type-select").change(function() {
			var chart_type = $(".chart-type-select").val() + "Form";
			DataBuffet.router.get('newChartController').connectOutlet("chartcreate", chart_type);
		});
		var data_points = $('.data-points').size();
		$('#add-data-point').click(function() {
			$('<input type="text" class="data-point" name="datapoints[]" />').fadeIn('slow').appendTo('.data-points');
			data_points++;
		});
		$('#remove-data-point').click(function() {
		if(data_points > 1) {
			$('.data-point:last').remove();
			data_points--;
		}
		});
		var column_names = $('.column-inputs').size();
		$('#add-column').click(function() {
			$('<input type="text" class="column-input" name="columns[]" />').fadeIn('slow').appendTo('.column-inputs');
			column_names++;
		});
		$('#remove-column').click(function() {
		if(column_names > 1) {
			$('.column-input:last').remove();
			column_names--;
		}
		});
	}
});
DataBuffet.EditChartView = Ember.View.extend({
	template: Ember["TEMPLATES"]["editChart"]
});
DataBuffet.UserView = Ember.View.extend({
	template: Ember["TEMPLATES"]["user"]
});
DataBuffet.LoginView = Ember.View.extend({
	template: Ember["TEMPLATES"]["login"]
});
DataBuffet.SignupView = Ember.View.extend({
	template: Ember["TEMPLATES"]["signup"]
});
DataBuffet.BarFormView = Ember.View.extend({
	template: Ember["TEMPLATES"]["barForm"],
	didInsertElement: function didInsertElement() {
		var chart = new Highcharts.Chart({
		chart: {
			renderTo: 'example-chart',
			type: 'bar'
		},
		title: {
			text: 'Fruit Consumption'
		},
		xAxis: {
			categories: ['Apples', 'Bananas', 'Oranges']
		},
		yAxis: {
			title: {
				text: 'Fruit eaten'
			}
		},
		series: [{
				name: 'Jane',
				data: [1, 0, 4]
			}, {
				name: 'John',
				data: [5, 7, 3]
			}]
		});
		$("input[name=title]").change(function() {
			chart.title = $('input[name=title]').val();
			chart.redraw();
		});
	}
});
DataBuffet.LineFormView = Ember.View.extend({
	template: Ember["TEMPLATES"]["lineForm"],
	didInsertElement: function didInsertElement() {
		var chart = new Highcharts.Chart({
			chart: {
				renderTo: 'example-chart',
				type: 'line',
				marginRight: 130,
				marginBottom: 25
			},
			title: {
				text: 'Monthly Average Temperature',
				x: -20 //center
			},
			subtitle: {
				text: 'Source: WorldClimate.com',
				x: -20
			},
			xAxis: {
				categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
					'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
			},
			yAxis: {
				title: {
					text: 'Temperature (°C)'
				},
				plotLines: [{
					value: 0,
					width: 1,
					color: '#808080'
				}]
			},
			tooltip: {
				formatter: function() {
						return '<b>'+ this.series.name +'</b><br/>'+
						this.x +': '+ this.y +'°C';
				}
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'top',
				x: -10,
				y: 100,
				borderWidth: 0
			},
			series: [{
				name: 'Tokyo',
				data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
			}, {
				name: 'New York',
				data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
			}, {
				name: 'Berlin',
				data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
			}, {
				name: 'London',
				data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
			}]
		});
		$("input[name=title]").change(function() {
			chart.title = $('input[name=title]').val();
			chart.redraw();
		});
	}
});
DataBuffet.PieFormView = Ember.View.extend({
	template: Ember["TEMPLATES"]["pieForm"],
	didInsertElement: function didInsertElement() {
		var chart = new Highcharts.Chart({
			chart: {
				renderTo: 'example-chart',
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false
			},
			title: {
				text: 'Browser market shares at a specific website, 2010'
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage}%</b>',
				percentageDecimals: 1
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						color: '#000000',
						connectorColor: '#000000',
						formatter: function() {
							return '<b>'+ this.point.name +'</b>: '+ this.percentage +' %';
						}
					}
				}
			},
			series: [{
				type: 'pie',
				name: 'Browser share',
				data: [
					['Firefox',   45.0],
					['IE',       26.8],
					{
						name: 'Chrome',
						y: 12.8,
						sliced: true,
						selected: true
					},
					['Safari',    8.5],
					['Opera',     6.2],
					['Others',   0.7]
				]
			}]
		});
		$("input[name=title]").change(function() {
			chart.title = $('input[name=title]').val();
			chart.redraw();
		});
	}
});