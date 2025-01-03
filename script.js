async function searchCocktails() {
  const searchTerm = document.getElementById("searchInput").value;
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
  );
  const data = await response.json();
  console.log(data);
  displayResults(data.meals);
}

function displayResults(foods) {
  const grid = document.getElementById("resultsGrid");
  grid.innerHTML = "";

  if (!foods) {
    grid.innerHTML = "<p>No foods found</p>";
    return;
  }

  foods.forEach((food) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
                    <div onclick="showDetails('${food.idMeal}')">
                    <img src="${food.strMealThumb}" alt="${food.strMeal}">
                    <div class="card-content">
                        <h3 class="card-title">${food.strMeal}</h3>
                    </div>
                    </div>
                `;
    grid.appendChild(card);
  });
}

async function showDetails(drinkId) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${drinkId}`
  );
  const data = await response.json();
  const meal = data.meals[0];

  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    if (meal[`strIngredient${i}`]) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`] || "";
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  const detailsHtml = `
                <h2>${meal.strMeal}</h2>
                <img src="${meal.strMealThumb}" alt="${
    meal.strMeal
  }" style="width: 200px; margin: 10px 0;">
                <p><strong>Category:</strong> ${meal.strCategory}</p>
                <p><strong>Area:</strong> ${meal.strArea}</p>
                <p><strong>Tags:</strong> ${meal.strTags}</p>
                <h3>Ingredients:</h3>
                <ul class="ingredients-list">
                    ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
                </ul>
                <h3>Instructions:</h3>
                <p>${meal.strInstructions}</p>
            `;

  document.getElementById("drinkDetails").innerHTML = detailsHtml;
  document.getElementById("detailsModal").style.display = "block";
}

function closeModal() {
  document.getElementById("detailsModal").style.display = "none";
}

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById("detailsModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
