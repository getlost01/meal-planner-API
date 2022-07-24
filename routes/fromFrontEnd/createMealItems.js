import express from "express";
import mealItems from'../../models/meal.js';
const router = express.Router();

router.post('/',async(req,res,next)=>{
  try{
        mealItems.deleteMany({},function(err) {
            if (err) console.log(err)
        });
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
            res.send('okdone👍');

    } catch (error) {
    next(error)
    }
})

export default router;

// category1: 'Breakfast',
// name1: 'Aagam Jain',
// category2: 'Breakfast',
// name2: 'Aagam Jain',
// category3: 'Lunch',
// name3: 'Aagam Jain',
// category4: 'Breakfast',
// name4: 'Aagam Jain',
// category5: 'Breakfast',
// name5: 'Aagam Jain',
// meal1: '["Ice Cream","Eggs","Margarine","Carrot (Boiled)"]',
// meal2: '["Ice Cream","Eggs","Margarine"]',
// meal3: '["Cabbage (Boiled)"]',
// meal4: '["Eggs","Margarine","Carrot (Boiled)"]',
// meal5: '["Rice (White Boiled)","Cheese"]',