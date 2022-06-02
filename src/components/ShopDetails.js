import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import styles from '../styles/ShopDetails.module.css'

import { AiOutlineSetting } from 'react-icons/ai'

const ShopDetails = () => {
  const shopUser = useSelector(state => state.shop.shopUser)
  const shopSelected = useSelector(state => state.shop.shopSelected)
  const navigate = useNavigate()
  const { id } = useParams()

  const handleManageBtn = () => {
    navigate('/shop/manager/overview')
  }
  
  return (
    <div className={styles.containerShop}>
      <div className={styles.containerCover}>
        <img src={ id ? shopSelected.coverImg : shopUser.coverImg} alt="" />
      </div>
      <div className={styles.shopContent}>
        <div className={styles.containerLogo}>
          <img src={id ? shopSelected.logoImg : shopUser.logoImg} alt="" />
        </div>
        <h1>{id ? shopSelected.title : shopUser.title}</h1>
        <p>{id ? shopSelected.description : shopUser.description}</p>

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