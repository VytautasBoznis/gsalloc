'use strict';

var gSwagger = require('../index');

exports.addServer = function(args, res, next) {
	/**
	 * Registers server at service
	 * 
	 *
	 * server_ip String IPv4 address of gameserver
	 * server_port Integer Port of gameserver
	 * no response value expected for this operation
	 **/

	var db = gSwagger.sql;

	db.find(
	{
		ip: args.server_ip.value,
		port: args.server_port.value
	}, function(err, servers)
	{
		var serverFound = false;		
		if(servers[0])
		{			
			console.log('\x1b[31m%s\x1b[0m', 'ERROR:', 'An error occured when trying to register a server (', args.server_ip.value, ':', args.server_port.value, ') - Server already registered');							
			serverFound = true;
			res.statusCode = 404;
			res.end();						
		}		
		if(!serverFound)
		{				
			var newServer = 
			{				
				SERVER_ip: args.server_ip.value,
				SERVER_port: args.server_port.value,
				SERVER_ownerid: '0x0',
				SERVER_isReady: false
			}

			db.insert(newServer, function(err, insertedServer) 
			{
				if (err == null) 
				{
					console.log('\x1b[33m%s\x1b[0m', 'INFO: Added a new Server with the following ');
					console.log('\x1b[33m%s\x1b[0m', 'RAW:', insertedServer);

					res.statusCode = 200;
					res.end();
				} else {
					console.log('\x1b[31m%s\x1b[0m', 'ERROR:', 'An error occured when trying to add the server.');
					console.log('\x1b[33m%s\x1b[0m', 'RAW:', newServer);
					console.log('\x1b[33m%s\x1b[0m', 'RAW ERROR:', err);

					res.statusCode = 500;
					res.end();
				}
			})
		}			
	});
}

exports.resetServer = function(args, res, next) {
	/**
	 * Resets server status
	 * 
	 *
	 * server_id String ID of the Server that is being reset. Must be unique.
	 * no response value expected for this operation
	 **/

	var db = gSwagger.sql;
	
	db.find(
	{
		_id: args.server_id.value
	}, function(err, servers)
	{
		var serverFound = true;		
		if(!servers[0])
		{			
			console.log('\x1b[31m%s\x1b[0m', 'ERROR:', 'An error occured when trying to find a server called', args.server_id.value, '- No Server found!');							
			serverFound = false;
			res.statusCode = 404;
			res.end();						
		}		
		if(serverFound)
		{
			db.update(
			{
				_id: args.server_id.value
			},
			{
				SERVER_ownerid: '0x0',
				SERVER_isReady: false,
			},
			{}, function(err, numReplaced)
			{
				if (err == null) 
				{
					console.log('\x1b[33m%s\x1b[0m', 'INFO:', 'Removed Server Assignment of', args.server_id.value);
					console.log('\x1b[33m%s\x1b[0m', 'INFO:', 'Set Server Ready Status of', args.server_id.value, 'to false');				
				}
				else
				{
					console.log('\x1b[31m%s\x1b[0m', 'ERROR:', 'An error occured when trying to reset the server.');
					console.log('\x1b[33m%s\x1b[0m', 'RAW:', args.server_id.value);
					console.log('\x1b[33m%s\x1b[0m', 'RAW ERROR:', err);

					res.statusCode = 500;
					res.end();
				}
			});
	
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(servers[0]));
		}
	}); 
	res.end();
}

exports.setReady = function(args, res, next) {
	/**
	 * Sets Server ready status
	 * 
	 *
	 * server_id String ID of the Server that is being set ready. Must be unique.
	 * no response value expected for this operation
	 **/
	res.end();
  }

exports.unregisterServer = function(args, res, next) {
	/**
	 * Unregisters server at service.
	 * 
	 *
	 * server_id String ID of the Server that is being unregistered. Must be unique.
	 * no response value expected for this operation
	 **/

	var db = gSwagger.sql;
	db.remove({
		_id: args.server_id.value
	}, {
		multi: true
	}, function(err, numRemoved) 
	{
		if (err == null) 
		{
			if(numRemoved == 0)
			{
				console.log('\x1b[33m%s\x1b[0m', 'INFO:', 'No Server with ID', args.server_id.value, 'found.');
				res.statusCode = 404;
				res.end();	
			} else {
				console.log('\x1b[33m%s\x1b[0m', 'INFO:', 'Removed', numRemoved, 'entries for ID', args.server_id.value, 'from Database.');
				res.statusCode = 200;
				res.end();
			}
		} else {
			console.log('\x1b[31m%s\x1b[0m', 'ERROR:', 'An error occured when trying to remove the server.');
			console.log('\x1b[33m%s\x1b[0m', 'RAW:', args.servername.value);
			console.log('\x1b[33m%s\x1b[0m', 'RAW ERROR:', err);

			res.statusCode = 500;
			res.end();
		}
	});

	res.end();
}


  