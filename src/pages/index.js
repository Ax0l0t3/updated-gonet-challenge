import React, { useState, useEffect } from "react";
import styles from "../styles/button-style.module.css";
import styles1 from "../styles/checkbox-style.module.css";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [movieArray, setMovieArray] = useState([]);
  const [viewFavourites, setViewFavourites] = useState(false);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    setViewFavourites(!viewFavourites);
  };

  const checkboxChange = (e, index) => {
    const preArray = movieArray.map((singleElement, elementIndex) =>
      elementIndex === index
        ? { ...singleElement, favourite: e.target.checked }
        : singleElement,
    );
    setMovieArray(preArray);
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

  return (
    <main className="flex flex-col justify-center items-center">
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
                  onChange={(e) => checkboxChange(e, index)}
                />
                <div className={styles1.forCheckbox} />
              </label>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
