var express = require('express');
var router = express.Router();
var controller = require('../controller/user.controller');
var shema = require('../validation/user.validation');
const validator = require('express-joi-validation').createValidator({});

var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' });


router.get('/user',controller.getUser);
router.get('/user/:id',controller.getOneUser);
router.post('/user',upload.single('avatar'),validator.body(shema.userschema),controller.createUser);
router.delete('/user/:id',controller.deleteUser);
router.put('/user/:id',controller.updateUser);
module.exports = router;