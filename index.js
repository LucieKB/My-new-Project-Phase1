//Event listeners
document.querySelector("#radiobtnselection_En").addEventListener('click', getFilteredCocktails)
document.querySelector("#radiobtnselection_Fr").addEventListener('click', getFilteredCocktails)   

//Globals

//Event handler functions

  


// DOM render

function renderCocktails(cocktailList){
    
    const cocktailsContainer = document.querySelector("#cocktails-list");
    console.log(cocktailList)
        let list = document.createElement('li')
       
        list.innerHTML = 
        
        `<h2 class = "cocktail_name">${cocktailList.drinks[0].strDrink}</h2>
        <select class ="answer-dropdown" id=${cocktailList.drinks[0].idDrink}> 
           <option value="none" selected >Do you want to get the recipe?</option>
            <option value="yes">Yes!</option>
            <option value="no">No, that doesn't look good ...</option>
        </select>
        <p>  </p>
        <h4> Do you think you would like this cocktail?</h4>
        <br />
            `

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

       
function renderRecipes(recipe){
    console.log(recipe.drinks[0].strInstructions)
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