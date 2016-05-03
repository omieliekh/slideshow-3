var
    ROOT_DIR = __dirname + '/',
    STORAGE_DIR = ROOT_DIR + '/storage',
    fs = require('fs'),
    express = require('express'),
    app = express(),
    server = require('http').createServer(app);


app.use('/app', express.static(ROOT_DIR + '/app'));
app.use('/css', express.static(ROOT_DIR + '/css'));
app.use('/node_modules', express.static(ROOT_DIR + '/node_modules'));
app.use('/images', express.static(ROOT_DIR + '/images'));
app.use('/storage', express.static(STORAGE_DIR));
app.use('/favicon.png', express.static(ROOT_DIR + '/favicon.png'));

var paths = {
    '/api/slideshow/:slideId' : function (req, res) {
        console.log('run /api/slideshow/:slideId');

        var
            slideId = req.params.slideId,
            dir = STORAGE_DIR + '/' + slideId,

            list = fs.readdirSync(dir, 'utf-8'),
            filteredList = [];

        list.forEach(function (item) {
            if (item != 'list.json'){
                filteredList.push('/storage/'+ slideId + '/' + item);
            }
        });

        res.send(filteredList);
    },

    '/*': function(req, res){
        console.log('run /*');

        var
            files = JSON.parse( fs.readFileSync(ROOT_DIR + 'files.json', 'utf8') ),
            cont = fs.readFileSync(ROOT_DIR + 'index.html', 'utf8');

        files = files.map(function (item) {
            return '<script src="' + item + '"></script>';
        });

        cont = cont.replace('</body>', '    '+files.join('\n    ')+'\n</body>');

        res.send(cont);
    }
};

for (var i in paths){
    app.get(i, paths[i]);
}

//app.get('/*', function(req, res){
//    if (typeof paths[req.path] == 'function') {
//        paths[req.path](req, res);
//    } else {
//        // its needed for angular's url-routing to work
//        paths['/*'](req, res);
//
//        //res.status(404);
//    }
//});

server.listen(8333);
console.log('Server is running under localhost:8333 ...');