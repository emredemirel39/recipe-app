import React, { useState, createRef } from "react";
import RecipeForm from "./components/RecipeForm";

function App() {

  const ingredientsRef = createRef();
  const stepsRef = createRef();

  const initialState = {
    title: '',
    desc: '',
    ingredients: [],
    steps: []
  }

  const [ recipes, setRecipes ] = useState([]);
  const [ recipeForm, setRecipeForm ] = useState(initialState);

  const handleSubmit= (e) => {
    e.preventDefault();
  };

  const handleChange = (e, i) => {

    setRecipeForm({...recipeForm, [e.target.name]: e.target.value});
    // setRecipeForm({...recipeForm, ingredients: [e.target.value] })
  };

  const addRecipeForm = (e) => {

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
  
  console.log('RECIPEFORM', recipeForm);
  return (
    <div className="App">
      <RecipeForm
        recipeForm={recipeForm}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        addRecipeForm={addRecipeForm}
        ingredientsRef={ingredientsRef}
        stepsRef={stepsRef}
      />
    </div>
  );
}

export default App;
