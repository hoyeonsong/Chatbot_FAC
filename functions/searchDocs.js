var fs = require('fs');

function searchDocs() {
  // create search documents that can be opened to show full results
  this.addDocs = function (data, callback) {
    // make sure docs is there
    if (!fs.existsSync('public/docs')) {
      fs.mkdirSync('public/docs');
    }

    if (data.output.hasOwnProperty('generic')) {
      var generic = data.output.generic;
      generic.forEach(function (gen) {
        if (gen.response_type === 'search') {
          var results = gen.results;
          for (var i = 0; i < results.length && i < 3; i += 1) {
            var res = results[i];
            var htmlRes = res.highlight.contentHtml;

            var text = '<html><head><title>' + res.title + '</title></head><body><strong>' +
              res.title + '</strong><br>' + htmlRes.join('') + '</body></html>';
            var path = 'public/docs/doc' + (i + 1) + '.html';
            fs.writeFile(path, text, function (err) {
              if (err) {
                console.log(err);
              }
            });
          }
        }
      });
    }
    callback();
  };
}

module.exports = searchDocs;