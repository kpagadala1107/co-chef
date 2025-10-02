// App.js
import React, { useState, useEffect } from 'react';
import AllRecipes from './components/AllRecipes';
import RecipeDetail from './components/RecipeDetail';
import AddRecipeForm from './components/AddRecipeForm';
import EditRecipeForm from './components/EditRecipeForm';
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('all-recipes');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [editingRecipe, setEditingRecipe] = useState(null);

  // Load recipes from localStorage on component mount
  useEffect(() => {
    const savedRecipes = localStorage.getItem('recipes');
    if (savedRecipes) {
      setRecipes(JSON.parse(savedRecipes));
    }
  }, []);

  // Save recipes to localStorage whenever recipes change
  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  const handleAddRecipe = (newRecipe) => {
    const recipeWithId = {
      ...newRecipe,
      id: Date.now().toString()
    };
    setRecipes([...recipes, recipeWithId]);
    setActiveTab('all-recipes');
  };

  const handleUpdateRecipe = (updatedRecipe) => {
    setRecipes(recipes.map(recipe => 
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    ));
    setEditingRecipe(null);
    setActiveTab('all-recipes');
  };

  const handleEditRecipe = (recipe) => {
    setEditingRecipe(recipe);
    setActiveTab('edit-recipe');
  };

  const handleDeleteRecipe = (recipeId) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
    }
  };

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBackToList = () => {
    setSelectedRecipe(null);
  };

  const cancelEdit = () => {
    setEditingRecipe(null);
    setActiveTab('all-recipes');
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Recipe Manager</h1>
        <nav className="top-menu">
          <button 
            className={activeTab === 'all-recipes' ? 'active' : ''}
            onClick={() => {
              setActiveTab('all-recipes');
              setSelectedRecipe(null);
              setEditingRecipe(null);
            }}
          >
            All Recipes
          </button>
          <button 
            className={activeTab === 'add-recipe' ? 'active' : ''}
            onClick={() => {
              setActiveTab('add-recipe');
              setEditingRecipe(null);
            }}
          >
            Add Recipe
          </button>
        </nav>
      </header>

      <main className="main-content">
        {selectedRecipe ? (
          <RecipeDetail 
            recipe={selectedRecipe} 
            onBack={handleBackToList}
          />
        ) : (
          <>
            {activeTab === 'all-recipes' && (
              <AllRecipes 
                recipes={recipes} 
                onRecipeSelect={handleRecipeSelect}
                onEditRecipe={handleEditRecipe}
                onDeleteRecipe={handleDeleteRecipe}
              />
            )}
            {activeTab === 'add-recipe' && (
              <AddRecipeForm onAddRecipe={handleAddRecipe} />
            )}
            {activeTab === 'edit-recipe' && editingRecipe && (
              <EditRecipeForm 
                recipe={editingRecipe}
                onUpdateRecipe={handleUpdateRecipe}
                onCancel={cancelEdit}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default App;