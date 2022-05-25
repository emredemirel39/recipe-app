import React, { useState, createRef, useEffect } from "react";
import RecipeCard from "./components/RecipeCard/RecipeCard";
import RecipeForm from "./components/RecipeForm/RecipeForm";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {

  const ingredientsRef = createRef();
  const stepsRef = createRef();

  const initialState = {
    title: '',
    desc: '',
    ingredients: [],
    steps: []
  }

  const [ editingRecipe, setEditingRecipe ] = useState('');
  const [ recipeForm, setRecipeForm ] = useState(initialState);
  const [ popup, setPopup ] = useState(false);
  const [ storage, setStorage ] = useLocalStorage('recipes', [])

  

  const handleSubmit= (e) => {

    e.preventDefault();
    setStorage([...storage, recipeForm]);
    setRecipeForm(initialState)
    setEditingRecipe("")
    setPopup(!popup)
  };

  useEffect(() => {
    setStorage(storage)
  }, [])

  const handleChange = (e, i) => {

    setRecipeForm({...recipeForm, [e.target.name]: e.target.value});
  };

  const handleAddedIngredientOnForm = (e, i) => {
    const ingredientsClone = [...recipeForm.ingredients]

    ingredientsClone[i] = e.target.value

    setRecipeForm({
      ...recipeForm,
      ingredients: ingredientsClone
    });
  };

  const handleAddedStepOnForm = (e, i) => {
    const stepsClone = [...recipeForm.steps]

    stepsClone[i] = e.target.value

    setRecipeForm({
      ...recipeForm,
      steps: stepsClone
    });
  };

  const addToRecipeForm = (e, i) => {

    const btnId = e.currentTarget.id;

    if (btnId === 'ingredients-btn') {

      const ingredientsClone = [...recipeForm.ingredients, ingredientsRef.current.value];
      setRecipeForm({...recipeForm, ingredients: ingredientsClone});
      ingredientsRef.current.value = ''
        
    } else if (btnId === 'steps-btn') {

      const stepsClone = [...recipeForm.steps, stepsRef.current.value];
      setRecipeForm({...recipeForm, steps: stepsClone});
      stepsRef.current.value = ''
    };
  };

  const deleteFromRecipeForm = e => {

    const btnId = e.currentTarget.id;
    const index = e.currentTarget.getAttribute('index');

    if (btnId === 'delete-ingredient-btn') {

      const deletedIngredient = recipeForm.ingredients.splice(index, 1);
      const updatedIngredients = recipeForm.ingredients.filter((ingredient) => ingredient !== deletedIngredient);
      setRecipeForm({...recipeForm, ingredients: updatedIngredients});
        
    } else if (btnId === 'delete-step-btn') {

      const deletedStep = recipeForm.steps.splice(index, 1);
      const updatedSteps = recipeForm.steps.filter(step => step !== deletedStep);
      setRecipeForm({...recipeForm, steps: updatedSteps});
    };
  };

  const handlePopup = (e) => {

    if (editingRecipe) {
      setStorage([...storage, editingRecipe]);
      setRecipeForm(initialState)

    };
    setPopup(!popup);
    setRecipeForm(initialState);
    setEditingRecipe("")

  };

  const deleteRecipe = (e) => {
        
    const updatedStorage = JSON.parse(localStorage.getItem('recipes'));
    updatedStorage.splice(e.currentTarget.id, 1);
    setStorage(updatedStorage);
  } 
  
  console.log(recipeForm)
  return (
    <div className="App">
      <header>
        <h1>MY RECIPE APP</h1>
        <button onClick={handlePopup} >Add New Recipe</button>
      </header>
      <main>
        <RecipeForm
          popup={popup}
          handlePopup={handlePopup}
          recipeForm={recipeForm}
          addToRecipeForm={addToRecipeForm}
          deleteFromRecipeForm={deleteFromRecipeForm}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          ingredientsRef={ingredientsRef}
          stepsRef={stepsRef}
          handleAddedStepOnForm={handleAddedStepOnForm}
          handleAddedIngredientOnForm={handleAddedIngredientOnForm}
        />
        <div className="recipe-list">
          {storage && (
           storage.map((recipe, i) => {

             return(
              <RecipeCard
                recipe={recipe}
                editingRecipe={editingRecipe} 
                setEditingRecipe={setEditingRecipe} 
                deleteRecipe={deleteRecipe} 
                setRecipeForm={setRecipeForm} 
                handlePopup={handlePopup} 
                key={i} 
                i={i} 
              />
             )
           })
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
