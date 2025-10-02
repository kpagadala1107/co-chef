// EditRecipeForm.js
import React, { useState } from 'react';

const EditRecipeForm = ({ recipe, onUpdateRecipe, onCancel }) => {
  const [formData, setFormData] = useState({
    ...recipe,
    // Ensure we have the original ID
    id: recipe.id
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStepChange = (index, field, value) => {
    const updatedSteps = [...formData.steps];
    updatedSteps[index][field] = value;
    setFormData(prev => ({
      ...prev,
      steps: updatedSteps
    }));
  };

  const addStep = () => {
    setFormData(prev => ({
      ...prev,
      steps: [...prev.steps, { stepDescription: '', ingredients: '', instructions: '', flameNumber: 1, cookTime: '' }]
    }));
  };

  const removeStep = (index) => {
    if (formData.steps.length > 1) {
      const updatedSteps = formData.steps.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        steps: updatedSteps
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name.trim() || !formData.totalTime) {
      alert('Please fill in all required fields');
      return;
    }

    // Validate steps
    for (let step of formData.steps) {
      if (!step.stepDescription.trim() || !step.cookTime) {
        alert('Please fill in all step fields');
        return;
      }
    }

    const updatedRecipe = {
      ...formData,
      totalTime: parseInt(formData.totalTime),
      steps: formData.steps.map(step => ({
        ...step,
        cookTime: parseInt(step.cookTime),
        flameNumber: parseInt(step.flameNumber)
      }))
    };

    onUpdateRecipe(updatedRecipe);
  };

  return (
    <div className="edit-recipe-form">
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Recipe Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Total Time (minutes) *</label>
          <input
            type="number"
            name="totalTime"
            value={formData.totalTime}
            onChange={handleInputChange}
            min="1"
            required
          />
        </div>

        <div className="steps-section">
          <h3>Steps</h3>
          {formData.steps.map((step, index) => (
            <div key={index} className="step-form">
              <h4>Step {index + 1}</h4>
              
              <div className="form-group">
                <label>Step Description *</label>
                <input
                  type="text"
                  value={step.stepDescription}
                  onChange={(e) => handleStepChange(index, 'stepDescription', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Ingredients</label>
                <input
                  type="text"
                  value={step.ingredients}
                  onChange={(e) => handleStepChange(index, 'ingredients', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Instructions</label>
                <textarea
                  value={step.instructions}
                  onChange={(e) => handleStepChange(index, 'instructions', e.target.value)}
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Flame Intensity (1-5)</label>
                  <select
                    value={step.flameNumber}
                    onChange={(e) => handleStepChange(index, 'flameNumber', e.target.value)}
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? '🔥' : num === 2 ? '🔥🔥' : num === 3 ? '🔥🔥🔥' : num === 4 ? '🔥🔥🔥🔥' : '🔥🔥🔥🔥🔥'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Cook Time (minutes) *</label>
                  <input
                    type="number"
                    value={step.cookTime}
                    onChange={(e) => handleStepChange(index, 'cookTime', e.target.value)}
                    min="1"
                    required
                  />
                </div>
              </div>

              {formData.steps.length > 1 && (
                <button 
                  type="button" 
                  className="remove-step-btn"
                  onClick={() => removeStep(index)}
                >
                  Remove Step
                </button>
              )}
            </div>
          ))}

          <button type="button" className="add-step-btn" onClick={addStep}>
            + Add Another Step
          </button>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Update Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipeForm;