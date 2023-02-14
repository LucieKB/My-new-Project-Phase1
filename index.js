//Event listeners
// document.querySelector("#radiobtnselection_En").addEventListener('click', getFilteredCocktails)
// document.querySelector("#radiobtnselection_Fr").addEventListener('click', getFilteredCocktails) 
document.querySelector("#radiobtnselection_En").addEventListener('click', renderSortByLetter) 
document.getElementById("radiobtnselection_En").style.display="none"
document.getElementById("radiobtnselection_Fr").style.display="none"
document.getElementById("pageTitle_Fr").style.display= "none"
document.getElementById("emoji-box-title_FR").style.display= "none" 
document.querySelector("#French_btn").addEventListener('click', switchToFrench)
document.querySelector("#English_btn").addEventListener('click', switchToEnglish)
document.querySelector("#English_btn").addEventListener('mouseover', () =>
    {document.querySelector(".hide").style.display="block"})
    document.querySelector("#English_btn").addEventListener('mouseout', () =>
    {document.querySelector(".hide").style.display="none"})
document.querySelector("#French_btn").addEventListener('mouseover', () =>
    {document.querySelector(".hideFR").style.display="block"})
    document.querySelector("#French_btn").addEventListener('mouseout', () =>
    {document.querySelector(".hideFR").style.display="none"})


//Globals


//Event handler functions

  


// DOM render

function renderCocktails(cocktailList){
    
    const cocktailsContainer = document.querySelector("#cocktails-list");
    console.log(cocktailList)
        let letterTextBox = document.querySelector(`input[name="drinkInitial"]`).value;
       let filteredCocktailList = cocktailList.drinks.filter((drink)=>drink.strDrink.charAt(0)=== letterTextBox.toUpperCase())
       
       console.log(filteredCocktailList)
       console.log(letterTextBox)
       let filteredCocktailArray = filteredCocktailList.map(Object.values)
       let list = document.createElement('li')
       console.log(filteredCocktailArray)
       console.log(filteredCocktailArray[0])
       console.log(filteredCocktailArray[2])
       filteredCocktailArray.forEach((drink) => {
       list.innerHTML = 
        `<h2 class = "cocktail_name">${filteredCocktailArray[0][0]}</h2>
        <select class ="answer-dropdown" id=${filteredCocktailArray[0][2]}> 
           <option value="none" selected >Do you want to get the recipe?</option>
            <option value="yes">Yes!</option>
            <option value="no">No, that doesn't look good ...</option>
        </select>
        <p>  </p>
        <h4> Do you think you would like this cocktail?</h4>
        <br />
            ` 
       });
        

        let answerDropdown = list.querySelector(".answer-dropdown")
   
        answerDropdown.addEventListener('change', (e) => { 
        let yesOrNo = e.target.value
        console.log(yesOrNo)
        if(yesOrNo === "yes"){
            getRecipe(cocktailList.drinks[0].idDrink);
           
        }  else {
            list.querySelector('p').textContent = ""
        }
        })
    
        cocktailsContainer.appendChild(list)
    }

function renderSortByLetter(){
let letterTextBox = document.querySelector("#typeLetter_EN");
document.getElementById("typeLetter_EN").style.display= "block";
console.log(letterTextBox);
letterTextBox.addEventListener('keyup', getFilteredCocktails)
}  

function renderRecipes(recipe){
    console.log(recipe.drinks[0].strInstructions)
}     

function switchToEnglish(e){
    e.preventDefault()
    document.getElementById("radiobtnselection_Fr").style.display="none"
    document.getElementById("radiobtnselection_En").style.display="block"
    document.getElementById("pageTitle_Fr").style.display= "none"
    document.getElementById("pageTitle_En").style.display= "block"
    document.getElementById("emoji-box-title_FR").style.display= "none"
    document.getElementById("emoji-box-title").style.display= "block"
    document.getElementById("Details_FR").style.display= "none"
    document.getElementById("Details_EN").style.display= "block"
}

function switchToFrench(e){
    e.preventDefault()
    document.getElementById("radiobtnselection_En").style.display="none"
    document.getElementById("radiobtnselection_Fr").style.display="block"
    document.getElementById("pageTitle_Fr").style.display= "block"
    document.getElementById("pageTitle_En").style.display= "none"
    document.getElementById("emoji-box-title_FR").style.display= "block"
    document.getElementById("emoji-box-title").style.display= "none"
    document.getElementById("Details_FR").style.display= "block"
    document.getElementById("Details_EN").style.display= "none"
}

//Fetch requests

function getFilteredCocktails(){
    let cocktailCategory = document.querySelector(`input[name="alcohol_type"]:checked`).value
    console.log(cocktailCategory)
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${cocktailCategory}`)
       .then(res => res.json())
       .then(cocktail=>renderCocktails(cocktail))   
    }

    function getRecipe(cocktailId){
        console.log(cocktailId)
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`)
           .then(res => res.json())
           .then(recipe=>renderRecipes(recipe))   
    }

    // <button  id=${yummyBtn} value="yes"/> Yes </button>
    // <button  id=${notYummyBtn} value="no"/> No </button>