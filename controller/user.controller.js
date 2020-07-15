
  var User = require('../models/user.model');

module.exports.getUser= async (req,res)=>{
    var user = await User.findAll();
    res.json(user); 
    //res.render('users/create');
};

module.exports.getOneUser= async (req,res)=>{
    var id = req.params.id;
   
    var user = await User.findAll({
        where: {
         id: id
        }
      });
    res.json({
        messess: "find user susses",
        user: user
    }); 
    //res.render('users/create');
};

module.exports.createUser = async function (req,res){
    

    //req.body.avatar = "aaaa";
    var user = req.body;
    await User.create(user);
    //console.log(user);
    res.json({
        result: user
    })
};

module.exports.deleteUser = async (req,res)=>{
    var id = req.params.id;
    
    var user = await User.findAll({
        where: {
         id: id
        }
      });
    await User.destroy({
        where: {
         id: id
        }
      });
      res.json({
        messes: "delete suscess",
        delete: user
    })
};

module.exports.updateUser = async (req,res)=>{
    var id = req.params.id;
    await User.update(req.body,{
        where: {
         id: id
        }
      });
      var user = await User.findAll({
        where: {
         id: id
        }
      });
      res.json({
        messess: "update user susses",
        user: user
    });
};