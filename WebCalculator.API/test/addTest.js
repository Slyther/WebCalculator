let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let expect = chai.expect;


chai.use(chaiHttp);
describe('Addition API', () => {
    describe('/POST add', () => {
        it('should POST the addition of 5 and 10', (done) => {
            chai.request(server)
            .post('/api/add')
            .send({num1: 5, num2: 10})
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('result').with.equal(15);
                done();
            });
        });

        it('should POST an error when sending strings', (done) => {
            chai.request(server)
            .post('/api/add')
            .send({num1: 5, num2: '10'})
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('errorMsg').with.equal('Invalid input.');
                done();
            });
        });
    });
});