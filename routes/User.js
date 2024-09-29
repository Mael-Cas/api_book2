const express = require('express');
const UserCtrl = require('../controllers/User');


const router = express.Router();

router.get('/', UserCtrl.GetAllUser);
router.get('/:id', UserCtrl.GetOneUser);
router.post('/', UserCtrl.CreateUser);
router.put('/:id', UserCtrl.UpdateUser);
router.delete('/:id', UserCtrl.DeleteUser);
router.post('/login', UserCtrl.LoginUser);

module.exports = router;