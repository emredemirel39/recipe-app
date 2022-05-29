import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './RecipeCard.module.scss';

const RecipeCard = ({setEditingRecipe, setRecipeForm, handlePopup, i, recipe, deleteRecipe}) => {

    // "i" is the index of recipe from localstorage array

    const { title, desc, ingredients, steps } = recipe;
    
    const [ visibility, setVisibility ] = useState(false);

    const editRecipe = (e) => {

        //editing added recipes on page
        handlePopup(); //opening form component
        setRecipeForm(recipe); // opens already filled form with recipe from localstorage (storage.map(recipe))
        setEditingRecipe(recipe); // keeping original of editing recipe in state
        deleteRecipe(e);
    };

  return (
    <div className= {`${styles.recipeCard} recipe-card`} >
        <h2>{title}</h2>
        <p>{desc}</p>
        <button className={styles.moreLessBtn} onClick={() => setVisibility(!visibility)}>{visibility ? 'Less...' : 'More...'}</button>
        <AnimatePresence>
            { 
                visibility && (
                    <motion.div
                        initial={{height: 0}}
                        animate={{height: 'auto'}}
                        style={{overflow: 'hidden'}}
                        exit={{height: 0}}
                        transition={{duration: 0.5}}
                    >
                        <h3>Ingredients:</h3>
                        <ul>
                            {ingredients.map((ingredient, i) => <li key={i}>- {ingredient}</li>)}
                        </ul>
                        <h3>Steps:</h3>
                        <ul>
                            {steps.map((step, i) => <li key={i}>- {step}</li>)}
                        </ul>
                    </motion.div>
                )
            }
        </AnimatePresence>
        <div className={styles.btnBox}>
            <button className={styles.editBtn}id={i} onClick={editRecipe} >Edit</button>
            <button className={styles.deleteBtn} id={i} onClick={deleteRecipe} >Delete</button>
        </div>
    </div>
  )
}

export default RecipeCard;