const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req,res,next){
    try
    {
const token = req.headers['x-auth-token'];
if(!token)return res.status(401).send('Access denied');
const decode = jwt.verify(token,config.get('jwtPrivateKey'));
req.merchantId = decode.id;
next();
    }
    catch(err){
       throw err;
    }

}
module.exports.auth = auth;