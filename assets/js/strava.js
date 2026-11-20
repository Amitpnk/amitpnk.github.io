/*--------------------------------------------------------------
# Strava activity embeds
# Each activity page defines window.STRAVA_ACTIVITIES (a list of
# Strava activity IDs) before loading this file. This script turns
# them into Strava's official embed cards.
--------------------------------------------------------------*/
(function () {
  var grid = document.getElementById('strava-activities');
  var empty = document.getElementById('strava-empty');
  if (!grid) return;

  var ids = (window.STRAVA_ACTIVITIES || [])
    .map(function (id) { return String(id).replace(/\D/g, ''); })
    .filter(Boolean);

  if (!ids.length) {
    if (empty) empty.style.display = 'block';
    return;
  }

  ids.forEach(function (id) {
    var col = document.createElement('div');
    col.className = 'strava-card';
    var ph = document.createElement('div');
    ph.className = 'strava-embed-placeholder';
    ph.setAttribute('data-embed-type', 'activity');
    ph.setAttribute('data-embed-id', id);
    ph.setAttribute('data-style', 'standard');
    ph.setAttribute('data-from-embed', 'false');
    col.appendChild(ph);
    grid.appendChild(col);
  });

  var s = document.createElement('script');
  s.src = 'https://strava-embeds.com/embed.js';
  s.async = true;
  document.body.appendChild(s);
})();
