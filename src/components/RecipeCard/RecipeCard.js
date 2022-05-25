import styles from './RecipeCard.module.scss'

const RecipeCard = ({setEditingRecipe, setRecipeForm, handlePopup, i, recipe, deleteRecipe}) => {

    const { title, desc, ingredients, steps } = recipe;

    const editRecipe = (e) => {
        handlePopup()
        setRecipeForm(recipe)
        setEditingRecipe(recipe)
        deleteRecipe(e)
    };

  return (
    <div className= {`${styles.recipeCard} recipe-card`} >
        <h2>{title}</h2>
        <p>{desc}</p>
        <h4>Ingredients</h4>
        <ul>
            {ingredients.map((ingredient, i) => <li key={i}>{ingredient}</li>)}
        </ul>
        <h4>Steps</h4>
        <ul>
            {steps.map((step, i) => <li key={i}>{step}</li>)}
        </ul>
        <div className="button-box">
            <button>View More</button>
            <button id={i} onClick={editRecipe} >Edit</button>
            <button id={i} onClick={deleteRecipe} >Delete</button>
        </div>
    </div>
  )
}

export default RecipeCard;