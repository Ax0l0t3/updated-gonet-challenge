/*THIS COMPONENT IS NOT IN USE FOR NOW*/
import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/checkbox-style.module.css";

export const LiComponent = ({
  movieName,
  moviePicture,
  moviesArray,
  indexId,
  handleArray = Function.Prototype,
  movie,
  favouritesArray,
  setFavouritesArray
}) => {
  
  
  
  console.log('Rendered LiComponent');

  return (
      <div >
        <img className="mx-2 mb-1" src={moviePicture} />
        <p>{movieName}</p>
        
      </div>
  );
};

LiComponent.propTypes = {
  movieName: PropTypes.string,
  moviePicture: PropTypes.string,
  moviesArray: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  indexId: PropTypes.number,
  handleArray: PropTypes.func,
};
