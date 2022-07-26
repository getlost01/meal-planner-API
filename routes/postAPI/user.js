// Note: this part of code is only for postman or other API post request sending plateforms

import express from "express";
import User from'../../models/user.js';
import mealItems from'../../models/meal.js';
import foodItems from'../../models/foodItems.js';

const router = express.Router();

router.get('/',async(req,res)=>{
    User.find({}, function(err, user) {
        var itemMap = {};
    
        user.forEach(function(item) {
          itemMap[item.name] = item;
        });
        res.send(itemMap);
    });
})

// Note: This part of the code is only for the postman or other API post request sending platforms.
// Firstly for evolve fit I am trying to create an API that automatically created a meal plan but due to lack of time and 
// food data resources I quit that plan and create a simple user derive web app, so the part of code is a kind of not usable code.
// Check algo , fromFrontEnd , patchAPI  and get part of postAPI routes. 

router.post('/',async(req,res)=>{
    User.deleteMany({},function(err) {
        if (err) console.log(err)
    });

    var foodData = {};
    foodItems.find({}, function(err, foodItem) {
    
        foodItem.forEach(function(item) {
          foodData[item.name] = item;
        });
    });
    
    var obj = {};
    var calorie = 0;
    mealItems.find({}, async(err, mealItem) => {
        var day1 = new Date().toISOString().split('T')[0];
        var day2 = new Date(new Date().getTime()+24*60*60*1000).toISOString().split('T')[0];
        obj[`${day1}`] = {};
        obj[`${day2}`] = {};
        var diff,diffData;
        mealItem.forEach(function(item) {
            var category = item.category;
            if(category[category.length-1]==='1'){
                diff = category.substring(0,category.length-1);
                diffData = item.foodItems;
            }
            else{
                obj[`${day1}`][`${category}`] = item.foodItems;
                obj[`${day2}`][`${category}`] = item.foodItems;
                item.foodItems.forEach(ele => {
                    calorie += foodData[ele].calories;
                });
            }
        });
        if(diff){
            obj[`${day2}`][`${diff}`] = diffData;
         }

        const newUser = new User({ name: "DummayAagam" ,  calorieRequirement: calorie, mealPlan: obj});
        const result = await newUser.save();
        res.send(result);
    });
        
})

router.patch('/:id',async(req,res,next)=>{
    try{
    const id = req.params.id;
    const { name ,age } = req.body;
    const result = await User.findOne({ name :id });
    if(!result)
    {
        res.status(404).send({ "error" : "Not found 404"});
        return;
    }   
    const updated =  await result.updateOne(
        { name : (name)?name:result.name ,
            age : (age)?age:result.age 
        }
    )
    res.send("Updation done");
    } catch (error) {
    next(error)
     }
})

router.get('/:name',async(req,res,next)=>{
    try{
    const name = req.params.name;
    const result = await User.findOne({ name });
    if(!result)
    {
        res.status(404).send({ "error" : "Not found 404"});
        return;
    }
    res.send(result);
    } catch (error) {
    next(error)
     }
})

export default router;