import mongoose from "mongoose";
const Schema = mongoose.Schema;

const foodItemDetail = new Schema({
    name: String,
    calories: Number, 
    protein: Number,
    carb: Number, 
    fat: Number, 
    water: Number,
    vitamins: String,
    acceptedUnits:[String],
    itemWeight: Number
},{timestamps:true})

const foodItem = mongoose.model('Food-Item',foodItemDetail);

export default foodItem;