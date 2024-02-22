const { addRecipe, getRecipes, removeRecipes, updateRecipe, getRecipe, adminRecipes } = require('../controllers/recipeController');
const validateToken = require('../middlewares/validate');

const router = require('express').Router();

router.post("/addRecipe", validateToken, addRecipe);
router.get("/getRecipes", validateToken, getRecipes);
router.get("/getRecipe/:recipeId", validateToken, getRecipe);
router.delete("/deleteRecipe/:_id", validateToken, removeRecipes);
router.put("/updateRecipe/:_id", validateToken, updateRecipe);
router.get("/adminRecipes", validateToken, adminRecipes);

module.exports = router;
