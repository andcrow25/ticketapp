var multer = require('multer');


module.exports = function (app) {

    var controller = {};

    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null,'./uploads/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
        }
    });

    var upload = multer({ //multer settings
        storage: storage
    }).single('file');


    controller.UpFile = function (req, res) {
        upload(req, res, function (err) {
            if (err) {
                res.json({ error_code: 1, err_desc: err });
                return;
            }
            res.json({ error_code: 0, err_desc: null, nome: req.file.filename });
            console.log(req.file.filename);

        })
    };


    controller.getFile = function (req, res, next) {
        var file = req.params.file
            , path = __dirname + '\\..\\..\\uploads\\' + file;
        res.download(path);
    };


    controller.redireciona = function(req,res) {
        res.redirect('/#' + req.originalUrl);
    };
    return controller;

};