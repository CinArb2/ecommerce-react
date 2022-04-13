import React from 'react'
import styles from '../styles/ProductInfo.module.css'

function ProductInfo({selectedProduct}) {
  return (
    <div className={styles.productContainer}>
      <h2 className={styles.title}>{selectedProduct?.title}</h2>
      <p className={styles.description}>{selectedProduct?.description}</p>
      <div className={styles.containerOtros}>
        <div className={styles.containerPrice}>
          <p className={styles.tag}>Price</p>
          <p className={styles.price}>$ {selectedProduct?.price}</p>
        </div>
        <div className={styles.containerCounter}>
          <p className={styles.tag}>Quantity</p>
          <button className={styles.btn}>-</button>
          <span className={styles.counter}>0</span>
          <button className={styles.btn}>+</button>
        </div>
      </div>
      <button className={styles.btnCart}>Add to cart</button>
    </div>
  )
}

export default ProductInfo