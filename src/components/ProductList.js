import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styles from '../styles/ProductList.module.css'
import Cart from './Cart'
import Login from './Login'
import Logout from './Logout'
import Modal from './Modal'
import ProductCard from './ProductCard'
import SignUp from './SignUp'

const ProductList = () => {
  const products = useSelector(state => state.products.productList)
  const [isOpen, setIsOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [signUp, setSignUp] = useState(false)

  return (
    <>
      <div className={styles.containerProducts}>
        {
          products.length === 0 ?
          <h3
            className={styles.errorMessage}
            >Product not found... try again</h3>
            :
          products?.map(product => (
            <ProductCard
              key={product.id}
              productInfo={product}
              path={'/product/'}
              setIsOpen={setIsOpen}/>
          ))
        }
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

export default ProductList