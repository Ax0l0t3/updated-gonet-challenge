import React, { useState, useEffect } from "react";
import styles from "../styles/button-style.module.css";
import styles1 from "../styles/checkbox-style.module.css";
import { ModalDialog } from "./ModalDialog";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [movieArray, setMovieArray] = useState([]);
  const [viewFavourites, setViewFavourites] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [queMovie, setQueMovie] = useState([]);
  const obj = { cancelProp: true, continueProp: false };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    setViewFavourites(!viewFavourites);
  };

  const checkboxChange = (e, movie, index) => {
    // display a modal if the checkbox value changes from 'checked' to 'unchecked'
    if(movie.favourite === true) setShowModal(true);
    // Adding the previous state of the movie to the que so it can be restored
    const arrayForQue = [...queMovie];
    arrayForQue[index] = movie;
    // Update the movie properties
    const preArray = movieArray.map((singleElement, elementIndex) =>(
      elementIndex === index
        ? { ...singleElement, favourite: e.target.checked }
        : singleElement
    )
    );
    setMovieArray(preArray);
    setQueMovie(arrayForQue);
  };
  
  const handleCancelClick = ()=>{
    // If 'Cancel' is clicked then we restore the previous movie state
    const arrayForQue = [...movieArray];
    const number1 = queMovie.findIndex(movie=> movie);
    arrayForQue[number1] = queMovie[number1];
    console.log('handleContinueClick', arrayForQue);
    setQueMovie([]);
    setShowModal(false);
    setMovieArray(arrayForQue);
  };
  
  const handleContinueClick = ()=>{
    // If 'Continue' is clicked, then the change is kept and we clean the que array
    setQueMovie([]);
    setShowModal(false);
  };

  async function logMovies() {
    const response = await fetch("https://api.tvmaze.com/shows");
    const jsonResponse = await response.json();
    jsonResponse.sort((firstMovie, secondMovie) => {
      const lowerCaseName = firstMovie.name.toLowerCase();
      const lowerCaseComparison = secondMovie.name.toLowerCase();
      if (lowerCaseName < lowerCaseComparison) return -1;
      if (lowerCaseName > lowerCaseComparison) return 1;
      return 0;
    });
    setMovieArray(jsonResponse);
  }

  useEffect(() => {
    logMovies();
  }, []);
  
  console.log(movieArray);

  return (
    <div className="flex justify-center">
      {showModal &&
        <ModalDialog
          alertMessage="Remove show from favourites?"
          primaryButtonText="Cancel"
          secondaryButtonText="Continue"
          handlePrimaryClick={handleCancelClick}
          handleSecondaryClick={handleContinueClick}
          />
      }
      <main className="flex flex-col justify-center items-center w-9/12">
        <h1 className="text-5xl">My TV Shows</h1>
        <input
          className="my-4 text-[#471131]"
          type="text"
          placeholder="Type to filter..."
          value={inputValue}
          onChange={handleChange}
        />
        <button
          className={styles.buttonStyle}
          type="button"
          onClick={handleButtonClick}
        >
          {viewFavourites ? "View All" : "ViewFavourites"}
        </button>
        <ul className="w-full h-full flex flex-col justify-between">
          {movieArray.map((movie, index) => {
            if (viewFavourites && !movie.favourite) return null;
            if (!movie.name.toLowerCase().includes(inputValue.toLowerCase()))
              return null;
            return (
              <li key={index} className="border-b-2 flex items-center">
                <img className="mx-2 mb-1" src={movie.image.medium} />
                <p>{movie.name}</p>
                <label className={styles1.container}>
                  <input
                    className={styles1.thisInput}
                    type="checkbox"
                    checked={movie.favourite || false}
                    onChange={(e) => checkboxChange(e, movie, index)}
                  />
                  <div className={styles1.forCheckbox} />
                </label>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
