// Promises in Vanilla JS: https://scotch.io/tutorials/javascript-promises-for-dummies
// Ajax in Vanilla JS: https://www.sitepoint.com/guide-vanilla-ajax-without-jquery/

window.onload = function() {
  init();
}

// Config acts like a rootscope
// Should probably be an object with get/set functions
var config = {
  clientId: '7bqscqst7pz2i8854rj89a2mpmcrmd'
};

// Stuff to do on first boot up
function init() {
  config.page = 1;
  setListeners();
  isItLoaded(false);
}

function finishTwitchApiCall(res) {
  config.result = res;
  isItLoaded(true);
  hideLoader();
  renderPagination(res._total);
  setResultsCount(res._total);
  appendSearchResults(res);
}

// Set the listeners for the arrow keys
function setListeners() {
  document.getElementById('previous-page').addEventListener('click', previousPage);
  document.getElementById('next-page').addEventListener('click', nextPage);
}

// Set up page number and total pages
function renderPagination(total) {
  var resultsCount = document.getElementById('page-number')
  resultsCount.innerHTML = config.page;
  
  var resultsCount = document.getElementById('total-pages')
  resultsCount.innerHTML = Math.ceil(total / 10);
}

// Empty the results
function clearResults() {
  var resultsCount = document.getElementById('search-results')
  resultsCount.innerHTML = '';
}

// Set it to loaded or not loaded
function isItLoaded(isLoaded) {
  if(isLoaded) {
    var stageContainer = document.getElementById('stage');
    addClass(stageContainer, 'loaded');
  } else {
    var stageContainer = document.getElementById('stage');
    removeClass(stageContainer, 'loaded');
  }
}

// We show the loader with CSS classes to the stage
function showLoader() {
  var stageContainer = document.getElementById('stage');
  addClass(stageContainer, 'loading');
}

function hideLoader() {
  var stageContainer = document.getElementById('stage');
  removeClass(stageContainer, 'loading');
  // This is a bit convoluted, long story short if the stage
  // has never been loaded it should use flexbox, but after
  // it's loaded once we display it normally.
  var stageContainer = document.getElementById('stage');
  addClass(stageContainer, 'has-been-loaded-once');
}

// How many results we have
function setResultsCount(count) {
  var resultsCount = document.getElementById('results-count')
  resultsCount.innerHTML = count;
}

// Render + append the results
function appendSearchResults(results) {
  if(!results) { return false; }

  for(var i = 0; i < results.streams.length; i++) {
    var thisResult = results.streams[i] || {};
    var div = document.createElement('div');
    div.innerHTML = getStreamTemplate(thisResult);
    document.getElementById('search-results').appendChild(div);
  }
}

// This is pretty much a cheap way to handle the HTML and insert the data
function getStreamTemplate(thisResult) {
  return '<a href="' + thisResult.channel.url + '" target="_blank">' +
    '<div class="stream">' +
      '<div class="stream-image" style="background-image: url('+ thisResult.preview.medium +')"></div>' +
      '<div class="stream-name">'+ thisResult.channel.display_name + '</div>' +
      '<div class="stream-details">' +
        '<span class="game-name">' + thisResult.channel.game + '</span> - ' +
        '<span class="number-of-viewers">' + thisResult.viewers + '</span> Viewers' +
      '</div>' +
      '<div class="stream-description">' + thisResult.channel.status + '</div>' +
    '</div>' +
  '</a>';
}