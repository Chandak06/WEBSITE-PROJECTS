const apiKey = "1b056f294a214d9a9219ae20a52330e6";
const recipeListEl = document.getElementById("recipe-list");

function displayRecipes(recipes) {
    recipeListEl.innerHTML = "";
    recipes.forEach((recipe) => {
        const recipeItemEl = document.createElement("li");
        recipeItemEl.classList.add("recipe-item");
        recipeImgEl = document.createElement("img");
        recipeImgEl.src = recipe.image;
        recipeImgEl.alt = "recipe image";

        recipeTitleEl = document.createElement("h2");
        recipeTitleEl = recipe.title;

        recipeIngredientsEl = document.createElement("p");
        recipeIngredientsEl.innerHTML = `
        <strong>Ingredients</strong>${recipe.extendedIngredients.map((ingredient) => ingredient.original).join(", ")}
        `;

        recipeLinkEl = document.createElement("a");
        recipeLinkEl.href = recipe.sourceUrl;
        recipeLinkEl.innerText = "View Recipe";

        recipeItemEl.appendChild(recipeImgEl);
        recipeItemEl.appendChild(recipeIngredientsEl);
        recipeItemEl.appendChild(recipeTitleEl);
        recipeListEl.appendChild(recipeItemEl);
        recipeItemEl.appendChild(recipeLinkEl);
    });
}
async function getRecipes() {
    const response = await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${apiKey}`);
    const data = await response.json()
    return data.recipes
}
async function init() {
    const recipes = await getRecipes();
    displayRecipes(recipes);
}

init();