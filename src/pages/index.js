import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "../styles/button-style.module.css";
import styles1 from "../styles/checkbox-style.module.css";
import { ModalDialog } from "./ModalDialog";
import { ModalScreen } from "./ModalScreen";
// Test change
// Another test change

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [movieArray, setMovieArray] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showMovieScreen, setShowMovieScreen] = useState(false);
  const [singleMovie, setSingleMovie] = useState({});
  const [viewFavourites, setViewFavourites] = useState(false);

  const addMovie = () => {
    const preArray = movieArray.map((singleElement) =>
      singleElement.id === singleMovie.id
        ? { ...singleElement, favourite: true }
        : singleElement,
    );
    setMovieArray(preArray);
  };

  const checkboxChange = (e, movie, index) => {
    setSingleMovie(movie);
  };
  
  const handleButtonClick = () => setViewFavourites(!viewFavourites);
  
  const handleCancelClick = () => {
    if(!showMovieScreen) setSingleMovie({});
    setShowModal(false);
  };
  const handleChange = (e) => setInputValue(e.target.value);

  const handleClickName = (movie) => {
    setSingleMovie(movie);
    setShowMovieScreen(true);
  };

  const handleContinueClick = () => {
    // If 'Continue' is clicked, then we remove the movie from favourites
    const preArray = movieArray.map((singleElement) =>
      singleElement.id === singleMovie.id
        ? { ...singleElement, favourite: false }
        : singleElement,
    );
    setMovieArray(preArray);
    setShowModal(false);
    if(showMovieScreen) setShowMovieScreen(!showMovieScreen);
  };

  const handleModalScreenClose = () => {
    setShowMovieScreen(false);
    setSingleMovie({});
  };

  const modalAddFavourite = () => {
    addMovie();
    if(showMovieScreen) setShowMovieScreen(!showMovieScreen);
  };
  
  const modalRemoveFavourite = () => {
    setShowModal(true);
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

  useEffect(() => {
    if (!showMovieScreen && !singleMovie.favourite) addMovie();
    if (!showMovieScreen && singleMovie.favourite) setShowModal(true);
  }, [singleMovie]);

  return (
    <div className="flex justify-center">
      {showModal &&
        createPortal(
          <ModalDialog
            alertMessage="Remove show from favourites?"
            primaryButtonText="Cancel"
            secondaryButtonText="Continue"
            handlePrimaryClick={handleCancelClick}
            handleSecondaryClick={handleContinueClick}
          />,
          document.body,
        )}
      {showMovieScreen &&
        createPortal(
          <ModalScreen handleCloseClick={handleModalScreenClose}>
            <h1>{singleMovie.name}</h1>
            <div className="flex justify-center h-full overflow-hidden">
              <div className="mr-4">
                <img src={singleMovie.image.medium} />
              </div>
              <div className="w-1/2 overflow-y-auto">
                <p>{singleMovie.summary}</p>
              </div>
            </div>
            {singleMovie.favourite ? (
              <button
                className={styles.buttonStyle}
                type="button"
                onClick={modalRemoveFavourite}
              >
                Remove from favourites
              </button>
            ) : (
              <button
                className={styles.buttonStyle}
                type="button"
                onClick={modalAddFavourite}
              >
                Add to favourites
              </button>
            )}
            {singleMovie.officialSite && (
              <a
                href={singleMovie.officialSite}
                target="_blank"
                rel="noreferrer"
              >
                {singleMovie.officialSite}
              </a>
            )}
          </ModalScreen>,
          document.body,
        )}
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
            if (!movie.name.toLowerCase().includes(inputValue.toLowerCase())) {
              return null;
            }
            return (
              <li key={index} className="border-b-2 flex items-center">
                <img className="mx-2 mb-1" src={movie.image.medium} />
                <button type="button" onClick={() => handleClickName(movie)}>
                  {movie.name}
                </button>
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
