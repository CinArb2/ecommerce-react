import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getConfig } from '../helper/getConfig'
import PurchaseDetail from '../components/PurchaseDetail'
import styles from '../styles/Purchases.module.css'

const Purchases = () => {
  const [purchasesData, setPurchasesData] = useState([])
  
  useEffect(() => {
    axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', getConfig())
    .then(resp =>  setPurchasesData(resp.data.data.purchases))
  }, [])

  const listPurchases = purchasesData.filter(el => el.cart.products.some(q=> q.productsInCart.quantity > 0))
  
  return (
    <div className={styles.purchasesContainer}>
      <h1 className={styles.purchasesTitle}>Purchases</h1>
      <div >
        {
          listPurchases.length > 0 ?
            listPurchases.map(purchase => (
              <PurchaseDetail key={purchase.id} purchase={purchase}/>
            ))
          :
          <h1>No products purchased</h1>
       }
      </div>
    </div>
  )
}

export default Purchases