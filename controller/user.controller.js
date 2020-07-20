
var User = require('../models/user.model');
var cloudinary = require('../services/cloudinary');
var fs = require('fs');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
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
    
  const uploader = async (path) => await cloudinary.uploads(path, 'Images/Users');
  
  const urls = [];
  const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path)
      urls.push(newPath)
      fs.unlinkSync(path)
    }
    for(const url of urls){
        if(url){
         
          req.body.avatar = url.url;
        }
        
    }
    
    var user = req.body;
    user.password = bcrypt.hashSync(user.password,8);
    await User.create(user);

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

module.exports.login = async (req,res)=>{
 
  var user = await User.findOne({where:{email: req.body.email}});
  var hashPassword = bcrypt.compareSync(req.body.password,user.password);
        if(hashPassword){

             var token = jwt.sign({ id: user.id },process.env.JWT_SECRET, {
                 expiresIn: 1200 // expires in 5m
               });

               res.status(200).send({ auth: true, token: token });

        }else{
          res.status(200).send({ auth: false, token: null });
        }
  
}

module.exports.me = (req,res)=>{
  var token = req.headers['x-access-token'];
  if(!token){
    res.status(401).json({auth: false, message: 'No token'});
    return;
  };

  jwt.verify(token,process.env.JWT_SECRET, async (err,decoded)=>{
    if(err) return res.status(500).json({
      auth: false,
      message: "failed to authenticate token"
    });
    //res.status(200).json(decoded);
    
    var user = await User.findOne({
      attributes: {exclude : ['password']},
      where : { id: decoded.id}
    });
    
    res.json(user);
   
   });
}

