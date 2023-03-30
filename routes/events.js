const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

const dbOperation = async (req, res, fn, statusFunction) => {
    try {
        const result = await fn();
        let status = '200';
        if(statusFunction){
            status = statusFunction(result);
        }
        res.status(status).send(result)
    } catch (err) {
        console.log('Error in dbOperation', err)
        res.status(500).send({ message: 'Something went wrong' });
    }
}

router.get('/', async (req, res) => {
    const type = req.query.type;
    let result;

    await dbOperation(req, res, async () => {
        switch (type) {
            case 'past':
                result = await eventController.getPastEvents();
                break;
            case 'future':
                result = await eventController.getFutureEvents();
                break;
            default:
                result = await eventController.getAllEvents();
        }
        return result;
    })
});

router.post('/', async (req, res) => {
    await dbOperation(req, res, async () => {
        const input = req.body
        const savedEvent = await eventController.createEvent(input);
        return savedEvent;
    });
});

router.get('/:eventId', async (req, res) => {
    await dbOperation(req, res, async () => {
        const eventId = req.params.eventId;
        const event = await eventController.getEventById(eventId);
        return event;
    },
    res => res ? '200' : '404'
    );
});

module.exports = router
