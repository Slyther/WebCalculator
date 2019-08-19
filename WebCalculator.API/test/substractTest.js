let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let expect = chai.expect;


chai.use(chaiHttp);
describe('Substraction API', () => {
    describe('/POST substract', () => {
        it('should POST the subsctraction of 50 and 10', (done) => {
            chai.request(server)
            .post('/api/substract')
            .send({num1: 50, num2: 10})
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('result').with.equal(40);
                done();
            });
        });

        it('should POST an error when sending strings', (done) => {
            chai.request(server)
            .post('/api/substract')
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