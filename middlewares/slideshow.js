var
    fs = require('fs'),

    ROOT_DIR = __dirname + '/../',
    SLIDES_DIR = ROOT_DIR + 'storage/slides/';

module.exports = {
    '/api/slideshow-list': {
        'get': function (req, res) {
            fs.readdir(SLIDES_DIR, function (err, files) {
                if (err){
                    res.status(500).send(err);
                } else {
                    //res.json(files);
                    readSlideshowListDetails(files);
                }
            });

            function readSlideshowListDetails(files){
                var list = files.map(function (filename) {
                    var
                        contStr = fs.readFileSync(SLIDES_DIR + filename, 'utf-8'),
                        cont = JSON.parse(contStr),
                        image = cont.slides && cont.slides[0] && cont.slides[0].image || '';


                    return {
                        image: image,
                        id: filename.replace(/\.json$/, ''),
                        title: cont.title
                    }
                });

                res.json(list);
            }
        }
    },
    '/api/slideshow/:slideId' : {
        'get': function (req, res) {
            console.log('run /api/slideshow/:slideId');

            var
                slideId = req.params.slideId,
                file = SLIDES_DIR + slideId + '.json',
                list;

            list = fs.readFileSync(file, 'utf-8');

            res.send(list);
        },

        'put': function (req, res) {
            var
                slideId = req.params.slideId,
                file = SLIDES_DIR + slideId + '.json';

            console.log('/api/slideshow/'+slideId+' PUT');

            fs.writeFileSync(file, JSON.stringify(req.body, null, '\t'), 'utf-8');

            res.send({
                success: true
            });
        }
    }
};