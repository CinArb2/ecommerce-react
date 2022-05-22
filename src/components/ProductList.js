import React from 'react'
import { useSelector } from 'react-redux'
import styles from '../styles/ProductList.module.css'
import ProductCard from './ProductCard'

const ProductList = () => {
  const products = useSelector(state => state.products)

  return (
    <div className={styles.containerProducts}>
      {
        products.length === 0 ?
        <h3
          className={styles.errorMessage}
          >Product not found... try again</h3>
          :
        products.map(product => (
          <ProductCard key={product.id} productInfo={product} path={'/product/'}/>
        ))
      }
    </div>
  )
}

export default ProductList