var
    ROOT_DIR = __dirname + '/',
    fs = require('fs'),
    express = require('express'),
    app = express(),
    server = require('http').createServer(app);


app.use('/app', express.static(ROOT_DIR + '/app'));
app.use('/css', express.static(ROOT_DIR + '/css'));
app.use('/node_modules', express.static(ROOT_DIR + '/node_modules'));
app.use('/images', express.static(ROOT_DIR + '/images'));
app.use('/favicon.png', express.static(ROOT_DIR + '/favicon.png'));

var paths = {
    '/*': function(req, res){
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

app.get('/*', function(req, res){
    if (typeof paths[req.path] == 'function') {
        paths[req.path](req, res);
    } else {
        // its needed for angular's url-routing to work
        paths['/*'](req, res);

        //res.status(404);
    }
});

server.listen(8333);
console.log('Server is running under localhost:8333 ...');