
module.exports.getUser= (req,res)=>{
    res.render('users/create');
};

module.exports.createUser = function (req,res){
    
    req.body.avatar = "aaaa";
    var user = req.body;
    console.log(user);
    res.json({
        result: user
    })
};