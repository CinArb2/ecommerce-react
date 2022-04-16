import React from 'react'
import styles from '../styles/Hero.module.css'

const Hero = () => {
  return (
    <div className={styles.containerHero}>
      <div>
        <h3>FROM HOME</h3>
        <h3>BUY ANYTHING</h3>
        <h3>FROM ANYWHERE</h3>
      </div>
      <img src='./images/heroIll.png' alt="hero illustration" />
    </div>
  )
}

export default Hero