import mongoose from "mongoose";
const Schema = mongoose.Schema

const userDetail = new Schema({
    name: String,
    calorieRequirement: Number,
    mealPlan: [Schema.Types.Mixed]
},{timestamps:true})

const User = mongoose.model('User',userDetail);

export default User;