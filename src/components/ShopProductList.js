import React from 'react'
import { useSelector } from 'react-redux'
import ProductCard from './ProductCard'
import styles from '../styles/ShopProductList.module.css'


const ShopProductList = () => {
  const shopProducts = useSelector(state => state.shop.shopProducts)



  return (
    <div className={styles.wrappeShopList}>
      <h1>Shop products</h1>
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