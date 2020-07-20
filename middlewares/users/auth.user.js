var Schema = require('../../validation/user.validation');

module.exports.validate = (req,res,next)=>{
    var user = req.body;
    console.log(user);
    var value = Schema.userschema.validate(user);
    console.log(value);
    if(value.error){
        res.json({email: "Du lieu khong hop le"});
        return;
    }
    next();
}