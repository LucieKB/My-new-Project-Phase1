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
    
        let letterTextBox = document.querySelector(`input[name="drinkInitial"]`).value;
       let filteredCocktailList = cocktailList.drinks.filter((drink)=>drink.strDrink.charAt(0)=== letterTextBox.toUpperCase())
       
       let filteredCocktailArray = filteredCocktailList.map(Object.values)
      
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
        
             if(yesOrNo === "yes"){
            getRecipe(filteredCocktailArray[i][2]);
             }  else {
            list.querySelector('p').textContent = ""
            }
            })

        cocktailsContainer.appendChild(list)
        
        answerDropdown.addEventListener('change', hideDropdown)

        function hideDropdown(){
        document.getElementById(`${filteredCocktailArray[i][2]}H`).style.display = "none" 
            }     
    }
    }  

   
function renderSortByLetter(){
let letterTextBox = document.querySelector("#typeLetter_EN");
document.getElementById("typeLetter_EN").style.display= "block";
letterTextBox.addEventListener('keyup', getFilteredCocktails)
}  

function renderRecipes(recipe,cocktailId){
    cocktailCount +=1
    let yummyBtn = "yummy"+cocktailCount
    let notYummyBtn = "notyummy"+cocktailCount
    let cocktailResults = document.getElementById("cocktails-list")
    
    cocktailResults.childNodes.forEach((cocktail) =>{
        if(cocktail.id === cocktailId){
        cocktail.innerHTML+=
        `<h5>Recipe</h5>
        <p class = "recipe" > ${recipe.drinks[0].strInstructions}</p>
        <h6> Do you think you'll make this cocktail in the future?</h6>
        <button  id=${yummyBtn} value="yes"/> Yes </button>
        <button  id=${notYummyBtn} value="no"/> No </button>` 
   
    
}})
     let counterDisplay= document.getElementById("counter")    
       let yummy = document.getElementById(`${yummyBtn}`)

        yummy.addEventListener('click', () => {
        yummyCount +=1;
        
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
        let letterTextBoxFR = document.querySelector(`input[name="drinkInitialFR"]`).value;
        let filteredCocktailList = cocktailList.drinks.filter((drink)=>drink.strDrink.charAt(0)=== letterTextBoxFR.toUpperCase())
        let filteredCocktailArray = filteredCocktailList.map(Object.values)

       for(let i=0; i<filteredCocktailArray.length; i++){
       let list = document.createElement('li')
       list.setAttribute('id',filteredCocktailArray[i][2])
       let selectId = filteredCocktailArray[i][2] + "H"
       list.innerHTML = 
        `<h2 class = "cocktail_name">${filteredCocktailArray[i][0]} </h2>
        <select class ="answer-dropdown" id=${selectId}> 
            <option value="none" selected >Voulez-vous la recette?</option>
            <option value="yes">Oui!</option>
            <option value="no">Non, ça n'a pas l'air très bon ...</option>
        </select>
        <p>  </p>
        ` 
       
    
        let answerDropdown = list.querySelector(".answer-dropdown")
   
        answerDropdown.addEventListener('change', (e) => { 
        let yesOrNo = e.target.value
        
        if(yesOrNo === "yes"){
            getRecipeFR(filteredCocktailArray[i][2]);
        }  else {
            list.querySelector('p').textContent = ""
        }
        })
        cocktailsContainer.appendChild(list)
        
        answerDropdown.addEventListener('change', hideDropdown)
       
        function hideDropdown(){
           
        document.getElementById(`${filteredCocktailArray[i][2]}H`).style.display = "none" 
            }     
        
    }
}

function renderSortByLetterFR(){
        let letterTextBoxFR = document.querySelector("#typeLetter_FR");
       
        document.getElementById("typeLetter_FR").style.display= "block";
        letterTextBoxFR.addEventListener('keyup', getFilteredCocktailsFR)
        }  
        


function renderRecipesFR(recipe,cocktailId){
            cocktailCount +=1
            let yummyBtn = "yummy"+cocktailCount
            let notYummyBtn = "notyummy"+cocktailCount
            let cocktailResults = document.getElementById("cocktails-list")

            cocktailResults.childNodes.forEach((cocktail) =>{
                console.log(cocktail.id)
                if(cocktail.id === cocktailId){
           
                cocktail.innerHTML+=
                `<h5>Recette</h5>
                <p class = "recipe" > ${recipe.drinks[0].strInstructionsIT}</p>
                <h6> Vous pensez que vous préparez ce cocktail dans le future?</h6>
                <button  id=${yummyBtn} value="yes"/> Oui </button>
                <button  id=${notYummyBtn} value="no"/> Non </button>`    
        }})

             let counterDisplay= document.getElementById("counter")    
               let yummy = document.getElementById(`${yummyBtn}`)
               
                yummy.addEventListener('click', () => {
                yummyCount +=1;
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

