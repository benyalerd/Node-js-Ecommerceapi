const winston = require('winston');
require('winston-mongodb');

const logConfiguration = {
    'transports': [
        new winston.transports.MongoDB({
            level: 'error',
            // mongo database connection link
            db: 'mongodb+srv://benya:o9CMqbTisDornkeU@nodeservice.qmdjx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
            options: {
              useUnifiedTopology: true,
              useNewUrlParser: true,
            },
            // A collection to save json formatted logs
            collection: 'server_logs',
            format: winston.format.combine(
              winston.format.timestamp(),
              // Convert logs to a json format
              winston.format.json(),
              winston.format.errors({ stack: true }),
              winston.format.metadata()
            ),
          })
    ]
};
module.exports.logConfiguration =  logConfiguration;