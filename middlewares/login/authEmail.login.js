var User = require('../../models/user.model');

module.exports = async (req,res,next)=>{
    var user = await User.findAll({
        where: {
            email: req.body.email
        }
    });
    //console.log(user);
    if(user.length === 0){
       return res.json({
            message: "khong tim thay email"
        });

    }
    next();
}