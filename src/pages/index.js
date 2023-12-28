import React, { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import styles from "../styles/button-style.module.css";
import { LiComponent } from "./LiComponent";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [movieArray, setMovieArray] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    const newArray = movieArray.filter((movie) =>
      movie.name.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setSortedArray(newArray);
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
    setSortedArray(jsonResponse);
  }

  useEffect(() => {
    logMovies();
  }, []);

  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="text-5xl">My TV Shows</h1>
      <input
        className="my-4 color text-[#471131]"
        type="text"
        placeholder="Type to filter..."
        value={inputValue}
        onChange={handleChange}
      />
      <button className={styles.buttonStyle} type="button">
        View Favourites
      </button>
      <ul className="w-full h-full flex flex-col justify-between">
        {sortedArray.map((movie, index) => {
          return (
            <LiComponent
              key={index}
              movieName={movie.name}
              moviePicture={movie.image.medium}
            />
          );
        })}
      </ul>
    </main>
  );
}
