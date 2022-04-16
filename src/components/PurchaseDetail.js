import React from 'react'
import styles from '../styles/PurchaseDetail.module.css'

const PurchaseDetail = ({purchase}) => {
  return (
    <div className={styles.purchaseDetailContainer}>
      <div className={styles.header}> 
        <h3 className={styles.prodPurchaseTitle}>Purchase ID: {purchase.cartId}</h3>
        <p className={styles.date}>Date: {purchase.createdAt}</p>
      </div>
      <div className={styles.purchaseList}>
        <h3 className={styles.purchaseListTitle}>Products</h3>
        <ul>
          {
            purchase.cart.products.map(prod => (
              <div key={prod.id} className={styles.productDetailContainer}>
                <p>{prod.title}</p>
                <p>{prod.productsInCart.quantity}</p>
                <p>{prod.price}</p>
              </div>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default PurchaseDetail