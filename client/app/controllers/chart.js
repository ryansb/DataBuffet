DataBuffet.ChartController = Ember.Controller.extend({});
DataBuffet.ChartsController = Ember.Controller.extend({
	loadCharts: function loadCharts() {
		var controller = this;
		controller.set('content', DataBuffet.Chart.findAll());
	}
});
DataBuffet.NewChartController = Ember.Controller.extend({
	line: true,
	bar: false,
	pie: false
});
DataBuffet.EditChartController = Ember.Controller.extend({});
DataBuffet.NewLineChartController = Ember.Controller.extend({});
DataBuffet.NewPieChartController = Ember.Controller.extend({});
DataBuffet.NewBarChartController = Ember.Controller.extend({});
