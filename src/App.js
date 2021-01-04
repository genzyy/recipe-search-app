import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  const APP_ID = "464b19fd";
  const APP_KEY = "efa3312fc93fb24a82005dbdcccd66ad";
  const exampleReq = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;


   
  useEffect(() => {
    getRecipes();
  },[query]);

  const getRecipes = async () => {
    const response = await fetch(exampleReq);
    //* The fetch() fetches the data from the given link
    //* or performs a get request to the given link.
    //* Also async/await is used because it takes time for fetching.
    const data = await response.json();
    console.log(data.hits);
    setRecipes(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }


  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
      { recipes.map( recipe => (
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  ); 
}

export default App;
