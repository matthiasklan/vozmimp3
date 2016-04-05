# vozmimp3
custom scraper API for querying the vozmimp3.com MP3 Database

##install

`npm install vozmimp3`

## usage

to search for a mp3 title or an artist use the `queryVozmiMp3` method. Provide a data object with key `q` and the value of the query string. Optionally you can limit and sort your results.

```javascript
var vozmimp3 = require('vozmimp3');

var data = {
  q: 'cedar m Planet Of Tokyo',
  limit: 5, //default: 20
  sort: {
    keys: ['duration'] //(duration, title, link) default: title  
    order: ['desc'] //(asc, desc) default: asc
    //hint: you can use multiple keys and corresponding orders (that's why the array is for)
  }
}

vozmimp3.queryVozmiMp3(data).then(function(result){
  console.log(result);
}).catch(function (err){
  console.log(err);
}
```
