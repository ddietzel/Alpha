var app = app || {};

// A group (array) of Option models
app.OptionsCollection = Backbone.Collection.extend({

  // type of model that will be used in the collection
  model: app.costModel

});