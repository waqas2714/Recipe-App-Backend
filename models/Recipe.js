const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      time: {
        type: Number,
        required: [true, "Please enter time in minutes."],
      },
      mainIngredient: {
        type: String,
        required: [true, "Please enter the main ingredient."],
      },
      note: {
        type: String
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );
  
// Create the User model using the defined schema
const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe; // Export the User model to use in other parts of your application
