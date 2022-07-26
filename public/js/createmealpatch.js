const mealItems = document.querySelectorAll(".mealItems");
var foodData, mealData;
var inputEle = ['#meal1','#meal2','#meal3','#meal4','#meal5'];

document.querySelector(".loading-container").style.display="flex";
var allCon = document.querySelectorAll(".con");
setTimeout(()=>{document.querySelector(".loading-container").style.display="none";
allCon.forEach(ele => { ele.classList.remove("hidden")});  }, 500);

async function loadFoodData() {
    const response = await fetch('/api/fooditems');
    foodData = await response.json();
    const response1 = await fetch('/api/createmeal');
    mealData = await response1.json();

        mealItems.forEach((ele,i) => { 
            var temp = ``;
            var itemObj = {};
            document.querySelector(`#name${i+1}`).value = mealData[i].name;
            document.querySelector(`#category${i+1}`).value = mealData[i].category;
            document.querySelector(`#id${i+1}`).value = mealData[i]._id;
            mealData[i].foodItems.forEach(item=>{
                itemObj[item] = item;
            })
            Object.keys(foodData).forEach( item => {
                temp+= `
                <div class="items itemsMeal${i+1}"> ${item} <input type="checkbox" ${(itemObj[item])?"checked":""} value="${item}" name="fooditem"> <i class="fa-solid fa-circle-check"></i> </div>
                `
            });
            ele.innerHTML = temp; 
        })
        var elements = ['#createMeal1','#createMeal2','#createMeal3','#createMeal4','#createMeal5'];
        elements.forEach((ele,index) => {
            document.querySelector(`${ele}`).addEventListener('click',()=>{
                var totalMeals = document.querySelectorAll(`.itemsMeal${index+1} input[type=checkbox]:checked`);
                var defaultCon = document.querySelector(`.showitems${index+1}`);
                var itemArray = [];
                defaultCon.innerHTML = ``;
                totalMeals.forEach(detail => {
                    itemArray.push(detail.value);
                    defaultCon.innerHTML += `
                        <div class="items">${detail.value}</div>
                    `
                })
                document.querySelector(`#meal${index+1}`).value = JSON.stringify(itemArray);
                document.querySelector(`.personalDet${index+1}`).innerHTML = `
                    Category : ${document.querySelector(`#category${index+1}`).value} &nbsp; &nbsp; &nbsp;
                    Name : ${document.querySelector(`#name${index+1}`).value}
                `
                checkBtn();
            })
        })
        elements.forEach(obj =>{
            document.querySelector(obj).click();
        })
}
loadFoodData();


function checkBtn(){
    var count = 0;
    inputEle.forEach(obj =>{
        if(document.querySelector(obj).value && document.querySelector(obj).value!='[]')
        ++count;
    })
    if(count>=5)
        document.querySelector("#mybtn").disabled = false;
    else
        document.querySelector("#mybtn").disabled = true;
}

document.querySelector("#mybtn").addEventListener('click',()=>{
    document.querySelector(".loading-container").style.display="flex";
    document.querySelector(".con").classList.add("hidden");
})
