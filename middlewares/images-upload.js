var
    fs = require('fs'),
    ROOT_DIR = __dirname + '/../',
    DEST_FOLDER = ROOT_DIR + 'images/uploaded/';

module.exports = {
    '/images/upload': {
        'post': function (req, res) {
            var file;

            function moveUploadedFile(){
                file.mv(DEST_FOLDER+file.name, function(err) {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify({
                            success: true,
                            filename: file.name
                        }));
                    }
                });
            }

            if (!req.files || !req.files.file) {
                res.send('No files were uploaded.');
                return;
            }

            file = req.files.file;

            fs.stat(DEST_FOLDER+file.name, function (err, stats){
                if (err){
                    moveUploadedFile();
                } else {
                    res.status(409).send('File already exists');
                }
            });
        },

        get: function (req, res) {
            fs.readdir(DEST_FOLDER, function (err, files) {
                if (err){
                    res.status(500).send(err);
                } else {
                    res.json(files);
                }
            });
        }
    }
};