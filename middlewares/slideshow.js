var
    fs = require('fs'),

    ROOT_DIR = __dirname + '/../',
    SLIDES_DIR = ROOT_DIR + 'storage/slides';

module.exports = {
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
                file = SLIDES_DIR + '/' + slideId + '.json';

            console.log('/api/slideshow/'+slideId+' PUT');

            fs.writeFileSync(file, JSON.stringify(req.body, null, '\t'), 'utf-8');

            res.send({
                success: true
            });
        }
    }
};