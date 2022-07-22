import mongoose from "mongoose";
const Schema = mongoose.Schema;

const mealDetail = new Schema({
    category: String,
    name: String,
    foodItems:[String]
},{timestamps:true})

const Meal = mongoose.model('Meal',mealDetail);

export default Meal;