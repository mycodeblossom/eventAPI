
// set type of database to be used - memory database
process.env.DB_CONNECTION_TYPE = 'memory';
process.env.TEST_DATA = false;

let Event = require('../models/Event');

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

var app = require('../app');

describe('Events API - GET /events', function () {

    cleanDatabase();

    it('GET /events - should return empty list ', function (done) {
        chai.request(app)
            .get('/events')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
    });

    it('GET /events - should return list of one event', function (done) {
        const event = new Event(
            {
                title: 'Title2',
                description: 'Description2',
                start: new Date()
            });

        event.save(err => {
            chai.request(app)
                .get('/events')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    const returnedEvent = res.body[0];
                    returnedEvent.should.be.a('object');
                    returnedEvent.should.have.property('title');
                    returnedEvent.should.not.have.property('description');
                    done();
                });
        });
    });

    it('GET /events?type=past - should return list of one event', function (done) {
        const event = new Event(
            {
                title: 'Title2',
                description: 'Description2',
                start: new Date()
            });

        event.save(err => {
            chai.request(app)
                .get('/events')
                .query({ type: 'past' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                });
        });
    });

});

describe('Events API - GET /events/:id', function () {
    cleanDatabase();

    it('GET /events/:id - should return the requested event', function (done) {
        const event = new Event(
            {
                title: 'Title1',
                description: 'Description1',
                start: new Date()
            });

        event.save((err, book) => {
            chai.request(app)
                .get('/events/' + event.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('description');
                    res.body.should.have.property('start');
                    res.body.should.have.property('_id').eql(event.id);
                    done();
                });
        });
    });

    it('GET /events/:id - should return 404', function (done) {
        cleanDatabase();

        const event = new Event(
            {
                title: 'Title1',
                description: 'Description1',
                start: new Date()
            });

        event.save((err, event) => {
            chai.request(app)
                .get('/events/60f91a6c17112f1b21aaccf9')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
});
describe('Events API - POST /events', function () {
    it('POST /events- should return created event', (done) => {
        let event = {
            title: "Event title",
            description: "Event description",
            start: new Date()
        }
        chai.request(app)
            .post('/events')
            .send(event)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('title');
                res.body.should.have.property('description');
                done();
            });
    });
})

function cleanDatabase(){
    beforeEach((done) => {
        Event.deleteMany({}, (err) => {
            done();
        });
    });
}
