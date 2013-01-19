DataBuffet = Ember.Application.create({
	version: "0.0.1"
});

$.ajaxSetup({
	statusCode: {
		401: function() {
			DataBuffet.router.transitionTo('login');
		}
	}
});DataBuffet.ApplicationController = Ember.Controller.extend();DataBuffet.LoginController = Ember.Controller.extend();DataBuffet.Dashboard = Ember.Object.extend({
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
});DataBuffet.ApplicationView = Ember.View.extend({
	template: Ember["TEMPLATES"]["application"]
});
DataBuffet.DashboardView = Ember.View.extend({
	template: Ember["TEMPLATES"]["dashboard"]
});
DataBuffet.DashboardsView = Ember.View.extend({
	template: Ember["TEMPLATES"]["dashboards"]
});
DataBuffet.ChartView = Ember.View.extend({
	template: Ember["TEMPLATES"]["chart"]
});
DataBuffet.UserView = Ember.View.extend({
	template: Ember["TEMPLATES"]["user"]
});
DataBuffet.LoginView = Ember.View.extend({
	template: Ember["TEMPLATES"]["login"]
});DataBuffet.Router = Ember.Router.extend({
	enableLogging: true,
	root: Ember.Route.extend({
		index: Ember.Route.extend({
			route: '/'
		}),
		login: Ember.Route.extend({
			route: '/login',
			connectOutlets: function connectOutlets(router, context) {
				router.get('applicationController').connectOutlet('login');
			}
		}),
		dashboard: Ember.Route.extend({
			route: '/dashboard',
			index: Ember.Route.extend({
				route: '/',
				connectOutlets: function connectOutlets(router, context) {
					router.get('applicationController').connectOutlet('dashboards');
				}
			}),
			id: Ember.Route.extend({
				route: '/:dashboard_id',
				connectOutlets: function connectOutlets(router, context) {
					router.get('applicationController').connectOutlet('dashboard', context);
				}
			})
		}),
		account: Ember.Route.extend({
			route: '/account',
			connectOutlets: function connectOutlets(router, context) {
				router.get('applicationController').connectOutlet('account');
			}
		})
	})
});