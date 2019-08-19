let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let expect = chai.expect;


chai.use(chaiHttp);
describe('Exponent API', () => {
    describe('/POST exp', () => {
        it('should POST the result of 2 to the power of 16', (done) => {
            chai.request(server)
            .post('/api/exp')
            .send({num1: 2, num2: 16})
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('result').with.equal(65536);
                done();
            });
        });

        it('should POST an error when sending strings', (done) => {
            chai.request(server)
            .post('/api/exp')
            .send({num1: 2, num2: '10'})
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('errorMsg').with.equal('Invalid input.');
                done();
            });
        });
    });
});