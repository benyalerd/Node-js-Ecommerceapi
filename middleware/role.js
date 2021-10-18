function ownerRole (req,res,next){
    if(req.role != 1)return res.status(403).send('Access denies');
    next();
}

function adminRole(req,res,next){
    if(req.role != 1)return res.status(403).send('Access denies');
    next()
}
module.exports.ownerRole = ownerRole;
module.exports.adminRole = adminRole;
