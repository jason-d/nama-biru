var service = require('./BeerService.js');

var results = service.findByName('pale');

console.log(results);

results = service.findByBreweryName('tone');

console.log(results);