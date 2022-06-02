import React, { useState } from 'react'
import {  useSelector } from 'react-redux'
import ProductCard from './ProductCard'
import styles from '../styles/ShopProductList.module.css'
import { useParams } from 'react-router'
import Modal from './Modal'
import Logout from './Logout'
import Login from './Login'
import SignUp from './SignUp'
import Cart from './Cart'


const ShopProductList = () => {

  const shopUser = useSelector(state => state.shop.shopUser)
  const shopProducts = useSelector(state => state.shop.shopProducts)
  const { id } = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [signUp, setSignUp] = useState(false)

  return (
    <div className={styles.wrappeShopList}>
      <h1>Shop products</h1>
      <div className={styles.containerProducts}>
        {
          id ?
            shopProducts.length > 0 ?
            shopProducts.map(product => (
              <ProductCard key={product.id}
                productInfo={product}
                setIsOpen={setIsOpen}
                path={'/product/'} />))
            : 
            <p>Not products yet</p>
          : shopUser.products?.length > 0 ?
              shopUser.products.map(product => (
                <ProductCard
                  key={product.id}
                  productInfo={product}
                  setIsOpen={setIsOpen}
                  path={'/product/'} />))
              : 
            <p>Not products yet</p>
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
    </div>
  )
}

export default ShopProductList