let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let expect = chai.expect;


chai.use(chaiHttp);
describe('Division API', () => {
    describe('/POST divide', () => {
        it('should POST the divion of 50 and 10', (done) => {
            chai.request(server)
            .post('/api/divide')
            .send({num1: 50, num2: 10})
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('result').with.equal(5);
                done();
            });
        });

        it('should POST an error when sending strings', (done) => {
            chai.request(server)
            .post('/api/divide')
            .send({num1: 50, num2: '10'})
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('errorMsg').with.equal('Invalid input.');
                done();
            });
        });
    });
});