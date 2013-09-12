var service = require('./DataAccess/BeerService.js');

exports.search = function(req, res) {
    var beers = null;
    var searchTerm = '';
    
    if (req.body.name != null && req.body.name != '') {
        searchTerm = req.body.name;
        beers = service.findByName(searchTerm);
    }
    
    res.render('search', { beers: beers, name: searchTerm });
};