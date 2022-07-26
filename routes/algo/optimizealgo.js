import express from "express";
import Users from'../../models/user.js';
import foodItems from'../../models/foodItems.js';

const router = express.Router();
var mealCategories = ["Breakfast", "Lunch", "Evening Snack", "Dinner"];

router.get('/',async(req,res)=>{

    var data = {},foodData ={};
    var username,calReq,category;
    var mealArray2days = [];
    Users.find({}, (err, user)=>{
        user.forEach((userdata)=>{
          data[userdata.name] = userdata;
          username = userdata.name;
          calReq = userdata.calorieRequirement;
        });

        category = {"Breakfast":Math.ceil(calReq*0.27), "Evening Snack":Math.ceil(calReq*0.07), "Dinner":Math.ceil(calReq*0.27),"Lunch":Math.ceil(calReq*0.4)};
        foodItems.find({}, (err, foodItem)=>{
            foodItem.forEach((item)=>{
              foodData[item.name] = {
                totalcal: item.calories + item.protein*4,
                calories: item.calories,
                protein: item.protein,
                calStruct: `${item.calories}cal + ${item.protein}x4cal = ${item.calories + item.protein*4}cal/100g,`
              }
            });
                        var mealplan = data[username].mealPlan[0];
                        var usedItems = {};
                        var caloriesData = {};
                        for (let key in mealplan){
                            caloriesData[key] = {};
                            mealCategories.forEach(cat =>{
                                var items = mealplan[key][cat].foodItems;
                                var mainArray = [];
                                var tempArr = [];
                                items.forEach(ele =>{
                                        tempArr.push([ele,foodData[ele].totalcal])
                                        usedItems[ele] = foodData[ele];
                                })
                                tempArr.sort(function(a,b){return b[1] - a[1]});
                                var calReqCat = category[cat];
                                var quan;
                                tempArr.forEach(ele =>{
                                  if(ele[1]){
                                   quan = (calReqCat/ele[1]); 
                                  quan = Math.min(10,parseInt(quan));
                                  
                                  calReqCat -= quan*ele[1];
                                  }else{
                                    quan = 0;
                                  }
                                  mainArray.push({"foodItem":ele,"quantity":quan,"totalCalories":quan*ele[1]})
                              })
                                tempArr.forEach((ele,index )=>{ 
                                  if(ele[1]){
                                    quan = (calReqCat/ele[1]);
                                    if(quan - parseInt(quan) >= 0.75) quan = parseInt(quan)+0.75;
                                    else if(quan - parseInt(quan) >= 0.50) quan = parseInt(quan)+0.50;
                                    else if(quan - parseInt(quan) >= 0.25) quan = parseInt(quan)+0.25;
                                    else quan = parseInt(quan);
                                    
                                    calReqCat -= quan*ele[1]; 
                                  }else{
                                    quan = 0;
                                  }
                                    mainArray[index].quantity += quan;
                                    mainArray[index].totalCalories += quan*ele[1];
                                })
                                caloriesData[key][cat] = mainArray;
                            })
                    }
                    res.send({"username":username,"caloriesRequired":calReq,"foodData":usedItems,"caloriesData":caloriesData});
        });
    });
})

export default router;