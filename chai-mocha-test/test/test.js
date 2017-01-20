let expect = require('chai').expect;
let request = require("request");

describe('A basic test chai mocha edited', function() {
  //this.timeout(150000);
  it('should pass if everything is ok', function(done) {

    let url = "http://localhost:8000/scores"
    request(url, function(error, res, body) {
      //expect(true).to.be.false;
      console.log(body);
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
