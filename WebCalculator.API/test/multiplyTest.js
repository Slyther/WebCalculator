let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let expect = chai.expect;


chai.use(chaiHttp);
describe('Multiplication API', () => {
    describe('/GET multiply', () => {
        it('should GET the product of 50 and 10', (done) => {
            chai.request(server)
            .get('/api/multiply')
            .send({num1: 50, num2: 10})
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('result').with.equal(500);
                done();
            });
        });

        it('should GET an error when sending strings', (done) => {
            chai.request(server)
            .get('/api/multiply')
            .send({num1: 50, num2: '10'})
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('result').with.equal('Invalid input.');
                done();
            });
        });
    });
});