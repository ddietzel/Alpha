var app = app || {};

app.costStructure = Backbone.Model.extend({

	// Just some blank values as default
  defaults: {
  	currency: "",
  	base_price: 0,
  	inspect_prep_price: 0,
  	personal_delivery_price: 0
  }

});