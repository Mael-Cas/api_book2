const express = require('express');
const BookCtrl = require('../controllers/Book');
const auth = require('../middleware/auth');


const router = express.Router();

router.use(auth.Auth)

router.get('/', auth.user ,BookCtrl.GetAllBook);
router.get('/:id', auth.user, BookCtrl.GetOneBook);
router.post('/', auth.admin,BookCtrl.CreateBook);
router.put('/:id',auth.admin,BookCtrl.UpdateBook);
router.delete('/:id',auth.admin,BookCtrl.DeleteBook);

module.exports = router;