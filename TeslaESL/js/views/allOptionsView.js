var app = app || {};
app.allOptionsView = Backbone.View.extend({

  tagName: "section",

  initialize: function(options){
    this.collection = options.collection;
    this.costStructure = options.costStructure;
  },

  render: function() {
    this.addToggles();
 	  this.collection.each(this.addOption, this);
 	  return this;
  },

  addOption: function(option) {
 		var isDefault = this.checkIsDefault(option);
 		var nonZeroPrice = this.nonZeroPrice(option);
 		var sendToUI = this.sendToUI(option);

 		// Weed out the ones not fit for UI. Checking for no UI vars
 		// and making sure it's either default or has a non zero price
 		// This will show all the choices being made vvvvv
 		// console.log(option.toJSON(), isDefault, nonZeroPrice, sendToUI);

 		if((isDefault || nonZeroPrice) && sendToUI) {
 			this.formatPrice(option);
  		var optionView = new app.singleOptionView ({ model: option });
 			this.$el.append(optionView.render().el);
 		} else {
 			//console.log(option.get("name") + " was removed from the list");
 		}
  },

  nonZeroPrice: function(option){
  	// Two checks: is it a number? And if so, is it greater than 0?
  	var price = option.get("price");
  	if(!isNaN(price) && price > 0){ return true; } else { return false; }
  },

  checkIsDefault: function(option){
  	// Check Default boolean
  	var isDefault = option.get("is_default") == true ? true : false;
  	return isDefault;
  },

  sendToUI: function(option){
  	// Check if it's meant to be sent to the UI
  	var sendToUI = option.get("no_ui") !== true ? true : false;
  	return sendToUI;
  },

  formatPrice: function(option){
  	// format the price depending on whether it's 0 or not
  	if(option.get("price") == 0){
  		option.set("formattedPrice", "-");
  	} else {
      var finalPrice = option.get("price") + this.costStructure.get("base_price") + this.costStructure.get("inspect_prep_price") + this.costStructure.get("personal_delivery_price");
  		var formattedPrice = this.costStructure.get("currency") + finalPrice;
  		option.set({"formattedPrice": formattedPrice});
  	}
    
    // Add the breakdown figures for rendering
    option.set({"base_price": this.costStructure.get("base_price")});
    option.set({"inspect_prep_price": this.costStructure.get("inspect_prep_price")});
    option.set({"personal_delivery_price": this.costStructure.get("personal_delivery_price")});
  },

  addToggles: function(){ 
    this.$el.append('<a href="#noprice"><div id="togglePrice">Toggle Prices</div></a>');
    this.$el.append('<a href="#breakdown"><div id="toggleBreakdown">Toggle Cost Breakdown</div></a>');
  },

  events: {
      "click": "toggleThisPanel",
      "click #togglePrice" : "togglePrice",
      "click #toggleBreakdown" : "toggleBreakdown"
  },

  togglePrice: function() {
    this.$el.toggleClass("hidePrices");
  },

  toggleBreakdown: function() {
    this.$el.toggleClass("showBreakdown");
  }

});