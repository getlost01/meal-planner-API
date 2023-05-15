import express from "express";
import connectdb from './config/db.js';
import path from 'path';

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

app.get('/test',(req,res,next)=>{
    res.render('mealshow');
})

//------ Calling from FrontEnd

import addItemsRoutes from './routes/fromFrontEnd/foodItemAdd.js';
app.use('/addFoodItems', addItemsRoutes);

import createMealItemRoutes from './routes/fromFrontEnd/createMealItems.js';
app.use('/createMealItem', createMealItemRoutes);

import createUserItemRoutes from './routes/fromFrontEnd/createUser.js';
app.use('/createUser', createUserItemRoutes);

import updatemealRoutes from './routes/patchAPI/createmealpatch.js';
app.use('/updatemeal', updatemealRoutes);

app.get('/skip/showmeal', (req, res)=>{
    res.render('mealshow');
});

app.post('/mealupdate',(req, res)=>{ res.render('createmeal',{response:"patch"});})

app.post('/updatemealplan',(req, res)=>{ res.render('createuser',{response:"patch"});})


//------- Algo

import algoRoutes from './routes/algo/optimizealgo.js';
app.use('/api/mealplan', algoRoutes);

// ------ APIs
import foodItemsRoutes from './routes/postAPI/foodItem.js';
app.use('/api/fooditems', foodItemsRoutes);

import createMealRoutes from './routes/postAPI/createMeals.js';
app.use('/api/createmeal', createMealRoutes);

import usersRoutes from './routes/postAPI/user.js';
app.use('/api/user', usersRoutes);

app.get('*', (req, res)=>{
    res.render('error');
});