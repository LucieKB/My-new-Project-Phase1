//Event listeners

document.querySelector("#radiobtnselection_En").addEventListener('click', renderSortByLetter) 
document.querySelector("#radiobtnselection_Fr").addEventListener('click', renderSortByLetterFR)
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

let yummyCount = 0
let cocktailCount = 0

//Event handler functions

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
    document.querySelector("#French_btn").disabled = true;
    document.querySelector("#English_btn").disabled = true;
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
    document.querySelector("#French_btn").disabled = true;
    document.querySelector("#English_btn").disabled = true;
}


// DOM render 

function renderCocktails(cocktailList){

    
    const cocktailsContainer = document.querySelector("#cocktails-list");
    console.log(cocktailList)
        let letterTextBox = document.querySelector(`input[name="drinkInitial"]`).value;
       let filteredCocktailList = cocktailList.drinks.filter((drink)=>drink.strDrink.charAt(0)=== letterTextBox.toUpperCase())
       
       console.log(filteredCocktailList)
       console.log(letterTextBox)
       let filteredCocktailArray = filteredCocktailList.map(Object.values)
       
       console.log(filteredCocktailArray)
       console.log(filteredCocktailArray[0])
       console.log(filteredCocktailArray[2])
       for(let i=0; i<filteredCocktailArray.length; i++){
       let list = document.createElement('li')
       list.setAttribute('id',filteredCocktailArray[i][2])
       let selectId = filteredCocktailArray[i][2] + "H"
       list.innerHTML = 
        `<h2 class = "cocktail_name">${filteredCocktailArray[i][0]} </h2>
        <select class ="answer-dropdown" id=${selectId}> 
           <option value="none" selected >Do you want to get the recipe?</option>
            <option value="yes">Yes!</option>
            <option value="no">No, that doesn't look good ...</option>
        </select>
        <p>  </p>
            ` 
       
        

        let answerDropdown = list.querySelector(".answer-dropdown")
   
        answerDropdown.addEventListener('change', (e) => { 
        let yesOrNo = e.target.value
        console.log(yesOrNo)
        if(yesOrNo === "yes"){
            getRecipe(filteredCocktailArray[i][2]);
        }  else {
            list.querySelector('p').textContent = ""
        }
        })
        cocktailsContainer.appendChild(list)
        
        answerDropdown.addEventListener('change', hideDropdown)

        function hideDropdown(){
            console.log(`${filteredCocktailArray[i][2]}`)
        document.getElementById(`${filteredCocktailArray[i][2]}H`).style.display = "none" 
            }     
    }
    }  

   
function renderSortByLetter(){
let letterTextBox = document.querySelector("#typeLetter_EN");
document.getElementById("typeLetter_EN").style.display= "block";
console.log(letterTextBox);
letterTextBox.addEventListener('keyup', getFilteredCocktails)
}  

function renderRecipes(recipe,cocktailId){
    cocktailCount +=1
    let yummyBtn = "yummy"+cocktailCount
        console.log(yummyBtn)
    let notYummyBtn = "notyummy"+cocktailCount
    console.log(recipe)
    console.log(recipe.drinks[0].strInstructions)
    let cocktailResults = document.getElementById("cocktails-list")
    console.log(cocktailResults)
    console.log(cocktailId)
    console.log(cocktailResults.childNodes)
    cocktailResults.childNodes.forEach((cocktail) =>{
        console.log(cocktail.id)
        if(cocktail.id === cocktailId){
    // let recipeText = document.createElement('ul')
    
    console.log(cocktail)
        cocktail.innerHTML+=
        `<h5>Recipe</h5>
        <p class = "recipe" > ${recipe.drinks[0].strInstructions}</p>
        <h6> Do you think you'll make this cocktail in the future?</h6>
        <button  id=${yummyBtn} value="yes"/> Yes </button>
        <button  id=${notYummyBtn} value="no"/> No </button>` 
   
    
}})
     let counterDisplay= document.getElementById("counter")    
       let yummy = document.getElementById(`${yummyBtn}`)
       console.log(yummy)
        yummy.addEventListener('click', () => {
        yummyCount +=1;
        console.log(document.getElementById(`${yummyBtn}`).id)
        counterDisplay.textContent = yummyCount;
            document.getElementById(`${yummyBtn}`).disabled = true;
            document.getElementById(`${notYummyBtn}`).disabled = true;
        })
        
        let notYummy = document.getElementById(`${notYummyBtn}`)
            notYummy.addEventListener('click', () => {
            yummyCount -=1;
            counterDisplay.textContent = yummyCount;
            document.getElementById(`${yummyBtn}`).disabled = true;
            document.getElementById(`${notYummyBtn}`).disabled = true;
        }
        )
}  



  // French version

  function renderCocktailsFR(cocktailList){

    const cocktailsContainer = document.querySelector("#cocktails-list");
    console.log(cocktailList)
        let letterTextBoxFR = document.querySelector(`input[name="drinkInitialFR"]`).value;
        console.log(letterTextBoxFR)
       let filteredCocktailList = cocktailList.drinks.filter((drink)=>drink.strDrink.charAt(0)=== letterTextBoxFR.toUpperCase())
       
       console.log(filteredCocktailList)
       console.log(letterTextBoxFR)
       let filteredCocktailArray = filteredCocktailList.map(Object.values)
       
       console.log(filteredCocktailArray)
       console.log(filteredCocktailArray[0])
       console.log(filteredCocktailArray[2])
       for(let i=0; i<filteredCocktailArray.length; i++){
       let list = document.createElement('li')
       list.innerHTML = 
        `<h2 class = "cocktail_name">${filteredCocktailArray[i][0]}</h2>
        <select class ="answer-dropdown" id=${filteredCocktailArray[i][2]}> 
           <option value="none" selected >Voulez-vous la recette?</option>
            <option value="yes">Oui!</option>
            <option value="no">Non, ça n'a pas l'air très bon ...</option>
        </select>
        <p>  </p>
            ` 
       
        

        let answerDropdown = list.querySelector(".answer-dropdown")
   
        answerDropdown.addEventListener('change', (e) => { 
        let yesOrNo = e.target.value
        console.log(yesOrNo)
        if(yesOrNo === "yes"){
            getRecipeFR(cocktailList.drinks[0].idDrink);
        }  else {
            list.querySelector('p').textContent = ""
        }
        })
        cocktailsContainer.appendChild(list)
        
        answerDropdown.addEventListener('change', hideDropdown)

        function hideDropdown(){
            console.log(`${filteredCocktailArray[i][2]}`)
        document.getElementById(`${filteredCocktailArray[i][2]}`).style.display = "none" 
            }
        
    }

    }     

