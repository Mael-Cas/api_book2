const express = require('express');
const UserCtrl = require('../controllers/User');
const auth = require("../middleware/auth");



const router = express.Router();

router.get('/', auth.Auth, auth.admin, UserCtrl.GetAllUser);
router.get('/:id', auth.Auth, auth.admin, UserCtrl.GetOneUser);
router.post('/', UserCtrl.CreateUser);
router.put('/:id', auth.Auth, auth.user, UserCtrl.UpdateUser);
router.delete('/:id', auth.Auth, auth.user, UserCtrl.DeleteUser);
router.post('/login', UserCtrl.LoginUser);

module.exports = router;