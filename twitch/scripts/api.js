// The main meat of the app, this thing searches twitch for you
function loadTwitchQuery(searchTerms, fullQuery, newSearch) {
  clearResults();
  showLoader();
  isItLoaded(false);

  var query;

  if(fullQuery) {
    query = fullQuery
  } else {
    query = 'https://api.twitch.tv/kraken/search/streams?q='+ searchTerms;
  }

  if(newSearch) {
    config.page = 1;
  }
  var url = query+'&client_id='+config.clientId+'&callback=finishTwitchApiCall';
  var scriptEl = document.createElement('script');
  scriptEl.setAttribute('src', url);
  document.body.appendChild(scriptEl);
}

// Called on form submit in the DOM
function search() {
  var searchTerms =  document.getElementById('search-input').value;
  if(!searchTerms) { return false; }
  loadTwitchQuery(searchTerms, null, true);
  return false;
}

// Go to previous page if there is a "prev" in _links
function previousPage() {
  if(config.result._links.prev) {
    loadTwitchQuery(null, config.result._links.prev);
    config.page--;
    renderPagination(config.result._total);
  }
}

// Go to next page
function nextPage() {
  // The twitch API gives you a "next" link even when there's no more results
  // so you have to check if this page is < max pages otherwise you end up in no man's land
  if(config.result._links.next && config.page < Math.ceil(config.result._total/10)) {
    loadTwitchQuery(null, config.result._links.next);
    config.page++;
    renderPagination(config.result._total);
  }
}