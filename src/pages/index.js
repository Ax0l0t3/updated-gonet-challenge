import React, { useState, useEffect } from 'react'
import { Inter } from 'next/font/google'
import styles from '../styles/button-style.module.css'
import { LiComponent } from './LiComponent'

export default function Home () {
  const [inputValue, setInputValue] = useState('')

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  async function logMovies () {
    const response = await fetch('https://api.tvmaze.com/search/shows?q=all')
    const jsonResponse = await response.json()
  }

  useEffect(() => {
    logMovies()
  }, [])

  return (
    <main className="flex flex-col h-screen justify-center items-center">
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
        <LiComponent />
        <LiComponent />
        <LiComponent />
        <LiComponent />
      </ul>
    </main>
  )
}
