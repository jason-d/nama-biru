var service = require('./DataAccess/BeerService.js');

exports.search = function(req, res) {
    var beers = service.findByName(req.body.name);
    console.log(beers);
    res.render('search', { beers: beers });
};