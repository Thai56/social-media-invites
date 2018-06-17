const request = require('supertest');

describe('', () => {
  let server;
  beforeEach(function() {
    server = require('./index.js');
  });
  afterEach(function() {
    server.close();
  });
  it('responds to /', (done) => {
     request(server)
    .get('/')
    .expect(200, done);
  });
  it('404 anything else', (done) => {
    request(server)
    .get('/foo/bar')
    .expect(404, done);
  });
});
