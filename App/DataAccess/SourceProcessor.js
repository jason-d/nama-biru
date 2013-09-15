var fs = require('fs');
var path = require('path');
var util = require('util');
var byline = require('byline');

var inputFilePath = path.join(__dirname, 'Beers.txt');
var outputFilePath = path.join(__dirname, 'Beers.js');

if (fs.existsSync(outputFilePath)) {
    fs.unlinkSync(outputFilePath);
}

fs.appendFile(outputFilePath, 'exports.beers = [\n');

var stream = fs.createReadStream(inputFilePath);
stream = byline.createStream(stream);

stream.on('end', function() {
   fs.appendFile(outputFilePath, "\n];");
});

var first = true;

stream.on('data', function(line) {
    var fields = line.toString().split('\t');
    
    fs.appendFile(outputFilePath, util.format(
        '%s\t{\n\t\tid: %d,\n\t\tname: "%s",\n\t\tbrewery: {\n\t\t\tname: "%s",\n\t\t\tregion: "%s",\n\t\t\tcountry: "%s"\n\t\t},\n\t\tabv: %d,\n\t\tratings: [\n\t\t\t{\n\t\t\t\tname: "Jason",\n\t\t\t\trating: %d\n\t\t\t},\n\t\t\t{\n\t\t\t\tname: "Valerie",\n\t\t\t\trating: %d\n\t\t\t}\n\t\t],\n\t\tdate: "%s",\n\t\tstyle: "%s",\n\t\tdescription: "%s",\n\t\tfavorite: %s\n\t}',
        first ? "" : ",\n", fields[0], fields[1], 
        fields[2], fields[3], fields[4], fields[5].replace('%', ''),
        fields[6], fields[7], fields[8], fields[9], clean(fields[10]),
        isFavorite(fields[6], fields[7])));
    
    first = false;
});

var clean = function(field) {
    field = field.replace('""', '');
    field = field.replace('""', '');
    field = field.replace('"', '');
    field = field.replace('"', '');
    
    return field;
};

var isFavorite = function(rating1, rating2) {
    return rating1 > 3 || rating2 > 3;
};