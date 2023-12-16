const Recipe = require("../models/Recipe");
const User = require("../models/User");


const getAllUsers = async (req, res)=>{
    try {
        const Users = await User.find();

        usersWithNecessaryDetails = Users.map((user)=>{
            const { username, _id } = user;

            if (username === "Admin") {
                return
            }

            return {
                username,
                _id
            } 
        })

        res.json(usersWithNecessaryDetails);
    } catch (error) {
        res.json({error : error.message});
    }
}

const getSingleUserData = async (req, res)=>{
    try {
        const {userId} = req.params;

        let recipes = await Recipe.find({
            userId
        })

        recipes = recipes.map((recipe)=>{
            return {
                name : recipe.name,
                time : recipe.time,
                mainIngredient : recipe.mainIngredient,
                note : recipe.note,
                createdAt : recipe.createdAt
            }
        })

        res.json(recipes)
    } catch (error) {
        res.json({error : error.message});
    }
}

module.exports = {
    getAllUsers,
    getSingleUserData
}
