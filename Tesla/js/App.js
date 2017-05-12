var optionsCollection = new app.OptionsCollection();
var costStructure = new app.costStructure();

// Set up the comparator for sorting options later
optionsCollection.comparator = function(model) {
    // Negative, because were doing high to low
    return -model.get('list_price');
}

// TODO: Ajax stuff probably needs to be moved to its own model
$.ajax({
  url: "js/JSON/options_20140310.js",
    dataType: 'json',
    async: 'false',
    success: function(response) {
      parseOptionsJSON(response);
    },
  	error: function() {
  		// hotfix for most common scenario
  		$("#allOptions").append("Ajax needs a web server to work, otherwise we'll get cross domain problems.");
		}
});

function parseOptionsJSON(OptionsJSON){

    // First extract the meta information like cost, model, etc
    costStructure.set({
          market: OptionsJSON.market,
          modes: OptionsJSON.model_name,
          currency: OptionsJSON.currency_code,
          base_price: OptionsJSON.base_price,
          inspect_prep_price: OptionsJSON.inspect_prep_price,
          personal_delivery_price: OptionsJSON.personal_delivery_price
    });

    //console.log(costStructure);

    // cycle through the JSON and create options to put into a collection
    for (var key in OptionsJSON) {
      if (OptionsJSON.hasOwnProperty(key) && key == "options") {
        var allOptions = OptionsJSON[key];
        for (var option in allOptions){
          // Cycle through option and create new option using singleOption model
          var thisOption = allOptions[option];
          var newOption = new app.singleOption({
            id: option,
            name: thisOption.name,
            description: thisOption.description,
            list_price: thisOption.list_price,
            no_ui: thisOption.no_ui,
            price: thisOption.price,
            price_indicator: thisOption.price_indicator,
            link: option
          });
          // Once finished add this to the options collection
          optionsCollection.add(newOption);
        }
      }
    }
  // this is here because otherwise the ASYNC makes it render before its done
  // TODO: probably should make this a callback function
  addOptionPrices();
}

function addOptionPrices(){
  $.ajax({
    url: "js/JSON/option_prices_20140310.js",
      dataType: 'json',
      async: 'false',
      success: function(response) {
        updateCostStructure(response);
      },
    	error: function(jqXHR, textStatus, errorThrown) {
	  		alert(textStatus, errorThrown);
			}
  });
}

function updateCostStructure(PricesJSON){
  // There was a change in price in the JSON file, so this one cross references
  // and overwrites any existing entries it can find.
  for (var attr in PricesJSON){
    var checkForExistingValues = costStructure.get(attr);
    if(checkForExistingValues !== undefined){
      costStructure.set(attr, PricesJSON[attr]);
    }
  }
  // TODO: make view render even if Async functions. This one function after
  // another causes too much spaghetti
  parseOptionPrices(PricesJSON);
}

function parseOptionPrices(PricesJSON){
  var allOptions = PricesJSON.options;
  for (var option in allOptions){
    // Find corresponding option in the collection
    var findOption = optionsCollection.get(option);
    // This ain't PHP brohammer. If we get an undefined it's Game Over. So check for it.
    if(findOption !== undefined){
      var thisOption = allOptions[option];
      //console.log(option, thisOption);
      // Set the options that we're missing. Choosing to override the old ones.
      findOption.set({
        "price_indicator": thisOption.price_indicator,
        "price": thisOption.price,
        "list_price": thisOption.list_price,
        "is_default": thisOption.is_default
      });
    }
  }
  // Print the entire collection
  // console.log(optionsCollection.toJSON());
  // TODO: probably should make this a callback function
  renderPage();
}

function renderPage() {
  optionsCollection.sort();

  // Take the collection and feed it into the view. Then append to DOM. here doing it for US
  var optionsCollectionView = new app.allOptionsView({ collection: optionsCollection, costStructure: costStructure});
  $("#allOptions").html(optionsCollectionView.render().el);
}

var TeslaRouter = new app.Router();
Backbone.history.start();