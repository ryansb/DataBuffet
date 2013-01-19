Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
helpers = helpers || Ember.Handlebars.helpers;
  var buffer = '', stack1, stack2, stack3, foundHelper, tmp1, self=this, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"hero-unit\">\n	<h1>DataBuffet.io</h1>\n	<p>\n		All the data you can eat, all on one plate.\n	</p>\n	<p>\n		<a class=\"btn btn-primary btn-large\">\n			Sign In\n		</a>\n	</p>\n</div>\n");
  stack1 = depth0;
  stack2 = "outlet";
  stack3 = helpers._triageMustache;
  tmp1 = {};
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  data.buffer.push(escapeExpression(stack1));
  return buffer;
});
Ember.TEMPLATES["login"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
helpers = helpers || Ember.Handlebars.helpers;
  var buffer = '', stack1, stack2, stack3, stack4, foundHelper, tmp1, self=this, escapeExpression=this.escapeExpression;


  data.buffer.push("<div>\n	<form ");
  stack1 = depth0;
  stack2 = "login";
  stack3 = {};
  stack4 = "submit";
  stack3['on'] = stack4;
  stack4 = helpers.action;
  tmp1 = {};
  tmp1.hash = stack3;
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  stack1 = stack4.call(depth0, stack2, tmp1);
  data.buffer.push(escapeExpression(stack1) + ">\n		<fieldset>\n			<legend>\n				Sign in to DataBuffet.io\n			</legend>\n			<input type=\"email\" required=\"required\" placeholder=\"Email address\">\n			<input type=\"password\" required=\"required\" placeholder=\"Password\">\n			<a href=\"#\" ");
  stack1 = depth0;
  stack2 = "forgotPassword";
  stack3 = helpers.action;
  tmp1 = {};
  tmp1.hash = {};
  tmp1.contexts = [];
  tmp1.contexts.push(stack1);
  tmp1.data = data;
  stack1 = stack3.call(depth0, stack2, tmp1);
  data.buffer.push(escapeExpression(stack1) + ">\n				<span class=\"help-block\">Forgot my password...</span>\n			</a>\n			<button class=\"btn\" type=\"submit\">Sign in</button>\n		</fieldset>\n	</form>\n</div>");
  return buffer;
});
