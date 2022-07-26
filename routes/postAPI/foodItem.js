// Note: this part of code is only for postman or other API post request sending plateforms

import express from "express";
import foodItems from'../../models/foodItems.js';
const router = express.Router();

router.get('/',async(req,res)=>{
    foodItems.find({}, function(err, foodItem) {
        var itemMap = {};
    
        foodItem.forEach(function(item) {
          itemMap[item.name] = item;
        });
        res.send(itemMap);
    });
})

// Note: This part of the code is only for the postman or other API post request sending platforms.
// Firstly for evolve fit I am trying to create an API that automatically created a meal plan but due to lack of time and 
// food data resources I quit that plan and create a simple user derive web app, so the part of code is a kind of not usable code.
// Check algo , fromFrontEnd , patchAPI  and get part of postAPI routes. 

router.post('/',async(req,res,next)=>{
  try{
        foodItems.deleteMany({},function(err) {
            if (err) console.log(err)
         });

        const data = req.body.foodItemsData;
        data.forEach(obj => {
            const newUser = new foodItems( obj );
            const result = newUser.save();
        })
        const updated = { "Message" : "Yay your data have been added👍" , data}
        res.send(updated);
    } catch (error) {
    next(error)
    }
})

router.get('/:foodItem',async(req,res,next)=>{
    try{
            const name = req.params.foodItem;
            const result = await foodItems.findOne({ name });
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