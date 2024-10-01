const express = require('express');
const FavoriteCtrl = require('../controllers/Favorite');
const auth = require('../middleware/auth');


const router = express.Router();
router.use(auth.Auth)

router.get('/', auth.admin,FavoriteCtrl.GetAllFavorites);
router.get('/:id', auth.user,FavoriteCtrl.GetOneFavorite);
router.post('/',auth.user,FavoriteCtrl.CreateFavorite);
router.put('/:id', auth.user,FavoriteCtrl.UpdateFavorite);
router.delete('/:id', auth.user,FavoriteCtrl.DeleteFavorite);

module.exports = router;