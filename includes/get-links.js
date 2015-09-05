'use strict';

/* jshint node:true */

var q = require('q');
var fs = require('fs');
var pageSeparator = '\n------------------------------------------\n';

module.exports = function(data, dir){
    var output = '';
    var deferred = q.defer();

    data.forEach(function(page){
        output += page.data.children.map(function(child){
            return child.data.title + ': ' + child.data.url;
        }).join('\n');

        output += pageSeparator;
    });

    fs.writeFile(dir + 'links.txt', output, deferred.resolve);

    return deferred.promise;
};
