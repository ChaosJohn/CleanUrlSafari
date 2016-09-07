var arrayAds = new Array('utm_source', 'utm_medium', 'utm_term', 'utm_content', 'utm_campaign', 'hmsr');
(function() {
  'use strict';
  safari.application.addEventListener('beforeNavigate', function(event) {
    //alert(JSON.stringify(event));
    //alert(event.url);
    cleanDuty(event); 
  }, true);
})();
function cleanDuty(event) {
  var components = event.url.split('?');
  var baseUrl = components[0];
  var queries = components[1].split('&');
  var newQuery = '?';
  queries.forEach(function(item, index, array) {
    newQuery += checkAds(item);
  });

  if (newQuery == '?') {
    newQuery = '';
  } else {
    newQuery = newQuery.substring(0, newQuery.length - 1);
  }
  var newUrl = baseUrl + newQuery;
  if (newUrl != event.url) {
    event.preventDefault();
    event.target.url = newUrl;
  }
}

function checkAds(query) {
  return arrayAds.filter(function(item) {
    return query.startsWith(item);
  }).length == 0 ? (query + '&') : '';
}

