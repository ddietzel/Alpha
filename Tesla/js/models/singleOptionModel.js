// Namespace our app
var app = app || {};

app.singleOption = Backbone.Model.extend({

	// These could be blank but just in case some default values
  defaults: {
  	name: "",
  	description: "",
  	list_price: 0,
    no_ui: "false",
    price: 0,
    price_indicator: ""
  }
  
});