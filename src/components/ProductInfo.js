import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, updateCart } from '../redux/actionCreators'
import styles from '../styles/ProductInfo.module.css'

function ProductInfo({ selectedProduct }) {
  const [counter, setCounter] = useState(1)
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const addCounter = () => {
    setCounter(prev => prev + 1)
  }

  const subtractCounter = () => {
    if (counter > 1) {
      setCounter(prev => prev - 1)
    } 
  }

  const handleCartBtn = () => {
    
    if (!localStorage.getItem('token')) return
    if (cart.products?.some(el => el.id === selectedProduct.id)) {
      const bodyRequest = {
      id: selectedProduct.id,
      newQuantity: counter,
      }
      dispatch(updateCart(bodyRequest))
    } else {
      const bodyRequest = {
      id: selectedProduct.id,
      quantity: counter,
      }
      dispatch(addToCart(bodyRequest))
    }
  }

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
          <button className={styles.btn} onClick={subtractCounter}>-</button>
          <span className={styles.counter}>{counter}</span>
          <button className={styles.btn} onClick={addCounter}>+</button>
        </div>
      </div>
      <button
        className={styles.btnCart}
        onClick={handleCartBtn}
      >
        Add to cart
      </button>
    </div>
  )
}

export default ProductInfo