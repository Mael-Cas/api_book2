const express = require('express');
const BookCtrl = require('../controllers/Book');


const router = express.Router();

router.get('/', BookCtrl.GetAllBook);
router.get('/:id', BookCtrl.GetOneBook);
router.post('/',BookCtrl.CreateBook);
router.put('/:id',BookCtrl.UpdateBook);
router.delete('/:id',BookCtrl.DeleteBook);

module.exports = router;