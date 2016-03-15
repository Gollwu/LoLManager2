process.env.NODE_ENV = 'test';

var expect = require('chai').expect;
var request = require('supertest');

// testing routing
describe('loading express', function () {
    var server;
    beforeEach(function () {
        server = require('../server.js')();
    });    
    afterEach(function () {
        server.close();
    });
    
    describe('Exception', function() {
        it('responds to /', (done) => {
            request(server)
                .get('/')
                .expect(200, done);
        });
        it('404 everything else', (done) => {
            request(server)
                .get('/foo/bar')
                .expect(404, done);
        }); 
    });
    
    describe('Players routes', function() {
        it('responds to /players', (done) => {
            request(server)
                .get('/players')
                .expect(200, {}, done);
        });
        it('responds to /players/:playerid', (done) => {
            request(server)
                .get('/players/2')
                .expect(200)//, {id: 2}, done);
                // when it becomes more complicated do:
                .end((err, res) => {
                    expect(res.body.id).to.equal('2');
                    done();
                });
        });
        it('responds to /players/:playerid/affinityPlayer/:otherplayerid', (done) => {
            request(server)
                .get('/players/2/affinityPlayer/3')
                .expect(200, [{id: 2}, {id: 3}], done);
        });
        it('responds to /players/:playerid/affinityChampion/:championid', (done) => {
            request(server)
                .get('/players/2/affinityChampion/3')
                .expect(200, [{id: 2}, {id: 3}], done);
        });    
    });

    describe('Champions routes', function() {
        it('responds to /champions', (done) => {
            request(server)
                .get('/champions')
                .expect(200, {}, done);
        });    
    });

    describe('Teams routes', function() {
        it('responds to /teams', (done) => {
            request(server)
                .get('/teams')
                .expect(200, {}, done);
        });
        it('responds to /teams/:teamid', (done) => {
            request(server)
                .get('/teams/3')
                .expect(200, {id: 3}, done);
        });        
    });

});