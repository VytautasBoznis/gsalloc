'use strict';

var gSwagger = require('../index');

exports.allocServer = function(args, res, next)
{
	/**
	 * Requests an available server that is currently registered.
	 * 
	 *
	 * playerID String ID of Player that wants to request the server.
	 * returns GameServer
	 **/
	
	var db = gSwagger.sql;

	db.find(
	{
		ownerid: '0x0',		
	}, function(err, servers)
	{
		var serverFound = true;		
		if(!servers[0])
		{			
			console.log('\x1b[31m%s\x1b[0m', 'ERROR:', 'An error occured when trying to allocate a server for', args.playerID.value, '- No Server available!');							
			serverFound = false;
			res.statusCode = 404;
			res.end();						
		}		
		if(serverFound)
		{
			db.update(
			{
				_id: servers[0]._id
			},
			{
				$set:
				{
					ownerid: args.playerID.value 
				}
			},
			{}, function(err, numReplaced)
			{
				if (err == null)
				{
					console.log('\x1b[33m%s\x1b[0m', 'INFO:', 'Assigned Server', servers[0].name, 'to', args.playerID.value);
					console.log('\x1b[33m%s\x1b[0m', 'INFO:', 'Updated', numReplaced, 'entries.');
					servers[0].ownerid = args.playerID.value;
	
					res.setHeader('Content-Type', 'application/json');
					res.statusCode = 200;
					res.end(JSON.stringify(servers[0]));
				}
				else
				{
					console.log('\x1b[31m%s\x1b[0m', 'ERROR:', 'An error occured when trying to assign the server (.', servers[0].name, ') to', args.playerID.value);				
					console.log('\x1b[33m%s\x1b[0m', 'RAW ERROR:', err);
		
					res.statusCode = 500;
					res.end();
				}
			});	
		}			
	});
}

exports.deallocServer = function(args, res, next)
{
	/**
	 * Stops a server request
	 * 
	 *
	 * playerID String ID of Player that wants to request the server.
	 * no response value expected for this operation
	 **/

	var db = gSwagger.sql;

	db.find(
	{
		ownerid: args.playerID.value
	}, function(err, servers)
	{
		var serverFound = true;		
		if(!servers[0])
		{			
			console.log('\x1b[31m%s\x1b[0m', 'ERROR:', 'An error occured when trying to remove a server for', args.playerID.value, '- No Server found!');							
			serverFound = false;
			res.statusCode = 404;
			res.end();						
		}		
		if(serverFound)
		{
			db.update(
			{
				_id: servers[0]._id
			},
			{
				ownerid: '0x0'
			},
			{}, function(err, numReplaced)
			{
				console.log('\x1b[33m%s\x1b[0m', 'INFO:', 'Removed Server Assignment of', servers[0].name, 'which was owned by', args.playerID.value);
				servers[0].ownerid = args.playerID.value;
			});
	
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(servers[0]));
		}
	});
}

exports.getReadyStatus = function(args, res, next) {
	/**
	 * Requests the current ready status of a Server.
	 * 
	 *
	 * servername String Name of Server which should be queried.
	 * returns GameServer
	 **/
	var db = gSwagger.sql;
	
	db.find(
	{
		name: args.servername.value
	}, function(err, servers)
	{
		console.log(servers);
		var serverFound = true;		
		if(!servers[0])
		{			
			console.log('\x1b[31m%s\x1b[0m', 'ERROR:', 'An error occured when trying to query server:', args.servername.value, '- Server not found!');							
			serverFound = false;
			res.statusCode = 404;
			res.end();						
		}		
		if(serverFound)
		{			
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(servers[0].ready));
		}
	});
}