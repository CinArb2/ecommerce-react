import React from 'react'
import style from '../styles/ProductCard.module.css'
import { BsCart2 } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const ProductCard = ({productInfo, path}) => {

  const handleScroll = () => {
    window.scrollTo(0, 0);
  }

  return (
    <div className={style.cardWrapper}>
      <Link to={`${path}${productInfo.id}`} className={style.linkCard} onClick={handleScroll}>
        <div className={style.cardImage}>
        <img src={productInfo.productImgs[0]} alt="product" />
        </div>
        <div className={style.cardBody}>
          <h3 className={style.cardTitle}>{productInfo.title}</h3>
          <p className={style.price}>Price</p>
          <span className={style.cardPrice}>$ {productInfo.price}</span>
        </div>
      </Link>
      <button className={style.cardButton}>
        <BsCart2 className={style.cardIcon}/>
      </button>
    </div>
  )
}

export default ProductCard