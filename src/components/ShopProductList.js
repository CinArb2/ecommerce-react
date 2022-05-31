import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from './ProductCard'
import styles from '../styles/ShopProductList.module.css'
import { cleanShopProducts } from '../redux/shop/shopActionCreators'

const ShopProductList = () => {
  const shopProducts = useSelector(state => state.shop.shopProducts)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   return () => {
  //     dispatch(cleanShopProducts())
  //   }
  // }, [dispatch])

  return (
    <div className={styles.wrappeShopList}>
      <h1>products</h1>
      <div className={styles.containerProducts}>
        {
          shopProducts?.map(product => (
          <ProductCard key={product.id} productInfo={product} path={'/product/'}/>
        ))
        }
      </div>
    </div>
  )
}

export default ShopProductList