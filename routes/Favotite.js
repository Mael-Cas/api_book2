const express = require('express');
const FavoriteCtrl = require('../controllers/Favorite');


const router = express.Router();

router.get('/', FavoriteCtrl.GetAllFavorites);
router.get('/:id', FavoriteCtrl.GetOneFavorite);
router.post('/',FavoriteCtrl.CreateFavorite);
router.put('/:id', FavoriteCtrl.UpdateFavorite);
router.delete('/:id', FavoriteCtrl.DeleteFavorite);

module.exports = router;