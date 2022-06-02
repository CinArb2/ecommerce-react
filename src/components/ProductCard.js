import React from 'react'
import style from '../styles/ProductCard.module.css'
import { CgArrowLongRight } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateCart } from '../redux/cart/cartActionCreators';

const ProductCard = ({productInfo, path, setIsOpen}) => {
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()
  
  const handleModalBtn = () => {
    
    if (localStorage.getItem('token')) {
      let productObj = {
        productId: productInfo.id,
        quantity: ''
      }
      const findProduct =
        cart.productsCart.length > 0 ? 
        cart.productsCart.find(el => el.productId === productInfo.id) : null

      if (findProduct) {
        productObj.quantity = findProduct.quantity + 1
        dispatch(updateCart(productObj))
        setIsOpen(true)
        return 
      }

      productObj.quantity = 1

      dispatch(addToCart(productObj))
    }
    
    setIsOpen(true)
  }

  const handleScroll = () => {
    window.scrollTo(0, 0);
  }

  return (
    <>
      <div className={style.cardWrapper}>
        <Link to={`${path}${productInfo.id}`} className={style.linkCard} onClick={handleScroll}>
          <div className={style.cardImage}>
            <img src={productInfo.productImgs[0]?.imgUrl} alt="product" />
          </div>
          <div className={style.cardBody}>
            <div className={style.cardHeader}>
              <h3 className={style.cardTitle}>{productInfo.title}</h3>
              <span className={style.cardPrice}>$ {productInfo.price}</span>
            </div>
          </div>
        </Link>
          <button
            className={style.cardButton}
            onClick={handleModalBtn}>
            <span>Buy now</span>
            <CgArrowLongRight className={style.cardIcon}/>
          </button>
      </div>
    </>
  )
}

export default ProductCard