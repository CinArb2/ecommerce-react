import React, { useState } from 'react'
import style from '../styles/ProductCard.module.css'
import { BsCart2 } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import Cart from './Cart';
import Login from './Login';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getCart } from '../redux/actionCreators';

const ProductCard = ({productInfo, path}) => {
  const [isOpen, setIsOpen] = useState(false)
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()
  
  const handleModalBtn = () => {
    const productCart = {
      id: productInfo.id,
      quantity: 1
    }
    
    if (localStorage.getItem('token') && !cart.products?.some(el => el.id === productInfo.id)) {
      dispatch(addToCart(productCart))
      dispatch(getCart())
    } 
  }

  const handleScroll = () => {
    window.scrollTo(0, 0);
  }

  return (
    <>
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
        <button
          className={style.cardButton}
          onClick={handleModalBtn}>
          <BsCart2 className={style.cardIcon}/>
        </button>
      </div>
      <Modal
        closeModal={setIsOpen}
        isOpen={isOpen}>
        {
          localStorage.getItem('token') ?
            <Cart /> :
            <Login closeModal={setIsOpen}/>
        }
      </Modal>
    </>
  )
}

export default ProductCard