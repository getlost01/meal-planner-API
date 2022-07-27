import express from "express";
import User from'../../models/user.js';
import mealItems from'../../models/meal.js';

const router = express.Router();

router.post('/',async(req,res)=>{
    
    try{
    User.deleteMany({},function(err) {
        if (err) console.log(err);


    const data = req.body;
    var mealItemMap = {};
    var category = ["Breakfast", "Lunch", "Evening Snack", "Dinner"];

    var obj = {};
    var day1 = new Date().toISOString().split('T')[0];
    var day2 = new Date(new Date().getTime()+24*60*60*1000).toISOString().split('T')[0];
    obj[`${day1}`] = {};
    obj[`${day2}`] = {};
    mealItems.find({}, async function(err, mealItem) {
        mealItem.forEach(function(item) {
            mealItemMap[item._id] = { id: item._id, name: item.name , foodItems: item.foodItems};
        });
    category.forEach( ele => {
        obj[`${day1}`][`${ele}`] = mealItemMap[data[`category${ele}0`]];
        obj[`${day2}`][`${ele}`] = mealItemMap[data[`category${ele}1`]];
    });

    const newUser = new User({ name: data.name ,  calorieRequirement: data.calories, mealPlan: obj});
    const result = await newUser.save();
    const myTimeout = setTimeout(()=>{res.render('mealshow');}, 1000);
    });

    });
    } catch (error) {
        next(error)
    }
})

export default router;