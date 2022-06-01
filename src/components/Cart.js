import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteProductCart, getProductsCart, purchaseCart } from '../redux/cart/cartActionCreators'
import styles from '../styles/Cart.module.css'
import { BsTrash } from 'react-icons/bs';

const Cart = ({setIsLogin, setIsOpen}) => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  let sum = 0;

  const handleDelete = (id) => {
   dispatch(deleteProductCart(id))
  }

  const handleCheckout = () => {
    if (cart.productsCart.length > 0) {
      dispatch(purchaseCart())
    } 
  }
  
  if (cart.productsCart.length > 0) {
    sum = cart.productsCart?.reduce((prev, curr) => prev + curr.product.price * curr.quantity, 0).toFixed(2)
  }


  return (
    <div className={styles.containerCart}>
      <h1 className={styles.cartTitle}>Cart</h1>
      {
        localStorage.getItem('token') ?
          <div className={styles.cartWrapper}>
            <div className={styles.cartList}>
              {
                cart.productsCart.length > 0 ? 
                  cart?.productsCart?.map(prod => (
                  <div key={prod.id} className={styles.productContainer}>
                    <div>
                      <p className={styles.productTitle}>{prod.product.title}</p>
                      <p> <span className={styles.productTag}>Quantity:</span> {prod.quantity}</p>
                      <p> <span className={styles.productTag}>Price:</span> $ {prod.product.price}</p>
                    </div>
                    <button
                        onClick={() => handleDelete(prod.productId)}
                      className={styles.btnDelete}>
                        <BsTrash/>
                    </button>
                  </div>
                  ))
                  :
                  <div className={styles.notProducts}>
                    <img src="./images/cartIllus.png" alt="" />
                    <h2>No products in cart</h2>
                  </div>
              }
            </div>
            <div className={styles.totalContainter}>
              <h2>Total: <span className={styles.total}>$ {sum ? sum : '0'}</span></h2>
              <button
                onClick={handleCheckout}
                className={styles.btnCheckout}
                >Checkout
              </button>
            </div>
          </div>
        :
        <div className={styles.cartWrapperLogin}>
          <img src='./images/cartIllus.png' alt="" />
          <p>In order to add producst to the cart please Login</p>
          <button onClick={()=> setIsLogin(true)} className={styles.loginButton}>Login</button>
        </div>
      }
    </div>
  )
}

export default Cart