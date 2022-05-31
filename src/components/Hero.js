import React from 'react'
import styles from '../styles/Hero.module.css'

const Hero = () => {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroText}>
        <h3>All that you need,</h3>
        <h3>All that you want,</h3>
        <h3>just here at all!</h3>
      </div>
      <div className={styles.imageHero}></div>
    </div>
  )
}

export default Hero