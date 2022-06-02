import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { cleanInfoCart } from '../redux/cart/cartActionCreators'
import { cleanShop } from '../redux/shop/shopActionCreators'
import { cleanUserInfo, cleanUserOrders, getUserInfo, updateUserInfo } from '../redux/user/userActionCreators'
import styles from '../styles/Logout.module.css'
import { BsFillImageFill ,BsShop, BsClockHistory } from 'react-icons/bs'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { MdLogout } from 'react-icons/md'


const Logout = ({ closeModal }) => {
  const userInfo = useSelector(state => state.users.userInfo)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleLogOut = () => {
    localStorage.setItem('token', '')
    closeModal(false)
    dispatch(cleanInfoCart())
    dispatch(cleanShop())
    dispatch(cleanUserInfo())
    dispatch(cleanUserOrders())
    navigate('/')
  }

  const handleMyShopBtn = () => {
    navigate('/shop?user=me')
    closeModal(false)
    window.scrollTo(0,0)
  }

  const handleEditBtn = () => {
    navigate('/userManager/settings')
    closeModal(false)
    window.scrollTo(0,0)
  }

  const handleOrderBtn = () => {
    navigate('/userManager/orders')
    closeModal(false)
    window.scrollTo(0,0)
  }

  useEffect(() => {
    if (!userInfo.id) {
      dispatch(getUserInfo())
    }
  }, [dispatch, userInfo.id])
  
  return (
    <div className={styles.logoutContainer}>
      <div className={styles.imgContainer}>
        <img src={userInfo.avatarImg} alt="" />
      </div>
      
      <h1 className={styles.logoutTitle}>Welcome {userInfo.username}!</h1>
      <p>{userInfo.email}</p>

      <div className={styles.wrapperBtns}>
        <button className={`${styles.btn} ${styles.btnSetting}`}
          onClick={handleMyShopBtn}
        >
          <BsShop className={styles.iconBtn}/>
          My shop</button>
        
        <button className={`${styles.btn} ${styles.btnSetting}`}
          onClick={handleEditBtn}
        >
          <AiOutlineEdit className={styles.iconBtn}/>
          Edit profile</button>
        
        <button className={`${styles.btn} ${styles.btnSetting}`}
          onClick={handleOrderBtn}
        >
          <BsClockHistory className={styles.iconBtn}/>
          Order history</button>
        <button
          className={`${styles.btn} ${styles.btnSetting}`}
          onClick={handleLogOut}>
          <MdLogout className={styles.iconBtn}/>
          Logout</button>
      </div>
      
    </div>
  )
}

export default Logout