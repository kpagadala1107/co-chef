// RecipeDetail.js
import React, { useState, useEffect } from 'react';

const RecipeDetail = ({ recipe, onBack }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    let interval;
    if (isPlaying && currentStepIndex < recipe.steps.length) {
      const currentStep = recipe.steps[currentStepIndex];
      const totalTimeInSeconds = currentStep.cookTime * 60;

      interval = setInterval(() => {
        setTimeElapsed(prev => {
          const newTime = prev + 1;

          // Check if we've reached the cook time
          if (newTime >= totalTimeInSeconds) {
            clearInterval(interval);
            setIsPlaying(false);
            setTimeElapsed(0);

            // Move to next step if available
            if (currentStepIndex < recipe.steps.length - 1) {
              setCurrentStepIndex(currentStepIndex + 1);
            } else {
              // Mark last step as completed by moving index out of bounds
              setCurrentStepIndex(recipe.steps.length);
            }
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStepIndex, recipe.steps]);

  // Reset timer when step changes
  useEffect(() => {
    setTimeElapsed(0);
    setIsPlaying(false);
  }, [currentStepIndex]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStepComplete = (index) => {
    if (index <= currentStepIndex) return;
    setCurrentStepIndex(index);
    setIsPlaying(false);
    setTimeElapsed(0);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    setTimeElapsed(0);
  };


const getFlameIntensity = (flameNumber) => {
  // Always show 5 flames, grey out the ones above the intensity
  return (
    <span>
      {[1, 2, 3, 4, 5].map((num) => (
        <span
          key={num}
          style={{
            filter: num > flameNumber ? 'grayscale(100%) opacity(0.4)' : 'none',
            fontSize: '1.2em',
            marginRight: '2px',
          }}
        >
          🔥
        </span>
      ))}
    </span>
  );
};
// ...existing code...

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="recipe-detail">
      <button className="back-button" onClick={onBack}>
        ← Back to Recipes
      </button>

      <div className="recipe-header">
        <h2>{recipe.name}</h2>
        <p>{recipe.description}</p>
        <div className="recipe-header-row">
          <div className="recipe-total-time">
            {/* Total Time: {recipe.totalTime} minutes */}
            {recipe.totalTime} minutes
          </div>
          <button className="reset-btn" onClick={handleReset}>
            🔄 Reset
          </button>
        </div>
        <br/>
      </div>

      <div className="steps-container">
        {recipe.steps.map((step, index) => {
          const totalTimeInSeconds = step.cookTime * 60;
          const progress = (timeElapsed / totalTimeInSeconds) * 100;

          return (
            <div
              key={index}
              className={`step-card ${index === currentStepIndex ? 'active' : ''} ${index < currentStepIndex ? 'completed' : ''
                }`}
            >
              <div className="step-header">
                <h3>Step {index + 1}</h3>
                {index < currentStepIndex && (
                  <span className="completed-badge">✓ Completed</span>
                )}
                {index === currentStepIndex && (
                  <span className="current-badge">Current Step</span>
                )}
              </div>

              <div className="step-content">
                <div className="step-description">
                  {/* <strong>Description:</strong> {step.stepDescription} */}
                  {/* {step.stepDescription} */}
                </div>

                <div className="step-ingredients">
                  <strong>Ingredients:</strong> {step.ingredients}
                  {/* <strong>{step.ingredients}</strong> <br /> */}
                </div>

                <div className="step-instructions">
                  <strong>Instructions:</strong> {step.instructions}
                  {/* {step.instructions} */}
                </div>

                {step.image && (
                  <div className="step-image">
                    <img src={step.image} alt={`Step ${index + 1} illustration`} style={{ maxWidth: '100%', borderRadius: '8px', marginTop: '0.5rem' }} />
                  </div>
                )}

                {index === currentStepIndex && (
                  <div className="step-meta-controls">
                    <div className="step-meta-left">
                      <button
                        className="play-pause-btn icon-only"
                        aria-label={isPlaying ? "Pause" : "Play"}
                        onClick={handlePlayPause}
                      >
                        {isPlaying ? '⏸️' : '▶️'}
                      </button>
                      <div className="timer-display">
                        <span className="time-elapsed">
                          {formatTime(timeElapsed)} / {formatTime(totalTimeInSeconds)}
                        </span>
                        {isPlaying && (
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="step-meta-right">
                      <span className="flame-intensity">
                        {getFlameIntensity(step.flameNumber)}
                      </span>
                      <span className="cook-time">
                        {step.cookTime} minutes
                      </span>
                    </div>
                  </div>
                )}

                {index > currentStepIndex && (
                  <button
                    className="start-step-btn"
                    onClick={() => handleStepComplete(index)}
                  >
                    Start
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecipeDetail;