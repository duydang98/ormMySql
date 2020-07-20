var express = require('express');
var router = express.Router();
var controller = require('../controller/user.controller');
var shema = require('../validation/user.validation');
//const validator = require('express-joi-validation').createValidator({});
var validator = require('../middlewares/users/auth.user');

// var multer  = require('multer');
// var upload = multer({ dest: './public/uploads/' });

var upload = require('../services/multer');

router.get('/user',controller.getUser);
router.get('/user/:id',controller.getOneUser);
router.post('/user', upload.array('avatar'),validator.validate,controller.createUser);
router.delete('/user/:id',controller.deleteUser);
router.put('/user/:id',controller.updateUser);
module.exports = router;