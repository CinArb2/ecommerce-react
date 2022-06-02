import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { getUserInfo } from '../redux/user/userActionCreators'
import styles from '../styles/ShopManager.module.css'
import { HiViewGridAdd } from 'react-icons/hi'
import { BsPlusCircleDotted } from 'react-icons/bs'
import { AiOutlineEdit } from 'react-icons/ai'
import { FiSettings } from 'react-icons/fi'
import { getShopUser } from '../redux/shop/shopActionCreators'

const ShopManager = () => {
  const userInfo = useSelector(state => state.users.userInfo)
  const shopUser = useSelector(state => state.shop.shopUser)
  const dispatch = useDispatch()
  const location = useLocation();
  const pathname = location.pathname.split('/')[3]
  
  useEffect(() => {
    dispatch(getUserInfo())
    dispatch(getShopUser())
  }, [dispatch])

  // useEffect(() => {
  //   if (currentShop.id) {
  //     dispatch(getShopProducts(currentShop.id))
  //   }
  // }, [dispatch, currentShop.id])

  return (
    <div className={styles.wrapperShopManager}>
      <div className={styles.shopManagerControl}>
        <div className={styles.shopMagHeader}>
          <div className={styles.avatarImgContainer}>
            <img src={userInfo.avatarImg} alt="" />
          </div>
          <h3>{userInfo.username}</h3>
          <p>{userInfo.email}</p>
        </div>
        <div className={styles.shopManagerBtns}>
          <Link
            to="overview"
            className={
              pathname === "overview" ?
                `${styles.linkManager} ${styles.active}` :
                styles.linkManager
              }
          >
            <HiViewGridAdd className={styles.iconBtns}/>
            Overview
          </Link>
          <Link to="createProduct"
            className={
              pathname === "createProduct" ?
                `${styles.linkManager} ${styles.active}` :
                styles.linkManager
              }>
            <BsPlusCircleDotted className={styles.iconBtns}/>
            Create New Product
          </Link>
          <Link to="updateProduct"
            className={
              pathname === "updateProduct" ?
                `${styles.linkManager} ${styles.active}` :
                styles.linkManager
              }>
            <AiOutlineEdit className={styles.iconBtns}/>
            Update Product
          </Link>
          <Link to="updateShop"
            className={
              pathname === "updateShop" ?
                `${styles.linkManager} ${styles.active}` :
                styles.linkManager
              }
          >
            <FiSettings className={styles.iconBtns}/>
            Update Shop
          </Link>
        </div>
      </div>
      <div className={styles.containerViews}>
        <Outlet/>
      </div>
    </div>
  )
}

export default ShopManager