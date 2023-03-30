# README #

REST api for retrieving and creating events. The server is listening to port 3000.

## Set up
1. Install the project 
    `npm install`
2. Start the server
    `npm start`
## Run unit tests

1. Install the project 
    `npm install`
2. Start the server
    `npm test`
## API

### GET /events
Returns all events. Returns only the title, start and _id of each event.

### GET /events?type=past
Returns past events. An event is considered past if the start date is less or equal to current date.  Returns only the title, start and _id of each event.

### GET /events?type=future
Returns future events. An event is considered future if the start date is greater than the current date.  Returns only the title, start and _id of each event.

### GET /event/:id
Return event by id. All details of the event are returned.

### POST /events
Creates new event.Expects as input object with title, description and start.
## Configuration
* **.env** file
    * DB_CONNECTION - MongoDB database uri can be specified 
    * DB_CONNECTION_TYPE - if the value 'memory', a memory database is used and the records are not saved after the server is stopped
    * SERVER_PORT - server port where the api is listening
    * TEST_DATA - if set to true, some sample data is inserted in the database when the server is started
## Dependencies
* dotenv
* express
* mongodb-memory-server
* mongoose
## Database configuration 
By default memory database is used (to specify database, the variable DB_CONNECTION can be used and variable DB_CONNECTION_TYPE should be changed)
