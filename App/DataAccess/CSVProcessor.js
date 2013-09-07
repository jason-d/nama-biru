var fs = require('fs');
var path = require('path');
var util = require('util');
var byline = require('byline');

var inputFilePath = path.join(__dirname, 'Beers.csv');
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
    var fields = line.toString().split(',');
    
    fs.appendFile(outputFilePath, util.format("%s\t{\n\t\tname: '%s',\n\t\tbrewery: {\n\t\t\tname: '%s'\n\t\t}\n\t}",
        first ? "" : ",\n", fields[1].replace("'", "\\'"), fields[2].replace("'", "\\'")));
    
    first = false;
});