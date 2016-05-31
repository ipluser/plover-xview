'use strict';


module.exports = function(app) {
  const config = app.settings.xview || {};

  app.addHelper('$', require('./helper'));

  if (config.enable !== false) {
    app.addFilter(require('./filter'), 2);
  }
};

