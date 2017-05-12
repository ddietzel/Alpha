var app = app || {};
app.allOptionsView = Backbone.View.extend({

  tagName: "section",

  initialize: function(options){
    this.costStructure = options.costStructure;
  },

  render: function() {
 	  this.collection.each(this.addOption, this);
    this.addTotal();
    this.addToggle();
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
      this.costStructure.get("personal_delivery_price");
  		var formattedPrice = this.costStructure.get("currency") + option.get("price");;
  		option.set({"formattedPrice": formattedPrice});
  	}
  },
  
  addTotal: function(){
    var totalCost = 0;
    this.collection.each(function(option){
      totalCost += option.get("list_price");  
    }, this);
    
    // Add the cost structure values
    totalCost += this.costStructure.get("base_price");
    totalCost += this.costStructure.get("inspect_prep_price");
    totalCost += this.costStructure.get("personal_delivery_price");
    
    var currency = this.costStructure.get("currency");   
    
    // TODO: come up with more elegant constructor (is it worth it for one element?)
    this.$el.append('<div class="bottomPanel"><div class="panelItem">Total: '+currency+totalCost+'</div></div>');
  },

  addToggle: function(){ 
    // TODO: come up with more elegant constructor
    this.$el.find(".bottomPanel").append('<a href="#noprice"><div class="panelItem" id="togglePrice">Toggle Prices</div></a>');
  },

  events: {
      "click #togglePrice" : "togglePrice"
  },

  togglePrice: function() {
    this.$el.toggleClass("hidePrices");
  }

});