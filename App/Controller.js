var service = require('./DataAccess/BeerService.js');
var util = require('util');

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

exports.image = function(req, res) {
    var imageUrl = util.format(
        'http://i6.photobucket.com/albums/y249/jiehan/Beer/%s.jpg', req.params.id);
        
    res.render('image', {
        url: imageUrl
    });
};