let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let expect = chai.expect;


chai.use(chaiHttp);
describe('Exponent API', () => {
    describe('/GET exp', () => {
        it('should GET the result of 2 to the power of 16', (done) => {
            chai.request(server)
            .get('/api/exp')
            .send({num1: 2, num2: 16})
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('result').with.equal(65536);
                done();
            });
        });

        it('should GET an error when sending strings', (done) => {
            chai.request(server)
            .get('/api/exp')
            .send({num1: 2, num2: '10'})
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('result').with.equal('Invalid input.');
                done();
            });
        });
    });
});