function renderSortByLetterFR(){
        let letterTextBoxFR = document.querySelector("#typeLetter_FR");
        console.log(letterTextBoxFR);
        document.getElementById("typeLetter_FR").style.display= "block";
        letterTextBoxFR.addEventListener('keyup', getFilteredCocktailsFR)
        }  
        
 function renderRecipesFR(recipe,cocktailId){
            cocktailCount +=1
            let yummyBtn = "yummy"+cocktailCount
                console.log(yummyBtn)
            let notYummyBtn = "notyummy"+cocktailCount
            console.log(recipe)
            console.log(recipe.drinks[0].strInstructions)
            let recipeText = document.createElement('ul')
                recipeText.innerHTML=
                `<h5>Recette</h5>
                <p class = "recipe" > ${recipe.drinks[0].strInstructionsIT}</p>
                <h6> Vous pensez que vous préparez ce cocktail dans le future?</h6>
                <button  id=${yummyBtn} value="yes"/> Oui </button>
                <button  id=${notYummyBtn} value="no"/> Non </button>` 
           let cocktailInfo = document.querySelector(".cocktail_name")
             cocktailInfo.appendChild(recipeText) 
        
             let counterDisplay= document.getElementById("counter")    
               let yummy = document.getElementById(`${yummyBtn}`)
               console.log(yummy)
                yummy.addEventListener('click', () => {
                yummyCount +=1;
                console.log(document.getElementById(`${yummyBtn}`).id)
                counterDisplay.textContent = yummyCount;
                    document.getElementById(`${yummyBtn}`).disabled = true;
                    document.getElementById(`${notYummyBtn}`).disabled = true;
                })
                
                let notYummy = document.getElementById(`${notYummyBtn}`)
                    notYummy.addEventListener('click', () => {
                    yummyCount -=1;
                    counterDisplay.textContent = yummyCount;
                    document.getElementById(`${yummyBtn}`).disabled = true;
                    document.getElementById(`${notYummyBtn}`).disabled = true;
                }
                )
        }  

//Fetch requests

function getFilteredCocktails(){
    let cocktailCategory = document.querySelector(`input[name="alcohol_type"]:checked`).value
    console.log(cocktailCategory)
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${cocktailCategory}`)
       .then(res => res.json())
       .then(cocktail=>renderCocktails(cocktail))   
    }

    function getFilteredCocktailsFR(){
        let cocktailCategory = document.querySelector(`input[name="alcohol_type"]:checked`).value
        console.log(cocktailCategory)
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${cocktailCategory}`)
           .then(res => res.json())
           .then(cocktail=>renderCocktailsFR(cocktail))   
        }

    function getRecipe(cocktailId){
        console.log(cocktailId)
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`)
           .then(res => res.json())
           .then(recipe=>renderRecipes(recipe,cocktailId))   
    }

    function getRecipeFR(cocktailId){
        console.log(cocktailId)
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`)
           .then(res => res.json())
           .then(recipe=>renderRecipesFR(recipe,cocktailId))   
    }

