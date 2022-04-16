import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, emptyCart, getCart, purchaseCart } from '../redux/actionCreators'
import styles from '../styles/Cart.module.css'
import { BsTrash } from 'react-icons/bs';

const Cart = ({setIsLogin}) => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)

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
    } 
  }

  const sum = cart.products?.reduce((prev, curr) => prev + curr.price * curr.productsInCart.quantity, 0)
  
  useEffect(() => {
    dispatch(getCart())
  }, [dispatch])
  
  return (
    <div className={styles.containerCart}>
      <h1 className={styles.cartTitle}>Cart</h1>
      {
        localStorage.getItem('token') ?
          <div className={styles.cartWrapper}>
            <div className={styles.cartList}>
              {
                cart.products ? 
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