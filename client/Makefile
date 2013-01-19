compile: models controllers Makefile
	cat app/global.js app/controllers.js app/models.js app/views.js app/router.js > assets/js/app.js
	ember-precompile templates/* > assets/js/app.templates.js
	java -jar compiler.jar --js=assets/js/app.js --js_output_file=assets/js/app.min.js

controllers:
	cat app/controllers/* > app/controllers.js

models:
	cat app/models/* > app/models.js
