import express from "express";
import connectdb from './config/db.js';

const app = express();
app.use(express.json());

connectdb();
app.listen(process.env.PORT || 3003, function(){
    console.log("➡️ Meal Planner listening on port %d in %s mode 👍", this.address().port, app.settings.env);
});

app.get('/',(req,res,next)=>{
    res.send('hello');
});

import usersRoutes from './routes/postAPI/user.js';
app.use('/user', usersRoutes);

import foodData from'./foodData.js';
app.get('/show',(req,res,next)=>{
    res.send(foodData);
})

import foodItemsRoutes from './routes/postAPI/foodItem.js';
app.use('/fooditems', foodItemsRoutes);

import createMealRoutes from './routes/postAPI/createMeals.js';
app.use('/createmeal', createMealRoutes);
