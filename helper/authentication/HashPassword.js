const bcrypt = require('bcrypt');

const GenerateSalt = function(){
    try
    {
    var salt = bcrypt.genSalt(10)
    return salt
    }
    catch (err) {
        throw err;
     }
};

HashPassword = function (password,salt){
    try
    {
    var hashPassword = bcrypt.hash(password,salt);
    return hashPassword;
    }
    catch (err) {
        throw err;
     }
};
module.exports.GenerateSalt = GenerateSalt;
module.exports.HashPassword = HashPassword;