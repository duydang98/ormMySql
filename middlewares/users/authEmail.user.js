var User = require('../../models/user.model');

module.exports = async (req,res,next)=>{

    var user = await User.findAll({
        where: {
         email: req.body.email
        }
      });
    //console.log();
    if(user.length !== 0){
        return res.json({
            status: "email da ton tai"
        });
    }
     next();
    
}