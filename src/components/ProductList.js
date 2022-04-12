import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/actionCreators'
import styles from '../styles/ProductList.module.css'
import ProductCard from './ProductCard'

const ProductList = () => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <div className={styles.containerProducts}>
      {
        products.map(product => (
          <ProductCard  key={product.id} productInfo={product}/>
        ))
      }
    </div>
  )
}

export default ProductList