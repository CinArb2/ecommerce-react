import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, emptyCart, purchaseCart } from '../redux/actionCreators'
import styles from '../styles/Cart.module.css'
import { BsTrash } from 'react-icons/bs';

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
    <div >
      <h1 className={styles.cartTitle}>Cart</h1>
      {
        localStorage.getItem('token') ?
          <div className={styles.cartWrapper}>
            {
            cart?.products?.map(prod => (
            <div key={prod.id} className={styles.productContainer}>
              <div>
                <p className={styles.productTitle}>{prod.title}</p>
                <p> <span className={styles.productTag}>Quantity:</span> {prod.productsInCart.quantity}</p>
                <p> <span className={styles.productTag}>Price:</span> $ {prod.price}</p>
              </div>
              <button
                  onClick={() => handleDelete(prod.id)}
                className={styles.btnDelete}>
                  <BsTrash/>
              </button>
            </div>
            ))
            }
            <div>
              <h2>total</h2>
            </div>
              <button
              onClick={handleCheckout}
              className={styles.btnCheckout}
              >Checkout
              </button>
            {emptyCartMsg}
          </div>
        :
        <div className={styles.cartWrapper}>
          <img src='./images/cartIllus.png' alt="" />
          
          <h3>In order to add producst to the cart please Login</h3>
          <button onClick={()=> setIsLogin(true)} className={styles.loginButton}>Login</button>
        </div>
      }
      
    </div>
  )
}

export default Cart