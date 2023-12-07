const { addRecipe, getRecipes, removeRecipes, updateRecipe, getRecipe } = require('../controllers/recipeController');

const router = require('express').Router();

router.post("/addRecipe", addRecipe);
router.get("/getRecipes/:_id", getRecipes);
router.get("/getRecipe/:recipeId", getRecipe);
router.delete("/deleteRecipe/:_id", removeRecipes);
router.put("/updateRecipe/:_id", updateRecipe);

module.exports = router;
