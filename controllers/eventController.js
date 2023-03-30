const Event = require('../models/Event');

const summaryProperties = { title: 1, start: 1, _id: 1 };

module.exports.getPastEvents = async function () {
    const dt = new Date();
    const events = await Event.find({ start: { $lt: dt } }, summaryProperties).sort({ "start": 'desc' });
    return events;
}

module.exports.getFutureEvents = async function () {
    const dt = new Date();
    const events = await Event.find({ start: { $gte: dt } }, summaryProperties).sort({ "start": 'asc' });
    return events;
}

module.exports.getAllEvents = async function () {
    const events = await Event.find({},summaryProperties).sort({ "start": 'desc' },);
    console.log('Events', events)
    return events;
}

module.exports.createEvent = async function (input) {
    const event = new Event(
        {
            title: input.title,
            description: input.description,
            start: new Date(input.start)
        });

    const savedEvent = await event.save();
    return savedEvent;
};

module.exports.getEventById = async function (id) {
    const event = await Event.findById(id);
    return event;
}

module.exports.insertTestData = async function(){
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const eventLst = [
        new Event({title: 'Event title 1', description: 'Description of event 1', start: new Date(year, month, day-1, hours, minutes)}),
        new Event({title: 'Event title 2', description: 'Description of event 2', start: new Date(year, month, day-1, hours, minutes) }),

        new Event({title: 'Event title 3', description: 'Description of event 3', start: new Date(year, month, day, hours, minutes+4) }),
        new Event({title: 'Event title 4', description: 'Description of event 4', start: new Date(year, month, day +1, hours, minutes )}),
        new Event({title: 'Event title 5', description: 'Description of event 5', start: new Date(year, month, day +2 , hours, minutes)}),
    ]
    await Event.insertMany(eventLst);
    console.log('Test data inserted')
}
