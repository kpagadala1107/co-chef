import React, { useState } from 'react';

const AllRecipes = ({ recipes, onRecipeSelect, onEditRecipe, onDeleteRecipe }) => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

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
        {recipes.map(recipe => {
          const isLong = recipe.description && recipe.description.length > 120; // adjust as needed
          return (
            <div 
              key={recipe.id} 
              className="recipe-card"
            >
              <div className="recipe-card-content" onClick={() => onRecipeSelect(recipe)}>
                <h3>{recipe.name}</h3>
                <p
                  className={`recipe-description${expanded[recipe.id] ? ' expanded' : ''}`}
                >
                  {recipe.description}
                </p>
                {isLong && (
                  <button
                    className="expand-btn"
                    onClick={e => {
                      e.stopPropagation();
                      toggleExpand(recipe.id);
                    }}
                  >
                    {expanded[recipe.id] ? 'Less' : 'More'}
                  </button>
                )}
                <div className="recipe-meta">
                  <span>⏱️ {recipe.totalTime} mins</span>
                  <span>📝 {recipe.steps.length} steps</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllRecipes;