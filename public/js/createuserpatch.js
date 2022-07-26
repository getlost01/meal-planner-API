const foodItems = document.querySelector(".foodItems");
const totalClick = document.querySelector(".totalClick");
var foodData,userData,username,dates=[];
var category = ["Breakfast", "Lunch", "Evening Snack", "Dinner"];

document.querySelector(".loading-container").style.display="flex";
var allCon = document.querySelectorAll(".con");
setTimeout(()=>{document.querySelector(".loading-container").style.display="none";
allCon.forEach(ele => { ele.classList.remove("hidden")});  }, 500);

const showitems = document.querySelectorAll(".showitems");
async function loadFoodData() {
    const response = await fetch('/api/createmeal');
    foodData = await response.json();
    const response1 = await fetch('/api/user');
    userData = await response1.json();
   
    for (let key in userData){username = key;};
    for (let key in userData[username].mealPlan[0]){dates.push(key)};

    var mealPlanData = userData[username].mealPlan[0];
    document.querySelector("#name").value = username;
    document.querySelector("#calories").value = userData[username].calorieRequirement;
    showitems.forEach((obj,index)=>{
        category.forEach(ele => 
        {
            var options = ``;
            foodData.forEach( item => {
                options+= `
                <option value="${item._id}" ${(mealPlanData[dates[index]][ele].id === item._id)?"selected":""}>${item.name} (${item.category})</option>
                `;
            });
            obj.innerHTML+=`
            <div class="col-12 col-md-6 col-lg-3 selectionBox">
                    <div class="title">${ele}</div>
                    <select name="category${ele}${index}" required value="">
                        <option value="">Select meal name</option>
                        ${options}
                    </select>
                </div> `
        });
    })
}
loadFoodData();