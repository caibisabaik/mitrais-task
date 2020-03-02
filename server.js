var fs = require ('fs');
var express = require('express');
var https = require('https');
var bodyParser = require('body-parser');
var register = require('./routes/api/registerAPI');

let config = null;
const configFile = './config.json';

try {
    let configContent = fs.readFileSync(configFile, 'utf8');
    config = JSON.parse(configContent);
    console.log(config);
} catch (err) {
    console.error("error reading "+configFile+"\r\n"+err);   
}

if(config != null) {
    const httpRouter = express();

    httpRouter.use(bodyParser.json());
    httpRouter.use(bodyParser.urlencoded({ extended: false }));

    httpRouter.use(express.static('./client'));
    httpRouter.use('/register', register())

    if(config.ssl.enabled) {
        https.createServer({
            key: config.ssl.key,
            cert: config.ssl.cert
        }, httpRouter).listen(config.http.port, config.http.bind, () => {
            console.log('https listening on port ', config.http.port, ' bound on ' + config.http.bind);
        });
    } else {
        httpRouter.listen(config.http.port, config.http.bind, () => {
            console.log('http listening on port ', config.http.port, ' bound on ' + config.http.bind);
        });
    }
}