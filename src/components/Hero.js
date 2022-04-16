import React from 'react'
import styles from '../styles/Hero.module.css'

const Hero = () => {
  return (
    <div className={styles.containerHero}>
      <div className={styles.text}>
        <h3>FROM HOME</h3>
        <h3>BUY ANYTHING</h3>
        <h3>FROM ANYWHERE</h3>
      </div>
      <div className={styles.containerImg}>
        <img src='./images/heroIll.png' alt="hero illustration" />
      </div>
    </div>
  )
}

export default Hero