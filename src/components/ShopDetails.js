import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import styles from '../styles/ShopDetails.module.css'

import { AiOutlineSetting } from 'react-icons/ai'

const ShopDetails = () => {
  const currentShop = useSelector(state => state.shop.currentShop)
  const navigate = useNavigate()
  const { id } = useParams()

  const handleManageBtn = () => {
    navigate('/shop/manager/overview')
  }

  return (
    <div className={styles.containerShop}>
      <div className={styles.containerCover}>
        <img src={currentShop.coverImg} alt="" />
      </div>
      <div className={styles.shopContent}>
        <div className={styles.containerLogo}>
          <img src={currentShop.logoImg} alt="" />
        </div>
        <h1>{currentShop.title}</h1>
        <p>{currentShop.description}</p>

        {!id &&
          <button
            className={styles.btnManageShop}
            onClick={handleManageBtn}>
            <AiOutlineSetting/>
            Manage Shop</button>}
      </div>
    </div>
  )
}

export default ShopDetails