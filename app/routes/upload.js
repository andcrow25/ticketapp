module.exports = function (app) {
    var controller = app.controllers.upload;



    app.route('/upload')
        .post(controller.UpFile);

    app.route('/uploads/:file')
        .get(controller.getFile);

    app.route('/*')
        .get(controller.redireciona);

};