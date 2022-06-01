import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrders } from '../redux/user/userActionCreators'
import OrderDetail from './OrderDetail'

const UserOrders = () => {
  const userOrders = useSelector(state => state.users.userOrders)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserOrders())
  }, [dispatch, userOrders.length])

  return (
    <div>
      <h1>Order History</h1>
      <div>
        {
          userOrders.length > 0
          ?
          userOrders?.map(order => (
            
            <OrderDetail key={order.id} orderInfo={order} />
            
          ))
            :
            <p>You dont have any orders active</p>
        }
      </div>
    </div>
  )
}

export default UserOrders