import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRecipes = async () => {
    if (!ingredient) {
      setError("Please enter an ingredient.");
      setRecipes([]);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      const data = await response.json();
      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
        setError("No recipes found.");
      }
    } catch {
      setError("Something went wrong! Please try again.");
      setRecipes([]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchRecipes();
    }
  };

  return (
    <div className="App">
      <h1 className="title">🍽️ Hungry Vibes</h1>
      <p className="subtitle">
        Discover delicious recipes by ingredient (try: chicken, rice, egg...)
      </p>
      <div className="search-bar">
        <input
          type="text"
          value={ingredient}
          placeholder="What's in your kitchen?"
          onChange={(e) => setIngredient(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={fetchRecipes}>Find Recipes</button>
      </div>
      {loading && <p className="status">Searching for tasty recipes...</p>}
      {error && <p className="error">{error}</p>}
      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <div
            key={recipe.idMeal}
            className="recipe-card"
            onClick={() =>
              window.open(
                `https://www.themealdb.com/meal/${recipe.idMeal}`,
                "_blank"
              )
            }
            tabIndex={0}
            title="Click to view full recipe"
          >
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="recipe-image"
            />
            <h4 className="recipe-name">{recipe.strMeal}</h4>
          </div>
        ))}
      </div>
      <footer>
        <p>
          Powered by{" "}
          <a
            href="https://www.themealdb.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            TheMealDB
          </a>{" "}
          • Made with 💛 for food lovers
        </p>
      </footer>
    </div>
  );
}
