var util = require('util');
var _ = require('underscore');
var beers = require('./Beers.js').beers;

exports.findByName = function(name) {
    name = name.toLowerCase();
    
    var filtered = _.filter(beers, function(beer) {
        var text = util.format('%s %s', beer.brewery.name, beer.name)
            .toLowerCase();
        
        return text.indexOf(name) > -1;
    });
    
    var ordered = _.sortBy(filtered, function(beer) {
        return util.format('%s %s', beer.brewery.name, beer.name);
    });
    
    return ordered;
};

exports.findFavoritesByName = function(name) {
    name = name.toLowerCase();
    
    var filtered = _.filter(beers, function(beer) {
        var text = util.format('%s %s', beer.brewery.name, beer.name)
            .toLowerCase();
        
        return text.indexOf(name) > -1 && beer.favorite;
    });
    
    var ordered = _.sortBy(filtered, function(beer) {
        return util.format('%s %s', beer.brewery.name, beer.name);
    });
    
    return ordered;
};

exports.findByBreweryName = function(breweryName) {
    breweryName = breweryName.toLowerCase();
    
    var filtered = _.filter(beers, function(beer) {
        return beer.brewery.name.toLowerCase().indexOf(breweryName) > -1;
    });
    
    return filtered;
};