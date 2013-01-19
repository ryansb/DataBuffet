DataBuffet.User = Ember.Object.extend({
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
});