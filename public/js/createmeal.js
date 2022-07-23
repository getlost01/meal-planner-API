const mealItems = document.querySelectorAll(".mealItems");
const totalClick = document.querySelector(".totalClick");
var foodData;

async function loadFoodData() {
    const response = await fetch('/api/fooditems');
    foodData = await response.json();
    // document.querySelector("#jsonData").value = JSON.stringify(foodData);
    var temp = ``;
    Object.keys(foodData).forEach( item => {
        temp+= `
        <div class="items"> ${item} <input type="checkbox" value="${item}" name="fooditem"> <i class="fa-solid fa-circle-check"></i> </div>
        `
    });
        mealItems.forEach(ele => { ele.innerHTML = temp; })
    // const checked = document.querySelectorAll("input[type=checkbox]");
    // checked.forEach(ele => {
    //     ele.addEventListener('click',()=>{
    //         var totalClicks = document.querySelectorAll("input[type=checkbox]:checked").length;
    //         if(totalClicks>=20)
    //             document.querySelector("#mybtn").disabled = false;
    //         else
    //             document.querySelector("#mybtn").disabled = true;
    //         totalClick.innerHTML = totalClicks;

    //     })
    // });
}
loadFoodData();
