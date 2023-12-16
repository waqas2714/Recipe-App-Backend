const Recipe = require("../models/Recipe");

const addRecipe = async (req, res) => {
  const { name, time, mainIngredient, note } = req.body;
  const userId = req.user.userId;
  try {
    const recipe = await Recipe.create({
      name,
      time,
      mainIngredient,
      note,
      userId
    });

    res.json(recipe);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getRecipes = async (req, res) =>{
  const _id = req.user.userId;
  try {
    const recipes = await Recipe.find({userId : _id});
    
    res.json(recipes);
  } catch (error) {
    res.json({ error: error.message });
  }
}

const removeRecipes = async (req, res)=>{
  const {_id} = req.params;
  try {
    await Recipe.findByIdAndDelete(_id);

    res.json({message : "Removed"});
  } catch (error) {
    res.json({ error: error.message });    
  }
}

const updateRecipe = async (req, res)=>{
  const {_id} = req.params;
  const {name, time, mainIngredient, note} = req.body;
  try {
    const recipe = await Recipe.findByIdAndUpdate(_id, {
      name,
      time,
      mainIngredient,
      note
    })

    res.json(recipe);
  } catch (error) {
    res.json({ error: error.message });
  }
}

const getRecipe = async (req, res)=>{
  const {recipeId} = req.params;
  try {
    const recipe = await Recipe.findById(recipeId);
    
    res.json(recipe);
  } catch (error) {
    res.json({ error: error.message });
  }
}

module.exports = {
  addRecipe,
  getRecipes,
  removeRecipes,
  updateRecipe,
  getRecipe
};
