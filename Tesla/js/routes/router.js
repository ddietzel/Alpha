var app = app || {};

app.Router = Backbone.Router.extend({

	routes :{
		"breakdown": "showBreakdown",
		"noprices": "hidePrices",
	},

	// TODO: create routes for multiple selections at once
	// Deactivated for now

	showBreakdown: function() {
	  //$("#allOptions").addClass("showBreakdown");
	},

	hidePrices: function() {
	  //$("#allOptions").addClass("hidePrices");
	},

});


