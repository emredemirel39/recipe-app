import React, { useState, createRef } from "react";
import RecipeCard from "./components/RecipeCard/RecipeCard";
import RecipeForm from "./components/RecipeForm/RecipeForm";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {

  const ingredientsRef = createRef(); // textarea input
  const stepsRef = createRef(); // textarea input

  const initialState = {
    title: '',
    desc: '',
    ingredients: [],
    steps: []
  };

  const [ editingRecipe, setEditingRecipe ] = useState('');
  const [ recipeForm, setRecipeForm ] = useState(initialState);
  const [ popup, setPopup ] = useState(false);
  const [ storage, setStorage ] = useLocalStorage('recipes', []);

  const handleSubmit= (e) => {

    const submitForm = () => {
      e.preventDefault();
      setStorage([...storage, recipeForm]);
      setRecipeForm(initialState);
      setEditingRecipe("");
      setPopup(!popup);
    }

    if (recipeForm.title === '') {
      e.preventDefault();
      window.alert('Title cannot be empty')
    } else if (recipeForm.desc === '') {
      e.preventDefault();
      alert('Description cannot be empty')
    }
    else {
      if (recipeForm === editingRecipe || editingRecipe === '') {
        submitForm();
      } else if (editingRecipe) {
        
        const saveChanges = window.confirm('Are you sure want to save changes?');
  
        if (recipeForm === editingRecipe) {
          e.preventDefault();
          window.alert('Nothing changed!')
        } else if (saveChanges) {
          submitForm();
        }
      }; 
    }
  };



  const handleChange = (e, i) => {

    setRecipeForm({...recipeForm, [e.target.name]: e.target.value});
  };

  const handleAddedIngredientOnForm = (e, i) => {

    // changing inputs that added on recipe form while user filling form
    const ingredientsClone = [...recipeForm.ingredients]

    ingredientsClone[i] = e.target.value
        // "i" is index number of ingredient (recipeForm.ingredients.map) which added to recipe form while user continuing to fill form 


    setRecipeForm({
      ...recipeForm,
      ingredients: ingredientsClone
    });
  };

  const handleAddedStepOnForm = (e, i) => {

    // changing inputs that added on recipe form while user filling form
    const stepsClone = [...recipeForm.steps]

    stepsClone[i] = e.target.value
    // "i" is index number of step (recipeForm.steps.map) which added to recipe form while user continuing to fill form 

    setRecipeForm({
      ...recipeForm,
      steps: stepsClone
    });
  };

  const addToRecipeForm = (e, i) => {

    // adding input to recipe form to add more ingredient or steps to form while user continuing to fill form
    const btnId = e.currentTarget.id;

    if (btnId === 'ingredients-btn') {

      const ingredientsClone = [...recipeForm.ingredients, ingredientsRef.current.value];
      setRecipeForm({...recipeForm, ingredients: ingredientsClone});
      ingredientsRef.current.value = '' // clears input
        
    } else if (btnId === 'steps-btn') {

      const stepsClone = [...recipeForm.steps, stepsRef.current.value];
      setRecipeForm({...recipeForm, steps: stepsClone});
      stepsRef.current.value = '' // clears input
    };
  };

  const deleteFromRecipeForm = e => {

    // deleting added steps or ingredients from recipe form while user filling form
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

    const changePopup = () => {
      setPopup(!popup);
      setRecipeForm(initialState);
      setEditingRecipe("")
    }

    // if form card is opened
    if (popup === true) {

      const exitWithoutSave = window.confirm('Are sure want to close window without saving?');
  
      if (exitWithoutSave) {

        // if user editing recipe which added on page
        if (editingRecipe) {

          setStorage([...storage, editingRecipe]);
          setRecipeForm(initialState)
        };

        changePopup();

      } else{ // when user canceled exit 
        //do nothing
      }
    } else if(popup === false) { // when form card not on page
      changePopup();
    };
  };

  const deleteRecipe = (e) => {

    // delete recipe from localstorage
    const updatedStorage = JSON.parse(localStorage.getItem('recipes'));
    updatedStorage.splice(e.currentTarget.id, 1); // 
    setStorage(updatedStorage);
  };
  
  return (
    <div className="App">
      <header>
        <h1>MY RECIPE APP</h1>
        <button className="add-btn" onClick={handlePopup} >Add New Recipe</button>
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
