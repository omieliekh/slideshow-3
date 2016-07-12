var
    fs = require('fs'),
    ROOT_DIR = __dirname + '/../';

module.exports = {
    '/*': {
        'get': function(req, res){
            var
                files = JSON.parse( fs.readFileSync(ROOT_DIR + 'files.json', 'utf8') ),
                cont = fs.readFileSync(ROOT_DIR + 'index.html', 'utf8');

            files = files.map(function (item) {
                return '<script src="' + item + '"></script>';
            });

            cont = cont.replace('</body>', '    '+files.join('\n    ')+'\n</body>');

            res.send(cont);
        }
    }
};