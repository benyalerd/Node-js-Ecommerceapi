require('./database/db');
const express = require('express');
const app = express();
const winston = require('winston');
const {logConfiguration} = require('./helper/logging/logging');
const Login = require('./controller/loginController');
const port = process.env.PORT || 3000;
app.use('/api/login', Login);
const logger = winston.createLogger(logConfiguration);
process.on('uncaughtException',(ex)=>{    
    logger.error(JSON.stringify(ex));
    process.exit(1);
  });
process.on('unhandledRejection',(ex)=>{    
  logger.error(JSON.stringify(ex));
  process.exit(1);
});

app.listen(port,() =>{
 console.log('server is runing on port: ',port);
});