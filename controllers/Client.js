'use strict';

var url = require('url');

var Client = require('./ClientService');

module.exports.allocServer = function allocServer (req, res, next) {
  Client.allocServer(req.swagger.params, res, next);
};

module.exports.deallocServer = function deallocServer (req, res, next) {
  Client.deallocServer(req.swagger.params, res, next);
};

module.exports.getReadyStatus = function getReadyStatus (req, res, next) {
  Client.getReadyStatus(req.swagger.params, res, next);
};

module.exports.registerClient = function registerClient (req, res, next) {
  Client.registerClient(req.swagger.params, res, next);
};
