DataBuffet.Router = Ember.Router.extend({
	enableLogging: true,
	root: Ember.Route.extend({
		index: Ember.Route.extend({
			route: '/',
			connectOutlets: function connectOutlets(router, context) {
				router.get('applicationController').connectOutlet('main');
			},
			goToSignup: function goToSignup(router, context) {
				router.transitionTo('root.signup');
			},
			goToLogin: function goToLogin(router, context) {
				router.transitionTo('root.login');
			}
		}),
		login: Ember.Route.extend({
			route: '/login',
			connectOutlets: function connectOutlets(router, context) {
				router.get('applicationController').connectOutlet('login');
			}
		}),
		signup: Ember.Route.extend({
			route: '/signup',
			connectOutlets: function connectOutlets(router, context) {
				router.get('applicationController').connectOutlet('signup');
			},
			createUser: function createUser(router, context) {
				router.get('signupController').createUser();
			}
		}),
		dashboards: Ember.Route.extend({
			route: '/dashboards',
			index: Ember.Route.extend({
				route: '/',
				connectOutlets: function connectOutlets(router, context) {
					router.get('dashboardsController').loadDashboards();
					router.get('applicationController').connectOutlet('dashboards');
				},
				viewDashboard: function viewDashboard(router, context) {
					var dashboard = context.context;
					router.transitionTo('root.dashboards.id', dashboard);
				},
				createDashboard: function createDashboard(router, context) {
					router.transitionTo('root.dashboards.create');
				}
			}),
			create: Ember.Route.extend({
				route: '/create',
				connectOutlets: function connectOutlets(router, context) {
					router.get('applicationController').connectOutlet('newDashboard');
					router.get('newDashboardController').connectOutlet('mycharts', 'charts');
					router.get('newDashboardController').set('content', DataBuffet.Dashboard.create());
					router.get('chartsController').loadCharts();
				},
				createChart: function createLineChart(router, context) {
					router.transitionTo('root.chart.create');
				},
				addChart: function addChart(router, context) {
					var chart = context.context;
					router.get('newDashboardController').get('charts').pushObject(chart);
				},
				saveDashboard: function saveDashboard(router, context) {
					var chart_ids = [];
					$.each(router.get('newDashboardController').get('charts'), function(index, elem) {
						chart_ids.pushObject(elem.id);
					});
					var name = $('#dashboard-name').val();
					router.get('newDashboardController').set('charts',[]);
					DataBuffet.Dashboard.post({"charts":chart_ids, "name":name}, function () {
						router.transitionTo('root.dashboards.index');
					});
				}
			}),
			id: Ember.Route.extend({
				route: '/id/:dashboard_id',
				connectOutlets: function connectOutlets(router, context) {
					console.log(context);
					router.get('applicationController').connectOutlet('dashboard', context);
				}
			})
		}),
		chart: Ember.Route.extend({
			route: '/charts',
			index: Ember.Route.extend({
				route: '/',
				connectOutlets: function connectOutlets(router, context) {
					router.get('chartsController').loadCharts();
					router.get('applicationController').connectOutlet('charts');
				}
			}),
			create: Ember.Route.extend({
				route: '/create',
				connectOutlets: function connectOutlets(router, context) {
					router.get('applicationController').connectOutlet('newChart');
					router.get('newChartController').connectOutlet('chartcreate','lineForm');
				},
				saveChart: function saveChartToDashboard(router, context) {
					console.log(context);
					var chart_settings = {};
					var inputs = $('#newChartForm :input');
					$(inputs).each(function() {
						if (this.name === "title") {
							chart_settings["title"] = {"text":$(this).val()};
						}
						else if (this.name === "subtitle") {
							chart_settings["subtitle"] = {"text":$(this).val()};
						}
						else if (this.name === "type") {
							chart_settings["chart"] = {"type":$(this).val()};
						}
						else {
							chart_settings[this.name] = $(this).val();
						}
					});
					chart_settings["xAxis"] = {"type":"linear"};
					chart_settings["series"] = [];
					var data = {"data":[], "name":$("#x-axis").val()};
					$.each($('.data-point'), function() {
						data["data"].push(parseInt($(this).val(), 10));
					});
					chart_settings["series"].pushObject(data);
					// chart_settings["groups"] = [];
					// $.each($('.groups-input'), function() {
					// 	chart_settings["groups"].push($(this).val());
					// });

					var chart = DataBuffet.Chart.post(chart_settings, function(){
						console.log(chart);
					});
				}
			}),
			id: Ember.Route.extend({
				route: '/id/:chart_id',
				connectOutlets: function connectOutlets(router, context) {
					console.log(context);
					router.get('applicationController').connectOutlet('chart', context);
				}
			})
		}),
		account: Ember.Route.extend({
			route: '/account',
			connectOutlets: function connectOutlets(router, context) {
				router.get('applicationController').connectOutlet('user');
			}
		})
	})
});