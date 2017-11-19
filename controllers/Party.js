'use strict';

var url = require('url');

var Party = require('./PartyService');

module.exports.addPartyClient = function addPartyClient (req, res, next) {
  Party.addPartyClient(req.swagger.params, res, next);
};

module.exports.createParty = function createParty (req, res, next) {
  Party.createParty(req.swagger.params, res, next);
};

module.exports.deletePartyClient = function deletePartyClient (req, res, next) {
  Party.deletePartyClient(req.swagger.params, res, next);
};

module.exports.getPartyClients = function getPartyClients (req, res, next) {
  Party.getPartyClients(req.swagger.params, res, next);
};
