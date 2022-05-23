import React from "react";

const RecipeForm = ({
    recipeForm, handleSubmit, handleChange, addRecipeForm,
    ingredientsRef, stepsRef,handleAddedStep, handleAddedIngredient,
    addRecipes
}) => {

    

  return (
    <form onSubmit={handleSubmit} className='recipe-form'>
        <div className="input-box">
            <label >Title</label>
            <input onChange={handleChange} value={recipeForm.title} name='title' type="text" />
        </div>
        <div className="input-box">
            <label >Description</label>
            <textarea onChange={handleChange} value={recipeForm.desc} name="desc" cols="30" rows="auto"></textarea>
        </div>
        <div className="input-box">
            <label >Ingredients</label>
            {
                recipeForm.ingredients.length > 0 && (
                    <ul className="recipe-ingredients">
                        {
                            recipeForm.ingredients.map((ingredient, i) => {
                                return (
                                    ingredient.length > 0 && (
                                        <li key={i}>
                                            <input  
                                                id={`${i}`}
                                                value={recipeForm.ingredients[i]}
                                                name={recipeForm.ingredients[i]}
                                                onChange={(e)=>handleAddedIngredient(e,i)}
                                                type="text"   
                                            />
                                            <button type="button">Delete</button>
                                        </li>
                                    )
                                )
                            })
                        }
                    </ul>
                )
            }
            <input ref={ingredientsRef}  name='ingredients' type="text" />
            <button id="ingredients-btn" onClick={addRecipeForm} type='button'>Add Ingredient</button>
        </div>
        <div className="input-box">
            <label >Steps</label>
            {
                recipeForm.steps.length > 0 && (
                    <ul className="recipe-steps">
                        {
                            recipeForm.steps.map((step, i) => {
                                return (
                                    step.length > 0 && (
                                        <li key={i}>
                                            <input
                                                value={recipeForm.steps[i]}
                                                name={recipeForm.steps[i]}
                                                onChange={(e)=>handleAddedStep(e,i)}
                                                type="text"   
                                            />
                                            <button type="button">Delete</button>
                                        </li>
                                    )
                                )
                            })
                        }
                    </ul>
                )
            }
            <input ref={stepsRef} name='steps' type="text" />
            <button id='steps-btn' onClick={addRecipeForm} type='button'>Add Step</button>
        </div>
        <div className="btn-box">
            <button type='submit'>Add Recipe</button>
            <button onClick={(e) => e.preventDefault()} type='button'>Close</button>
        </div>
    </form>
  );
};

export default RecipeForm;