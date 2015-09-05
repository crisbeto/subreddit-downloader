'use strict';

/* jshint node:true */

var request = require('request');
var mkdirp = require('mkdirp');
var fs = require('fs');
var getLinks = require('./get-links.js');

var allPages = [];
var indentation = 2;
var count = 0;

function downloadPage(after, name, type, directory){
    var url = 'https://www.reddit.com/r/'+ name +'/'+ type +'.json?limit=100&show=all';
    var dir = directory + '/';
    var pageDir = dir + 'pages/';

    mkdirp(dir);
    mkdirp(pageDir);

    request({ uri: url + (after ? '&after=' + after : '') + (count ? '&count=' + count : '') }, function(error, response, body) {
        var page;

        try{
            page = JSON.parse(body);
        }catch(e){
            console.log('Failed to parse API response. Probably returned HTML: \n' + body);
        }

        if(!page) return;

        var data = page.data;
        var after = data.after;

        count += data.children.length;

        allPages.push(page);

        fs.writeFile(pageDir + allPages.length + '.json', JSON.stringify(page, null, indentation), function(){
            if(after){
                downloadPage(after, name, type, directory);
            }else{
                fs.writeFile(dir + 'all.json', JSON.stringify(allPages, null, indentation), function(){
                    getLinks(allPages, dir).then(function(){
                        console.log('Done');
                    });
                });
            }
        });
    });
}

module.exports = function(subreddit, type, dir){
    console.log('Downloading');
    downloadPage(null, subreddit, type, dir);
};
