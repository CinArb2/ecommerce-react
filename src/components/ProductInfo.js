import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, updateCart } from '../redux/actionCreators'
import styles from '../styles/ProductInfo.module.css'

function ProductInfo() {
  const [counter, setCounter] = useState(1)
  const cart = useSelector(state => state.cart)
  const selectedProduct = useSelector(state => state.selectedProduct)
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')

  useEffect(() => {
    setCounter(1)
  }, [selectedProduct])

  const addCounter = () => {
    setCounter(prev => prev + 1)
  }

  const subtractCounter = () => {
    if (counter > 1) {
      setCounter(prev => prev - 1)
    } 
  }

  const handleCartBtn = () => {
    if (!localStorage.getItem('token')) {
      return setMessage('Please Login in order to add products to the cart')
    }
    if (cart.products?.some(el => el.id === selectedProduct.id)) {
      const bodyRequest = {
      id: selectedProduct.id,
      newQuantity: counter,
      }
      dispatch(updateCart(bodyRequest))
      setCounter(1)
    } else {
      const bodyRequest = {
      id: selectedProduct.id,
      quantity: counter,
      }
      dispatch(addToCart(bodyRequest))
      setCounter(1)
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
      {message && <p className={styles.messageError}>{message}</p>}
    </div>
  )
}

export default ProductInfo