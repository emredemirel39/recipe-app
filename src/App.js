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
    setRecipes([...recipes, recipeForm])
    setRecipeForm(initialState)
  };

  const handleChange = (e, i) => {

    setRecipeForm({...recipeForm, [e.target.name]: e.target.value});

    // if (e.target.name[i] === recipeForm.steps[i] ) {
      
    //   //const stepsClone = { ...e.currentTarget.value + e.target.value };
    //   //console.log('working', stepsClone)
    //   // console.log(e.currentTarget.id, recipeForm.steps[e.currentTarget.id])
    //   // const test = recipeForm.steps[e.currentTarget.id]
    //   // setRecipeForm({...recipeForm, test: e.target.value})
    // }
    // else {
    //   setRecipeForm({...recipeForm, [e.target.name]: e.target.value});
    // // setRecipeForm({...recipeForm, ingredients: [e.target.value] })
    // }
  };

  const handleAddedIngredient = (e, i) => {
    const ingredientsClone = [...recipeForm.ingredients]

    ingredientsClone[i] = e.target.value

    setRecipeForm({
      ...recipeForm,
      ingredients: ingredientsClone
    });
  };

  const handleAddedStep = (e, i) => {
    const stepsClone = [...recipeForm.steps]

    stepsClone[i] = e.target.value

    setRecipeForm({
      ...recipeForm,
      steps: stepsClone
    });
  };

  const addRecipeForm = (e, i) => {

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

const addRecipes = () => {
  
}

  
  console.log('RECIPEFORM', recipeForm);
  console.log('Recipes', recipes)
  return (
    <div className="App">
      <RecipeForm
        recipeForm={recipeForm}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        addRecipeForm={addRecipeForm}
        ingredientsRef={ingredientsRef}
        stepsRef={stepsRef}
        handleAddedStep={handleAddedStep}
        handleAddedIngredient={handleAddedIngredient}
        addRecipes={addRecipes}
      />
    </div>
  );
}

export default App;
