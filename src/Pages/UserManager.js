import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../styles/UserManager.module.css'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { BsClockHistory } from 'react-icons/bs'
import { FiSettings } from 'react-icons/fi'
import { getUserInfo } from '../redux/user/userActionCreators'

const UserManager = () => {
  const userInfo = useSelector(state => state.users.userInfo)
  const dispatch = useDispatch()
  const location = useLocation();
  const pathname = location.pathname.split('/')[2]

  useEffect(() => {
    if (!userInfo.id) {
      dispatch(getUserInfo())
    }
  }, [dispatch, userInfo.id])

  return (
    <div className={styles.wrapperUserManager}>
      <div className={styles.userManagerControl}>
        <div className={styles.shopMagHeader}>
          <div className={styles.avatarImgContainer}>
            <img src={userInfo.avatarImg} alt="" />
          </div>
          <h3>{userInfo.username}</h3>
          <p>{userInfo.email}</p>
        </div>
        <div className={styles.shopManagerBtns}>
          
          <Link to="orders"
            className={
              pathname === "orders" ?
                `${styles.linkManager} ${styles.active}` :
                styles.linkManager
              }>
            <BsClockHistory className={styles.iconBtns}/>
            Order history
          </Link>
          <Link
            to="settings"
            className={
              pathname === "settings" ?
                `${styles.linkManager} ${styles.active}` :
                styles.linkManager
              }
          >
            <FiSettings className={styles.iconBtns}/>
            Settings
          </Link>
        </div>
      </div>
      <div className={styles.containerViews}>
        <Outlet/>
      </div>
    </div>
  )
}

export default UserManager