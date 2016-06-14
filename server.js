var
    ROOT_DIR = __dirname + '/',
    STORAGE_DIR = ROOT_DIR + '/storage',
    SLIDES_DIR = STORAGE_DIR + '/slides',
    UPLOADED_IMAGES_DIR = ROOT_DIR + '/images/uploaded',
    fs = require('fs'),
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    server = require('http').createServer(app);

app.use(bodyParser.json())
app.use('/app', express.static(ROOT_DIR + '/app'));
app.use('/css', express.static(ROOT_DIR + '/css'));
app.use('/node_modules', express.static(ROOT_DIR + '/node_modules'));
app.use('/images', express.static(ROOT_DIR + '/images'));
app.use('/storage', express.static(STORAGE_DIR));
app.use('/favicon.png', express.static(ROOT_DIR + '/favicon.png'));

var paths = {

    '/api/slideshow/:slideId' : {
        'get': function (req, res) {
            console.log('run /api/slideshow/:slideId');

            var
                slideId = req.params.slideId,
                file = SLIDES_DIR + '/' + slideId + '.json',
                list;
            
            list = fs.readFileSync(file, 'utf-8');

            res.send(list);
        },
        
        'put': function (req, res) {
            var
                slideId = req.params.slideId,
                file = SLIDES_DIR + '/' + slideId + '.json',
                list;

            console.log('/api/slideshow/'+slideId+' PUT');

            fs.writeFileSync(file, JSON.stringify(req.body, null, '\t'), 'utf-8');

            res.send({
                success: true
            });
        }
    },

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

for (var i in paths){
    for (var j in paths[i]){
        app[j](i, paths[i][j]);
    }
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

server.listen(8333, function () {
    console.log('Server is running under localhost:8333 ...');
});
