import express from "express";
import foodItems from'../../models/foodItems.js';
const router = express.Router();

router.post('/',async(req,res,next)=>{
  try{
        foodItems.deleteMany({},function(err) {
            if (err) console.log(err)

        const data = req.body.fooditem;
        const jsonData = JSON.parse(req.body.jsonData).foodItemsData;

        var itemMap = {};
        jsonData.forEach(function(item) { itemMap[item.name] = item; });

        data.forEach(name => {
            const newUser = new foodItems( itemMap[name] );
            const result = newUser.save();
        })
        
        const myTimeout = setTimeout(()=>{res.render('createmeal');}, 1000);
        });
    } catch (error) {
    next(error)
    }
})

export default router;