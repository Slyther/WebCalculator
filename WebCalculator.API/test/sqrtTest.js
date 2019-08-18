let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let expect = chai.expect;


chai.use(chaiHttp);
describe('Division API', () => {
    describe('/GET divide', () => {
        it('should GET the square root of 625', (done) => {
            chai.request(server)
            .get('/api/sqrt')
            .send({num1: 625})
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('result').with.equal(25);
                done();
            });
        });

        it('should GET an error when sending strings', (done) => {
            chai.request(server)
            .get('/api/sqrt')
            .send({num1: "625"})
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('result').with.equal('Invalid input.');
                done();
            });
        });

        it('should GET an error when sending negative numbers', (done) => {
            chai.request(server)
            .get('/api/sqrt')
            .send({num1: -625})
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('result').with.equal('Invalid input.');
                done();
            });
        });
    });
});