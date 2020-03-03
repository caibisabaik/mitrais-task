let chai = require('chai');
let expect = require('chai').expect;
let chaiHttp = require('chai-http');
let fs = require('fs');

chai.use(chaiHttp);

let config = null;
const configFile = './config.json';

let configContent = fs.readFileSync(configFile, 'utf8');
    config = JSON.parse(configContent);
    console.log(config.apiEndpoint);

describe('API Testing', () => {
    it('mobile number validation', (done) => {
        const phoneData = {
            api: 'api/validphone',
            data: {
                api: 'api/validphone',
                data: {
                    phoneNumber : '081381330826'
                },
            },
        }
        chai.request(config.apiEndpoint)
            .post('/api/validphone')
            .send(phoneData)
            .end((err, res) => {
                expect(res.body).to.property('result', true);
                done();
            });
    });
    it('email validation', (done) => {
        const emailData = {
            api: 'api/validemail',
            data: {
                api: 'api/validemail',
                data: {
                    email : 'airlangga.p.p@gmail.com'
                },
            },
        }
        chai.request(config.apiEndpoint)
            .post('/api/validemail')
            .send(emailData)
            .end((err, res) => {
                expect(res.body).to.property('result', true);
                done();
            });
    });
    it('register user', (done) => {
        const userData = {
            api: 'api/register',
            data: {
                api: 'api/register',
                data: {
                    phoneNumber : '081381330826',
                    firstName   : 'airlangga',
                    lastName    : 'putera',
                    email       : 'airlangga.p.p@gmail.com',
                    birthDate   : '',
                    gender      : 'male'
                },
            },
        }
        chai.request(config.apiEndpoint)
            .post('/api/register')
            .send(userData)
            .end((err, res) => {
                expect(res.body).to.property('error', false);
                done();
            });
    });
  });