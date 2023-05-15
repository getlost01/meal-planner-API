const foodItems = document.querySelector(".foodItems");
const totalClick = document.querySelector(".totalClick");
var foodData;

// if(!localStorage.getItem('firstTime')){
document.querySelector("#infobtn").click();
// localStorage.setItem('firstTime',"Okdone");
// }

document.querySelector(".loading-container").style.display="flex";
var allCon = document.querySelectorAll(".con");
setTimeout(()=>{document.querySelector(".loading-container").style.display="none";
allCon.forEach(ele => { ele.classList.remove("hidden")});  }, 500);

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

document.querySelector("#mybtn").addEventListener('click',()=>{
    document.querySelector(".loading-container").style.display="flex";
    document.querySelector(".con").classList.add("hidden");
})
