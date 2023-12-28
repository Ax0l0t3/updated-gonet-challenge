import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/checkbox-style.module.css'

export const LiComponent = ({ movieName, moviePicture }) => {
  return (
    <li>
      <div className="border-b-2 flex items-center">
        <img className="mx-2 mb-1" src={moviePicture} />
        <p>{movieName}</p>
        <label className={styles.container}>
          <input className={styles.thisInput} type="checkbox" />
          <div className={styles.forCheckbox} />
        </label>
      </div>
    </li>
  )
}

LiComponent.propTypes = {
  movieName: PropTypes.string,
  moviePicture: PropTypes.string
}
