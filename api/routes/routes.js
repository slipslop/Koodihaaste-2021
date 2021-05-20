'use strict';

module.exports = function(app) {
    let controller = require('../controllers/controller');
    app.route('/api').post(controller.handlePost);
}