import http from 'http';
import * as util from './util';

require('dotenv').config();
const cors = require('cors');
const constants = require('../config/constants');
const signup = require('./modules/signup');
const reserve = require('./modules/reserve');
const payment = require('./modules/payment');
const onboarding = require('./modules/onboarding');
const qs = require('querystring');

// Check Method type (signup, buy)
const checkMethod = async (type, payload) => {
    console.log('check-method');
    const {method} = constants;
    switch (type) {
        case method.SIGNUP:
            console.log('signup');
            return await signup(payload);
        case method.RESERVE:
            return await reserve(payload);
        case method.PAYMENT:
            return await payment(payload);
        case method.ONBOARDING:
            return await onboarding(payload);
        default:
            return false;
    }
    ;
};

const processRequest = async (req, res) => {
    if (req.method === 'POST') {
        if (req.body === undefined) {
            res.status(400).send({
                status: 'Error',
                message: 'Invalid Payload'
            });
        } else {
            const {payload, type} = req.body;

            let result = await checkMethod(type, payload)
                .catch(err => {
                    res.status(400).send({
                        status: 'Error',
                        message: err.message
                    })
                });

            return res.status(200).send(result);
        }
    } else {
        res.status(400).send();
    }
};


// [START helloHttp]
function handleGET(req, res) {
    // Do something with the GET request
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(util.getHello() + ' Jr');
}

function handlePUT(req, res) {
    // Do something with the PUT request
    res.writeHead(403, {'Content-Type': 'text/plain'});
    res.end('Forbidden!');
}

const handlePOST = async (req, res) => {
    let body = '';
    req.on('data', function (data) {
        body += data;

        // Too much POST data, kill the connection!
        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        if (body.length > 1e6)
            req.connection.destroy();
    });

    req.on('end', function () {
        const {payload, type} = JSON.parse(body);
        checkMethod(type, payload);
    });
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(util.getHello() + ' Jr');
}

/**
 * Responds to a GET request with "Hello World!". Forbids a PUT request.
 *
 * @example
 * gcloud alpha functions call helloHttp
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
export function activeCampaignService(req, res) {
    const _cors = cors();
    _cors(req, res, () => {
        switch (req.method) {
            case 'GET':
                handleGET(req, res);
                break;
            case 'PUT':
                handlePUT(req, res);
                break;
            case 'POST':
                handlePOST(req, res);
                break;
            default:
                res.writeHead(500, {'Content-Type': 'application/javascript'});
                res.end(JSON.stringify({error: "Something blew up!"}));
                break;
        }
    });

};
