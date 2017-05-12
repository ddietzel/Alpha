var app = app || {};

app.CostCollection = Backbone.Collection.extend({

  // costs will be used as a collection when we're talking about more than US market
  model: app.costStructure

});