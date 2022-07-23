import express from "express";
import connectdb from './config/db.js';
import ejs from 'ejs'
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

connectdb();
app.listen(process.env.PORT || 3003, function(){
    console.log("➡️ Meal Planner listening on port %d in %s mode 👍", this.address().port, app.settings.env);
});

app.get('/',(req,res,next)=>{
    res.render('additem');
});

import foodData from'./foodData.js';
app.get('/show',(req,res,next)=>{
    res.send(foodData);
})

//------ Calling from FrontEnd

import addItemsRoutes from './routes/fromFrontEnd/foodItemAdd.js';
app.use('/addFoodItems', addItemsRoutes);

// ------ Calling from Postman
import foodItemsRoutes from './routes/postAPI/foodItem.js';
app.use('/fooditems', foodItemsRoutes);

import createMealRoutes from './routes/postAPI/createMeals.js';
app.use('/createmeal', createMealRoutes);

import usersRoutes from './routes/postAPI/user.js';
app.use('/user', usersRoutes);

app.get('/test',(req, res)=>{
    res.render('createmeal');
})

app.post('/temp',(req,res)=>{
    console.log(req.body);
    res.redirect('/test');
})
app.get('*', (req, res)=>{
    res.status(404).send({ "error" : "Not found 404"});
});