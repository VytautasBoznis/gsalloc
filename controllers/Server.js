'use strict';

var url = require('url');

var Server = require('./ServerService');

module.exports.addServer = function addServer (req, res, next) {
  Server.addServer(req.swagger.params, res, next);
};

module.exports.resetServer = function resetServer (req, res, next) {
  Server.resetServer(req.swagger.params, res, next);
};

module.exports.setReady = function setReady (req, res, next) {
  Server.setReady(req.swagger.params, res, next);
};

module.exports.unregisterServer = function unregisterServer (req, res, next) {
  Server.unregisterServer(req.swagger.params, res, next);
};
