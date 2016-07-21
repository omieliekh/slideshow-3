var
    fs = require('fs'),
    ROOT_DIR = __dirname + '/../',
    DEST_FOLDER = ROOT_DIR + 'images/uploaded/';

function isDateToday(date){
    var
        now = new Date(),
        targDate = new Date(date);

    return (
        now.getDate() == targDate.getDate() &&
        now.getMonth() == targDate.getMonth() &&
        now.getFullYear() == targDate.getFullYear()
    );
}

function isDateYesterday(date){
    var
        yesterday,
        targDate = new Date(date);

    yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    console.log('==============================');
    console.log('yesterday: ', yesterday);
    console.log('targDate: ', targDate);
    console.log('==============================');

    return (
        yesterday.getDate() == targDate.getDate() &&
        yesterday.getMonth() == targDate.getMonth() &&
        yesterday.getFullYear() == targDate.getFullYear()
    );
}

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
                    res.json(files.map(function (file) {
                        var stats = fs.statSync(DEST_FOLDER + file);

                        return {
                            filename: file,
                            isToday: isDateToday(stats.mtime),
                            isYesterday: isDateYesterday(stats.mtime)
                        };
                    }));
                }
            });
        }
    }
};