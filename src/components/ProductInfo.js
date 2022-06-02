import React, { useEffect, useState } from 'react'
import { BiStore } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { addToCart, updateCart } from '../redux/cart/cartActionCreators'
import styles from '../styles/ProductInfo.module.css'
import Cart from './Cart';
import Login from './Login';
import Logout from './Logout';
import Modal from './Modal';
import SignUp from './SignUp';

function ProductInfo() {
  const [counter, setCounter] = useState(1)
  const cart = useSelector(state => state.cart)
  const selectedProduct = useSelector(state => state.products.selectedProduct)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //modal actions
  const [isOpen, setIsOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [signUp, setSignUp] = useState(false)

  useEffect(() => {
    setCounter(1)
  }, [selectedProduct.id])

  const addCounter = () => {
    setCounter(prev => prev + 1)
  }

  const subtractCounter = () => {
    if (counter > 1) {
      setCounter(prev => prev - 1)
    } 
  }

  const handleViewShop = () => {
    navigate(`/shop/${selectedProduct.shopId}`)
    window.scrollTo(0, 0);
  }

  const handleCartBtn = () => {
    if (localStorage.getItem('token')) {
    

      let bodyRequest = {
        productId: selectedProduct.id,
        quantity: ''
      }

      let productAlreadyIncart = cart.productsCart.length > 0 ? cart.productsCart?.find(el => el.productId === selectedProduct.id) : null

      if (productAlreadyIncart) {
        bodyRequest.quantity = counter + productAlreadyIncart.quantity
        dispatch(updateCart(bodyRequest))
      } else {
        bodyRequest.quantity = counter
        dispatch(addToCart(bodyRequest))
      }
      setCounter(1)
    }
    setIsOpen(true)
  }


  return (
    <>
    <div className={styles.productContainer}>
      <h2 className={styles.title}>{selectedProduct?.title}</h2>
      <div className={styles.shopInfo}>
        <div className={styles.shopInfoHeader}>
          <div className={styles.shopLogoWrapper}>
            <img src={selectedProduct?.shop?.logoImg} alt="" className={styles.shopAvatar}/>
          </div>
          <p className={styles.shopName}>
          {selectedProduct?.shop?.title}</p>
        </div>
        <button
          className={styles.btnViewShop}
          onClick={handleViewShop}
        >
          <BiStore />
          <span>
            View Shop
          </span>
        </button>
      </div>
      <p className={styles.description}>{selectedProduct?.description}</p>
      <div className={styles.containerOtros}>
        <div className={styles.containerPrice}>
          <p className={styles.tag}>Price</p>
          <p className={styles.price}>$ {selectedProduct?.price}</p>
        </div>
        <div className={styles.containerCounter}>
          <p className={styles.tag}>Quantity</p>
          <button className={styles.btnLeft} onClick={subtractCounter}>-</button>
          <span className={styles.counter}>{counter}</span>
          <button className={styles.btnRight} onClick={addCounter}>+</button>
        </div>
      </div>
      <button
        className={styles.btnCart}
        onClick={handleCartBtn}>
        Add to cart
      </button>
      </div>
      <Modal
        closeModal={setIsOpen}
        setSignUp={setSignUp}
        setIsLogin={setIsLogin}
        isOpen={isOpen}>
        {isLogin ?
          localStorage.getItem('token') ?
            <Logout closeModal={setIsOpen}/> :
            <Login
              closeModal={setIsOpen}
              setSignUp={setSignUp}
              setIsLogin={setIsLogin}/>
          : signUp ?
            <SignUp
              closeModal={setIsOpen}
              setSignUp={setSignUp}
              setIsLogin={setIsLogin}/> 
            :
            <Cart setIsLogin={setIsLogin}
              setIsOpen={setIsOpen}/>}
      </Modal>
    </>
  )
}

export default ProductInfo