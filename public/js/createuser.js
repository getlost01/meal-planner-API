const foodItems = document.querySelector(".foodItems");
const totalClick = document.querySelector(".totalClick");
var foodData;
var category = ["Breakfast", "Lunch", "Evening Snack", "Dinner"];

document.querySelector(".loading-container").style.display="flex";
var allCon = document.querySelectorAll(".con");
setTimeout(()=>{document.querySelector(".loading-container").style.display="none";
allCon.forEach(ele => { ele.classList.remove("hidden")});  }, 500);

const showitems = document.querySelectorAll(".showitems");
async function loadFoodData() {
    const response = await fetch('/api/createmeal');
    foodData = await response.json();

    var options = ``
    foodData.forEach( item => {
        options+= `
        <option value="${item._id}">${item.name} (${item.category})</option>
        `
    });
    showitems.forEach((obj,index)=>{
        category.forEach(ele => 
        {
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

