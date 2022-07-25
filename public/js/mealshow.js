var foodData;
var category = ["Breakfast", "Lunch", "Evening Snack", "Dinner"];
var dates = [];
const showitems = document.querySelectorAll(".showitems");
async function loadFoodData() {
    const response = await fetch('/api/mealplan');
    foodData = await response.json();

    for (let key in foodData.caloriesData){
        dates.push(key);
    }
    document.querySelector('#name').innerHTML = foodData.username;
    document.querySelector('#calories').innerHTML = foodData.caloriesRequired;

    showitems.forEach((obj,index)=>{
        category.forEach(ele => 
        {
            var options=``,totalcal=``;
            var calSum = 0;
            foodData.caloriesData[dates[index]][ele].forEach( item => {
                options+= `
                <div>🔘 ${item.foodItem[0]} <span style="font-weight:700">${item.quantity*100}g </span></div>
                `;
                calSum += parseInt(item.totalCalories);
                totalcal+=`${parseInt(item.totalCalories)} `;
            });
            totalcal = totalcal.substring(0,totalcal.length-1);
            totalcal = totalcal.replace(/\s+/g,"+");
            totalcal += ` = ${calSum} cal`
            obj.innerHTML+=`
            <div class="col-12 col-md-6 col-lg-3 selectionBox">
                    <div class="title">${ele}</div>
                    <div class="select">
                        ${options}
                    </div>
                    <div class="totalCal"> ➡️ ${totalcal}</div>
                    
                </div> `
        });        
    })
    for (let key in foodData.foodData){
        document.querySelector('.fooditems').innerHTML+=`
        <div class="row m-0">
            <div class="col-4 table-box">${key}</div>
            <div class="col-2 table-box">${foodData.foodData[key].calories}</div>
            <div class="col-2 table-box">${foodData.foodData[key].protein}</div>
            <div class="col-4 table-box">${foodData.foodData[key].totalcal}</div>
        </div>`
    }
}
loadFoodData();

