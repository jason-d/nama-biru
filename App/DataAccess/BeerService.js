var _ = require('underscore');
var beers = require('./Beers.js').beers;

exports.findByName = function(name) {
    name = name.toLowerCase();
    
    var filtered = _.filter(beers, function(beer) {
        return beer.name.toLowerCase().indexOf(name) > -1;
    });
    
    return filtered;
};

exports.findByBreweryName = function(breweryName) {
    breweryName = breweryName.toLowerCase();
    
    var filtered = _.filter(beers, function(beer) {
        return beer.brewery.name.toLowerCase().indexOf(breweryName) > -1;
    });
    
    return filtered;
};