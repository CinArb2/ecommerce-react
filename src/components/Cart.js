import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, emptyCart, purchaseCart } from '../redux/actionCreators'
import styles from '../styles/Cart.module.css'

const Cart = ({setIsLogin}) => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const [emptyCartMsg, setEmptyCartMsg] = useState('')

  const handleDelete = (id) => {
    if (cart.products.length > 1) {
      dispatch(deleteProduct(id))
    } else {
      dispatch(deleteProduct(id))
      dispatch(emptyCart())
    }
  }

  const handleCheckout = () => {
    if (cart.products) {
      dispatch(purchaseCart())
      setEmptyCartMsg('')
    } else {
      setEmptyCartMsg('No products in cart')
    }
  }

  useEffect(() => {
    if (cart.products) {
      setEmptyCartMsg('')
    }
  }, [cart])

  return (
    <div>
      
      {
        localStorage.getItem('token') ?
          <div>
            <h1>Cart</h1>
            {
                cart?.products?.map(prod => (
                  <div key={prod.id}>
                    <p >{prod.title}</p>
                    <p>{prod.productsInCart.quantity}</p>
                    <button onClick={()=>handleDelete(prod.id)}>Delete</button>
                  </div>
              ))
            }
            {emptyCartMsg}
            <div>
              <button onClick={handleCheckout}>Checkout</button>
            </div>
          </div>
        :
        <div className={styles.cartWrapper}>
          <img src='./images/cartIllus.png' alt="" />
          <h1 className={styles.cartTitle}>Cart</h1>
          <h3>In order to add producst to the cart please Login</h3>
          <button onClick={()=> setIsLogin(true)} className={styles.loginButton}>Login</button>
        </div>
      }
    </div>
  )
}

export default Cart