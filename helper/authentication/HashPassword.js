const bcrypt = require('bcrypt');

const generateSalt = function(){
    try
    {
    var salt = bcrypt.genSalt(10)
    return salt
    }
    catch (err) {
        throw err;
     }
};

hashPassword = function (password,salt){
    try
    {
    var hashPassword = bcrypt.hash(password,salt);
    return hashPassword;
    }
    catch (err) {
        throw err;
     }
};
module.exports.GenerateSalt = generateSalt;
module.exports.HashPassword = hashPassword;