var app = app || {};

app.singleOptionView = Backbone.View.extend({

  tagName: "article",
  className: "optionListItem",

  // use template in the index.html, if it was bigger separate it
  template: _.template( $("#optionElement").html() ),

  render: function() {
    // put it in the template and return it to whoevers calling this render
    var optionTemplate = this.template(this.model.toJSON());
    this.$el.html(optionTemplate);
    return this;
  }

});