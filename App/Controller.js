var service = require('./DataAccess/BeerService.js');

exports.search = function(req, res) {
    var favoritesOnly = req.body.favoritesOnly;
    var searchTerm = req.body.name;
    var beers = null;

    if (favoritesOnly) {
        beers = service.findFavoritesByName(searchTerm);
    } else {
        beers = service.findByName(searchTerm);
    }
    
    res.render('search', { 
        beers: beers, 
        name: searchTerm, 
        favoritesOnly: favoritesOnly 
    });
};