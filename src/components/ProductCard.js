import React from 'react'
import style from '../styles/ProductCard.module.css'
import { BsCart2 } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const ProductCard = ({productInfo}) => {
  return (
    <div className={style.cardWrapper}>
      <Link to={`product/${productInfo.id}`} className={style.linkCard}>
        <div className={style.cardImage}>
        <img src={productInfo.productImgs[0]} alt="product" />
        </div>
        <div className={style.cardBody}>
          <h3 className={style.cardTitle}>{productInfo.title}</h3>
          <p className={style.price}>Price</p>
          <span>$ {productInfo.price}</span>
        </div>
      </Link>
      <button className={style.cardButton}>
        <BsCart2 className={style.cardIcon}/>
      </button>
    </div>
  )
}

export default ProductCard