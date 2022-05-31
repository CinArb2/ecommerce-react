import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getShopProducts } from '../redux/shop/shopActionCreators'
import styles from '../styles/Overview.module.css'
import TableProduct from './TableProduct'

const Overview = () => {

  const currentShop = useSelector(state => state.shop.currentShop)
  const shopProducts = useSelector(state => state.shop.shopProducts)
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (!shopProducts) {
      dispatch(getShopProducts(currentShop.id))
    }
  }, [dispatch, currentShop.id, shopProducts])
  
  return (
    <div>
      <div>
        <div className={styles.overviewHeader}>
          <h1>Welcome to the Ibuy manager!</h1>
          <p>Manage your shop easier and more fun.</p>
        </div>
        <div className={styles.overviewBody}>
          <TableProduct/>
          <div className={styles.shopSummary}>
            <h2 className={styles.summaryTitle}>My Shop Summary</h2>
            <ul>
              <li>Name: {currentShop.title} </li>
              <li>Date: {currentShop.createdAt}</li>
              <li>Status: {currentShop.status}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview