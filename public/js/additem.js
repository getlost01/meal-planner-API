const foodItems = document.querySelector(".foodItems");
const totalClick = document.querySelector(".totalClick");
var foodData;

async function loadFoodData() {
    const response = await fetch('/show');
    foodData = await response.json();
    document.querySelector("#jsonData").value = JSON.stringify(foodData);
    foodData.foodItemsData.forEach( item => {
        foodItems.innerHTML+= `
        <div class="items"> ${item.name} <input type="checkbox" value="${item.name}" name="fooditem"> <i class="fa-solid fa-circle-check"></i> </div>
        `
    });
    const checked = document.querySelectorAll("input[type=checkbox]");
    checked.forEach(ele => {
        ele.addEventListener('click',()=>{
            var totalClicks = document.querySelectorAll("input[type=checkbox]:checked").length;
            if(totalClicks>=20)
                document.querySelector("#mybtn").disabled = false;
            else
                document.querySelector("#mybtn").disabled = true;
            totalClick.innerHTML = totalClicks;

        })
    });
}
loadFoodData();

