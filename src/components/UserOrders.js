import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrders } from '../redux/user/userActionCreators'
import OrderDetail from './OrderDetail'
import styles from '../styles/UserOrders.module.css'

const UserOrders = () => {
  const userOrders = useSelector(state => state.users.userOrders)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserOrders())
  }, [dispatch, userOrders.length])

  return (
    <div className={styles.orderContainer}>
      <h1>Order History</h1>
      <div>
        {
          userOrders.length > 0
          ?
          userOrders?.map(order => (
            
            <OrderDetail key={order.id} orderInfo={order} />
            
          ))
            :
            <p>You dont have any orders active ...</p>
        }
      </div>
    </div>
  )
}

export default UserOrders