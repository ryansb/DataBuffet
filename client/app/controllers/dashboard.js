DataBuffet.DashboardsController = Ember.Controller.extend({
	content: [],
	dashboard: {},
	loadDashboards: function loadDashboards() {
		var controller = this;
		controller.set('content', DataBuffet.Dashboard.findAll());
	}
});
DataBuffet.DashboardController = Ember.Controller.extend({
	renderCharts: function renderCharts() {
		$.each(DataBuffet.router.get('dashboardController.content.charts'), function(index, elem) {
			elem.highchart.chart = {};
			elem.highchart.chart.renderTo = elem.id;
			elem.set('renderedChart', new Highcharts.Chart(elem.highchart));
			elem.connectChart();
		});
	}
});
DataBuffet.NewDashboardController = Ember.Controller.extend({
	charts: []
});
DataBuffet.EditDashboardController = Ember.Controller.extend({});