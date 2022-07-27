import express from "express";
import mealItems from'../../models/meal.js';
const router = express.Router();

router.post('/',async(req,res,next)=>{
  try{
        mealItems.find({}, function(err, mealItem) {

        const responseData = req.body;
        for (let i = 1;i<6 ;++i) {
                mealItems.updateOne({_id: `${responseData[`id${i}`]}`},{
                    category: responseData[`category${i}`],
                    name: responseData[`name${i}`],
                    foodItems: JSON.parse(responseData[`meal${i}`])
                }, function (err) {
                    if (err){console.log(err);} 
                });
            }
            setTimeout(()=>{res.render('createuser',{response:"patch"});}, 2000)
        });
    } catch (error) {
    next(error)
    }
})

export default router;
