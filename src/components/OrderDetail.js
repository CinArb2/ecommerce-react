import React from 'react'
import styles from '../styles/OrderDetail.module.css'

const OrderDetail = ({orderInfo}) => {
  return (
    <div className={styles.orderDetailContainer}>
      <h3 className={styles.orderDetailTitle}>Order # {orderInfo?.id}</h3>
      <div className={styles.orderBody}>
        <div className={styles.orderColumn}>
          <span className={styles.orderTitle}>Date</span>
          <span>{orderInfo?.createdAt}</span>
        </div>
        <div className={styles.orderColumn}>
          <span className={styles.orderTitle}>Total </span>
          <span>$ {orderInfo?.totalPrice}</span>
        </div>
        <div className={styles.orderColumn}>
          <span className={styles.orderTitle}>Products</span>
          <ul>
            {
              orderInfo?.cart.productInCarts.map(prod => (
                <li key={prod.id}>{prod?.product.title}</li>
              ))
            }
          </ul>
        </div>
        <div className={styles.orderColumn}>
          <span className={styles.orderTitle}>Quantity</span>
          <ul>
            {
              orderInfo?.cart.productInCarts.map(prod => (
                <li key={prod?.id}>{prod?.quantity}</li>
              ))
            }
          </ul>
        </div>
        <div className={styles.orderColumn}>
          <span className={styles.orderTitle}>Status</span>
          <span>purchased</span>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail