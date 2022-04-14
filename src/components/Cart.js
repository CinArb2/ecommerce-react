import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct } from '../redux/actionCreators'

const Cart = ({setIsLogin}) => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)

  const handleDelete = (id) => {
    dispatch(deleteProduct(id))
  }

  return (
    <div>
      <h1>Cart</h1>
      {
        localStorage.getItem('token') ?
          <div>
          {
              cart?.products?.map(prod => (
                <div key={prod.id}>
                  <p >{prod.title}</p>
                  <p>{prod.productsInCart.quantity}</p>
                  <button onClick={()=>handleDelete(prod.id)}>Delete</button>
                </div>
            ))
            }
            <div>
              <button>Checkout</button>
            </div>
          </div>
        :
        <div>
          <h3>Please login</h3>
          <button onClick={()=> setIsLogin(true)}>Login</button>
        </div>
      }
    </div>
  )
}

export default Cart