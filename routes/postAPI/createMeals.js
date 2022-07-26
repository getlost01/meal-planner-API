import express from "express";
import foodItems from'../../models/foodItems.js';
import mealItems from'../../models/meal.js';
import foodCategory from'../../foodCategory.js';
const router = express.Router();
const category = ["Breakfast", "Lunch", "Evening Snack", "Dinner"];

router.get('/',async(req,res)=>{
    mealItems.find({}, function(err, mealItem) {
        res.send(mealItem);
    });
})


// Note: This part of the code is only for the postman or other API post request sending platforms.
// Firstly for evolve fit I am trying to create an API that automatically created a meal plan but due to lack of time and 
// food data resources I quit that plan and create a simple user derive web app, so the part of code is a kind of not usable code.
// Check algo , fromFrontEnd , patchAPI  and get part of postAPI routes. 

router.post('/',async(req,res,next)=>{
  try{
        mealItems.deleteMany({},function(err) {
            if (err) console.log(err)
        });

        var meals = {};
        foodItems.find({}, function(err, foodItem) {
            var itemMap = {"Breakfast":[], "Lunch":[], "Evening Snack":[], "Dinner":[],"Extra":[]};
            var approxVal = Math.round(foodItem.length / 5);

            foodItem.forEach(function(item) {
                if(foodCategory[item.name])
                {
                    if(itemMap[foodCategory[item.name].category].length < approxVal)
                    itemMap[foodCategory[item.name].category].push(item.name);
                    else
                    itemMap["Extra"].push(item.name);
                }
                else
                itemMap["Extra"].push(item.name);
            });

            for (let key in itemMap) {
                let catArray = itemMap[key];
                if(key!="Extra" && catArray.length < approxVal)
                {
                    while(catArray.length < approxVal){
                    catArray.push( itemMap["Extra"].pop());
                    }
                }
            }

            var checkMap = {"Breakfast":0, "Lunch":0, "Evening Snack":0, "Dinner":0,"Extra":0};
            itemMap["Extra"].forEach(function(item) {
                if(foodCategory[item])
                {
                     checkMap[foodCategory[item].category]++;
                }
                else
                    checkMap["Extra"]++;
            })

            var max = "Extra";
            for (let key in checkMap) {
                if(checkMap[key]>checkMap[max])
                    max = key;
            }
            var swapExtra = itemMap["Extra"];
            delete itemMap["Extra"];
            if(max == "Extra")
                itemMap["Lunch1"] = swapExtra;
            else
                itemMap[`${max}1`] = swapExtra;
            
            for (let key in itemMap) {
                var obj = {
                    category: key,
                    name: `${key} meal`,
                    foodItems:itemMap[key]
                }
                const newMeal = new mealItems( obj );
                const result = newMeal.save();
            }
            
            

            res.send(itemMap);
        });

    } catch (error) {
    next(error)
    }
})

router.get('/:category',async(req,res,next)=>{
    try{
            const category = req.params.category;
            const result = await mealItems.findOne({ category });
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