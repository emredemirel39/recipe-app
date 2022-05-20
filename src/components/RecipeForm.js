import React from "react";

const RecipeForm = ({
    recipeForm, handleSubmit, handleChange, addRecipeForm, ingredientsRef, stepsRef
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
            <input ref={ingredientsRef}  name='ingredients' type="text" />
            <button id="ingredients-btn" onClick={addRecipeForm} type='button'>Add Ingredient</button>
        </div>
        <div className="input-box">
            <label >Steps</label>
            <input ref={stepsRef} name='steps' type="text" />
            <button id='steps-btn' onClick={addRecipeForm} type='button'>Add Step</button>
        </div>
        <div className="btn-box">
            <button type='submit'>Add Recipe</button>
            <button onClick={(e) => e.preventDefault()} type='button'>Close</button>
        </div>
    </form>
  )
}

export default RecipeForm;