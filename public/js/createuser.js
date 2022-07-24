const foodItems = document.querySelector(".foodItems");
const totalClick = document.querySelector(".totalClick");
var foodData;
var category = ["Breakfast", "Lunch", "Evening Snack", "Dinner"];

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

document.querySelector("#mybtn").addEventListener('click',()=>{
    document.querySelector(".loading-container").style.display="flex";
    document.querySelector(".con").classList.add("hidden");
})
