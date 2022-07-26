import express from "express";
import mealItems from'../../models/meal.js';
const router = express.Router();

router.post('/',async(req,res,next)=>{
  try{
        mealItems.deleteMany({},function(err) {
            if (err) console.log(err)

        const responseData = req.body;
        for (let i = 1;i<6 ;++i) {
                var obj = {
                    category: responseData[`category${i}`],
                    name: responseData[`name${i}`],
                    foodItems: JSON.parse(responseData[`meal${i}`])
                }
                const newMeal = new mealItems( obj );
                const result = newMeal.save();
            }
            setTimeout(()=>{res.render('createuser');}, 1000)
        });
    } catch (error) {
    next(error)
    }
})

export default router;
