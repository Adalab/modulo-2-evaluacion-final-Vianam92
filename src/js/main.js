"use strict";

let dataMovies = [];
let dataMoviesPrefer = [];

//variables
const inputElement = document.querySelector(".js-input");
const btnElement = document.querySelector(".js-btn");
const resetElement = document.querySelector(".js-reset");
const favoriteElement = document.querySelector(".js-favorite");
const resultsElement = document.querySelector(".js-results");

//get Api
function getApi(ev) {
  ev.preventDefault();
  fetch(`https://api.jikan.moe/v3/search/anime?q=${getValueInputHandler()}`)
    .then((response) => {
      //validación
      if (!response.ok) {
        throw (resultsElement.innerHTML = "Not found");
      }
      return response.json();
    })
    .then((data) => {
      dataMovies = data.results;
      renderMoviesSearch(dataMovies);
    });
}

//get paint movies
const renderMoviesSearch = (data) => {
  resultsElement.textContent = "";
  for (const movie of data) {
    console.log(movie);
    //create div
    const createDiv = document.createElement("div");
    createDiv.className = "container";
    createDiv.id = `${movie.mal_id}`;
    //create img
    const createImg = document.createElement("img");
    createImg.className = "images";
    createImg.src = `${movie.image_url}`;
    createImg.alt = `${movie.title}`;
    //create name
    const createName = document.createElement("h4");
    createName.className = "text";
    createName.textContent = `${movie.title}`;
    createDiv.appendChild(createImg);
    createDiv.appendChild(createName);
    resultsElement.appendChild(createDiv);
  }
  listenEventFavorite();
};

//get movies prefer
const renderMoviePrefer = (eve) => {
  const currentTargetId = eve.currentTarget.id;
  //const currentTarget = eve.currentTarget;
  //1er busco el id en mi array favorite
  let foundIdFavorite = dataMoviesPrefer.find(item => item.mal_id === currentTargetId);
  //findIdFavorite dara undefine pq no tiene aun datos
  if (foundIdFavorite === undefined) {
    /*let foundIdData = dataMovies.find(item => item.mal_id === currentTargetId);
    dataMoviesPrefer.push({
      imageUrl: foundIdData.image_url,
      title: foundIdData.title,
      id: foundIdData.mal_id,
    });*/
    for (let item of dataMovies) {
      dataMoviesPrefer.push({
        imageUrl: item.image_url,
        title: item.title,
        id: item.mal_id,
      });
      setInLocalStorge();
    }
  } else {
    foundIdFavorite;
  }
};

//get Value Input
const getValueInputHandler = () => {
  const valueInput = inputElement.value;
  return valueInput;
};

//button reset
const getResetHandler = () => {
  console.log("funciona");
};

//helpers
const listenEvents = (element, handler, eventType) => {
  element.addEventListener(eventType, handler);
};

//listeners
//input
listenEvents(inputElement, getValueInputHandler, "keyup");
//buscar
listenEvents(btnElement, getApi, "click");
//reset
listenEvents(resetElement, getResetHandler, "click");
//favorite
const listenEventFavorite = () => {
  const divElement = document.querySelectorAll(".container");
  for (const item of divElement) {
    listenEvents(item, renderMoviePrefer, "click");
  }
};

//local Storage
//guardo en el local
const setInLocalStorge = () => {
  const stringifyData = JSON.stringify(dataMovies);
  localStorage.setItem("data", stringifyData);
};

// lo recupero
const getFromLocalStorage = () => {
  const localStorageData = localStorage.getItem("data");
  if (localStorageData !== null) {
    dataMovies = JSON.parse(localStorageData);
  }
};

//getFromLocalStorage();
