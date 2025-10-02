// AllRecipes.js
const AllRecipes = ({ recipes, onRecipeSelect, onEditRecipe, onDeleteRecipe }) => {
  if (recipes.length === 0) {
    return (
      <div className="empty-state">
        <h2>No Recipes Yet</h2>
        <p>Click "Add Recipe" to create your first recipe!</p>
      </div>
    );
  }

  return (
    <div className="all-recipes">
      <h2>All Recipes</h2>
      <div className="recipes-grid">
        {recipes.map(recipe => (
          <div 
            key={recipe.id} 
            className="recipe-card"
          >
            <div className="recipe-card-content" onClick={() => onRecipeSelect(recipe)}>
              <h3>{recipe.name}</h3>
              <p>{recipe.description}</p>
              <div className="recipe-meta">
                <span>⏱️ {recipe.totalTime} mins</span>
                <span>📝 {recipe.steps.length} steps</span>
              </div>
            </div>
            
            <div className="recipe-actions">
              <button 
                className="edit-btn"
                onClick={() => onEditRecipe(recipe)}
                title="Edit Recipe"
              >
                ✏️ Edit
              </button>
              {/* <button 
                className="delete-btn"
                onClick={() => onDeleteRecipe(recipe.id)}
                title="Delete Recipe"
              >
                🗑️ Delete
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRecipes;