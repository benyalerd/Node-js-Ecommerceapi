const express = require('express');
const app = express();
const winston = require('winston');
const {logConfiguration} = require('./helper/logging/logging');
const Login = require('./controller/loginController');
const Register = require('./controller/merchantController');
const Shop = require('./controller/shopController');
const Payment = require('./controller/paymentController');
const Master = require('./controller/masterController');
const Shipping = require('./controller/shippingController');
const Product = require('./controller/productController');
const port = process.env.PORT || 3000;
app.use(express.json());
app.use('/api/login', Login);
app.use('/api/merchant', Register);
app.use('/api/shop',Shop);
app.use('/api/master',Master);
app.use('/api/payment',Payment);
app.use('/api/shipping',Shipping);
app.use('/api/product',Product);

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

