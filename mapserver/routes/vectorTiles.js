var express = require('express');
var zlib = require('zlib')
var mapnik = require('mapnik');
mapnik.register_default_fonts();
mapnik.register_default_input_plugins();
var pg = require('pg');
var conString = 'postgres://postgres@localhost/urbinsight';
var router = express.Router();
var SphericalMercator = require('sphericalmercator');
var mercator = new SphericalMercator({
  size: 256 //tile size (don't change)
})
var fs = require('fs');
var sample_geojson = fs.readFileSync('/Users/ashokafinley/development/combined.geojson', {encoding: 'utf8'});

/* GET users listing. */
router.get('/:layername/:z/:x/:y.pbf', function(req, res, next) {
  var bbox = mercator.bbox(
   +req.params.x,
   +req.params.y,
   +req.params.z,
   false,
   '4326');
  pg.connect(conString, function(err, client, done){
    client.query('SELECT st_asgeojson(wkb_geometry) as feature from ogrgeojson where st_intersects(wkb_geometry, bbox)', function(err, result){
      if(err) {
        console.error(err);
      }
      var vtile = new mapnik.VectorTile(+req.params.z, +req.params.x, +req.params.y);
      vtile.addGeoJSON(JSON.stringify(result), ('' + req.params.layername));

      res.setHeader('Content-Encoding', 'deflate')
      res.setHeader('Content-Type', 'application/x-protobuf')
      zlib.deflate(vtile.getData(), function(err, pbf) {
        res.send(pbf)
      })
    })
  })
});

module.exports = router;
