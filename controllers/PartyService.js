'use strict';

exports.addPartyClient = function(args, res, next) {
  /**
   * Adds a client ID to a party
   * 
   *
   * party_id String ID of the Party.
   * client_id String Real ID of Player that wants to request the server. (optional)
   * client_customid String Custom ID of Player that wants to request the server. (optional)
   * returns Party
   **/
  var examples = {};
  examples['application/json'] = {
  "PARTY_clients" : [ {
    "CLIENT_customid" : "aeiou",
    "CLIENT_id" : "aeiou"
  } ],
  "PARTY_slots" : 0,
  "PARTY_id" : "aeiou"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.createParty = function(args, res, next) {
  /**
   * Creates a new party
   * 
   *
   * party_slots Integer Amount of players to fill this party with
   * returns Party
   **/
  var examples = {};
  examples['application/json'] = {
  "PARTY_clients" : [ {
    "CLIENT_customid" : "aeiou",
    "CLIENT_id" : "aeiou"
  } ],
  "PARTY_slots" : 0,
  "PARTY_id" : "aeiou"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.deletePartyClient = function(args, res, next) {
  /**
   * Deletes a client ID to a party
   * 
   *
   * party_id String ID of the Party.
   * client_id String Real ID of Player that wants to request the server. (optional)
   * client_customid String Custom ID of Player that wants to request the server. (optional)
   * returns Party
   **/
  var examples = {};
  examples['application/json'] = {
  "PARTY_clients" : [ {
    "CLIENT_customid" : "aeiou",
    "CLIENT_id" : "aeiou"
  } ],
  "PARTY_slots" : 0,
  "PARTY_id" : "aeiou"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getPartyClients = function(args, res, next) {
  /**
   * Gets all clients in a party
   * 
   *
   * party_id Integer ID of the Party.
   * returns Party
   **/
  var examples = {};
  examples['application/json'] = {
  "PARTY_clients" : [ {
    "CLIENT_customid" : "aeiou",
    "CLIENT_id" : "aeiou"
  } ],
  "PARTY_slots" : 0,
  "PARTY_id" : "aeiou"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

