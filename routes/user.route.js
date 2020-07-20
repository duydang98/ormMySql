var express = require('express');
var router = express.Router();
var controller = require('../controller/user.controller');
var shema = require('../validation/user.validation');
//const validator = require('express-joi-validation').createValidator({});
var validator = require('../middlewares/users/auth.user');
var authEmail = require('../middlewares/users/authEmail.user');
var authEmailLogin = require('../middlewares/login/authEmail.login');
// var multer  = require('multer');
// var upload = multer({ dest: './public/uploads/' });

var upload = require('../services/multer');
//user
router.get('/user',controller.getUser);
router.get('/user/:id',controller.getOneUser);
router.post('/user', upload.array('avatar'),validator.validate,authEmail,controller.createUser);
router.delete('/user/:id',controller.deleteUser);
router.put('/user/:id',controller.updateUser);
//logint
router.post('/login',authEmailLogin,controller.login);
router.get('/me',controller.me);
module.exports = router;