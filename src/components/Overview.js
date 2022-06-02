import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getShopUser } from '../redux/shop/shopActionCreators'
import styles from '../styles/Overview.module.css'
import TableProduct from './TableProduct'

const Overview = () => {

  const shopUser = useSelector(state => state.shop.shopUser)

  const dispatch = useDispatch()
  
  useEffect(() => {
    if (!shopUser) {
      dispatch(getShopUser())
    }
  }, [dispatch, shopUser])
  
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
              <li>Name: {shopUser.title} </li>
              <li>Date: {shopUser.createdAt}</li>
              <li>Status: {shopUser.status}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview