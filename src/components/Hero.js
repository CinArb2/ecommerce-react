import React from 'react'
import styles from '../styles/Hero.module.css'

const Hero = () => {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroText}>
        <h3>Upgrade to the best of the digital age</h3>
      </div>
      <div className={styles.imageHero}></div>
    </div>
  )
}

export default Hero