import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { fetchProducts, setSelectedProduct } from '../redux/actionCreators'
import style from '../styles/ProductDetail.module.css'
import { Carousel } from 'react-carousel-minimal';

const ProductDetail = () => {
  const products = useSelector(state => state.products)
  const selectedProduct = useSelector(state => state.selectedProduct)
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  useEffect(() => {
    const productSelected = products.find(el => el.id === id * 1)
    console.log(id, productSelected)
    dispatch(setSelectedProduct(productSelected))
    
  }, [id, products, dispatch])
  
  const data = selectedProduct?.productImgs.map(img => {
    return {
      image: img,
    }
  })
  console.log(data)
  return (
    <div className={style.productDetailWrapper}>
      <p className={style.breadcrumb}>home // samsung galaxy</p>
      <div className={style.productDescription}>
        <div className={style.carouselContainer}>
          
        </div>
        <div className={style.ProductInfo}>

        </div>
      </div>
      <h2>Discover similar products</h2>
    </div>
  )
}

export default ProductDetail