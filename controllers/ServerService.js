'use strict';

var gSwagger = require('../index');

exports.addServer = function(args, res, next) {
	/**
	 * Registers server at service
	 *
	 *
	 * servername String Name of the Server that is being registered. Must be unique.
	 * ip String IPv4 address of gameserver
	 * port Integer Port of gameserver
	 * no response value expected for this operation
	 **/

	var db = gSwagger.sql;

	db.find(
		{
			ip: args.ip.value,
			port: args.port.value
		}, function(err, servers)
		{
			var serverFound = false;		
			if(servers[0])
			{			
				console.log('\x1b[31m%s\x1b[0m', 'ERROR:', 'An error occured when trying to register a server (', args.ip.value, ':', args.port.value, ') - Server already registered');							
				serverFound = true;
				res.statusCode = 404;
				res.end();						
			}		
			if(!serverFound)
			{				
				var newServer = {
					name: args.servername.value,
					ip: args.ip.value,
					port: args.port.value,
					ready: false,
					ownerid: '0x0'
				}

				db.insert(newServer, function(err, insertedServer) {
					if (err == null) {
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

exports.setReady = function(args, res, next) {
	/**
	 * Sets Server ready status
	 * 
	 *
	 * servername String Name of the Server that is being set ready. Must be unique.
	 * no response value expected for this operation
	 **/
	res.end();
  }

exports.unregisterServer = function(args, res, next) {
	/**
	 * Unregisters server at service.
	 *
	 *
	 * servername String Name of the Server that is being unregistered. Must be unique.
	 * no response value expected for this operation
	 **/

	var db = gSwagger.sql;
	db.remove({
		name: args.servername.value
	}, {
		multi: true
	}, function(err, numRemoved) {
		if (err == null) {
			if(numRemoved == 0)
			{
				console.log('\x1b[33m%s\x1b[0m', 'INFO:', 'No Server named', args.servername.value, 'found.');
				res.statusCode = 404;
				res.end();	
			} else {
				console.log('\x1b[33m%s\x1b[0m', 'INFO:', 'Removed', numRemoved, 'entries from Database. (', args.servername.value, ')');
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

exports.resetServer = function(args, res, next) {
	/**
	 * Resets server status
	 * 
	 *
	 * servername String Name of the Server that is being reset. Must be unique.
	 * no response value expected for this operation
	 **/
	res.end();
  }
  