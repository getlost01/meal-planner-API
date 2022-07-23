const mealItems = document.querySelectorAll(".mealItems");
const totalClick = document.querySelector(".totalClick");
var foodData;

async function loadFoodData() {
    const response = await fetch('/api/fooditems');
    foodData = await response.json();
    // document.querySelector("#jsonData").value = JSON.stringify(foodData);
        mealItems.forEach((ele,i) => { 
            var temp = ``;
            Object.keys(foodData).forEach( item => {
                temp+= `
                <div class="items itemsMeal${i+1}"> ${item} <input type="checkbox" value="${item}" name="fooditem"> <i class="fa-solid fa-circle-check"></i> </div>
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
                console.log(document.querySelector(`#meal${index+1}`).value);
            })
        })
}
loadFoodData();

var inputEle = ['#meal1','#meal2','#meal3','#meal4','#meal5'];
inputEle.forEach( ele => {
    document.querySelector(ele).addEventListener('input',()=>{
        var count = 0;
        inputEle.forEach(obj =>{
            if(document.querySelector(ele).value)
            ++count;
        })
        console.log(count);
    })
});
