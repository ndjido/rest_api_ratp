'use strict'

/**
 * Module Dependencies
 */
const errors = require('restify-errors');

/**
 * Soap Client
 */
const soap = require('./soap/client-soap.js');

module.exports = (server) => {
	/**
	 * GET
	 */
	server.get('/stations/:stationId/:name', (req, res, next) => {
		if (!req.is('application/json')) {
		 	return next(
				new errors.InvalidContentError("Expects 'application/json'")
			);
		}

		let data = req.body || {};
		var station = soap.getStations(req.params.stationId, req.params.name).then(
			(result) => {
				res.send(station);
				return next();
			},
			(error) => {
				console.log(error);
				res.send(new errors.InternalServerError(error.message));
				return next();
			}
		);
	});
};