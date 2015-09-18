var geobuf = require('geobuf');
var fs = require('fs');
var pbf = require('pbf');

var buffer = geobuf.encode('input.geojson', new pbf());

fs.writeFile('output.pbf', buffer, function(err){
  if (err) throw err;
  console.log('its saved');
})

