var prompt = require('prompt');
var downloadData = require('./includes/download-data.js');

prompt.start();

prompt.get([{
    name: 'name',
    description: 'Enter the subreddit name'
}, {
    name: 'type',
    default: 'new',
    description: 'Enter the content type. Can be hot, new, rising, controversial, top or gilded',
    pattern: /^hot|new|rising|controversial|top|gilded$/
}, {
    name: 'dir',
    default: 'data',
    description: 'Enter a download directory'
}], function(err, result){
    if(err){
        console.log(err);
    }else{
        downloadData(result.name, result.type, result.dir);
    }
});
