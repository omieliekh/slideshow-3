var
    fs = require('fs'),
    express = require('express'),
    fileUpload = require('express-fileupload'),
    bodyParser = require('body-parser'),
    _ = require('underscore'),

    ROOT_DIR = __dirname + '/',
    STORAGE_DIR = ROOT_DIR + 'storage',

    app = express(),
    server = require('http').createServer(app);

app.use(bodyParser.json());
app.use(fileUpload());
app.use('/app', express.static(ROOT_DIR + 'app'));
app.use('/css', express.static(ROOT_DIR + 'css'));
app.use('/node_modules', express.static(ROOT_DIR + 'node_modules'));
app.use('/images', express.static(ROOT_DIR + 'images'));
app.use('/storage', express.static(STORAGE_DIR));
app.use('/favicon.png', express.static(ROOT_DIR + 'favicon.png'));

var paths = _.extend(
    {},
    require(__dirname + '/middlewares/images-upload'),
    require(__dirname + '/middlewares/slideshow'),
    require(__dirname + '/middlewares/default')
);

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
