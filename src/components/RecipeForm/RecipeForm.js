import React from "react";
import styles from "./RecipeForm.module.scss"

const RecipeForm = ({
    recipeForm, handleSubmit, handleChange, addToRecipeForm,
    ingredientsRef, stepsRef,handleAddedStepOnForm, handleAddedIngredientOnForm,
    popup, handlePopup, deleteFromRecipeForm
}) => {

  return ( popup ? (
    <div className={styles.popup}>
     <form onSubmit={handleSubmit} className={`recipe-form ${styles.popupInner}`}>
        <div className={styles.inputBox}>
            <label >Title</label>
            <input onChange={handleChange} value={recipeForm.title} name='title' type="text" />
        </div>
        <div className={styles.inputBox}>
            <label >Description</label>
            <textarea onChange={handleChange} value={recipeForm.desc} name="desc"></textarea>
        </div>
        <div className={styles.inputBox}>
            <label >Ingredients</label>
            {
                recipeForm.ingredients.length > 0 && (
                    <ul className="recipe-ingredients">
                        {
                            recipeForm.ingredients.map((ingredient, i) => {
                                return (
                                    ingredient.length > 0 && (
                                        <li key={i}>
                                            <textarea  
                                                id={`${i}`}
                                                value={recipeForm.ingredients[i]}
                                                name={recipeForm.ingredients[i]}
                                                onChange={(e)=>handleAddedIngredientOnForm(e,i)}
                                                type="text"   
                                            />
                                            <button className={styles.deleteBtn} index={i} id="delete-ingredient-btn" onClick={(e) => deleteFromRecipeForm(e)} type="button">Delete</button>
                                        </li>
                                    )
                                )
                            })
                        }
                    </ul>
                )
            }
           <div className={styles.inputAndButtonBox}>
                <textarea ref={ingredientsRef}  name='ingredients' type="text" />
                <button className={styles.addBtn} id="ingredients-btn" onClick={addToRecipeForm} type='button'>Add Ingredient</button>
           </div>
        </div>
        <div className={styles.inputBox}>
            <label >Steps</label>
            {
                recipeForm.steps.length > 0 && (
                    <ul className="recipe-steps">
                        {
                            recipeForm.steps.map((step, i) => {
                                return (
                                    step.length > 0 && (
                                        <li key={i}>
                                            <textarea
                                                value={recipeForm.steps[i]}
                                                name={recipeForm.steps[i]}
                                                onChange={(e)=>handleAddedStepOnForm(e,i)}
                                                type="text"   
                                            />
                                            <button className={styles.deleteBtn} index={i} id="delete-step-btn" onClick={(e) => deleteFromRecipeForm(e)} type="button">Delete</button>
                                        </li>
                                    )
                                )
                            })
                        }
                    </ul>
                )
            }
            <div className={styles.inputAndButtonBox}>
                <textarea ref={stepsRef} name='steps' type="text" />
                <button className={styles.addBtn} id='steps-btn' onClick={addToRecipeForm} type='button'>Add Step</button>
            </div>
        </div>
        <div className={styles.btnBox}>
            <button className={styles.submitBtn} type='submit'>Add Recipe</button>
            <button className={styles.closeBtn} onClick={handlePopup} type='button'>Close</button>
        </div>
     </form>
    </div> 
  ) : "" );
};

export default RecipeForm;