import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { fetchProducts, setSelectedProduct, fetchRelatedProducts, removeProductSelected, removeListRelated } from '../redux/actionCreators'
import style from '../styles/ProductDetail.module.css'
import CarouselProduct from '../components/CarouselProduct'
import ProductInfo from '../components/ProductInfo'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'

const ProductDetail = () => {
  const products = useSelector(state => state.products)
  const selectedProduct = useSelector(state => state.selectedProduct)
  const relatedProd = useSelector(state => state.relatedProd)
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  useEffect(() => {
    const productSelected = products.find(el => el.id === id * 1)
    dispatch(setSelectedProduct(productSelected))
    if (productSelected) {
      dispatch(fetchRelatedProducts(productSelected?.category?.id))
    }
    return () => {
      dispatch(removeProductSelected())
      dispatch(removeListRelated())
    }
  }, [id, products, dispatch])
  
  return (
    <div className={style.productDetailWrapper}>
      <Link to='/'  className={style.breadcrumbLink}>Home</Link>
      <span className={style.breadcrumb}> - {selectedProduct?.title}</span>
      <div className={style.productDescription}>
        <div className={style.carouselContainer}>
          <CarouselProduct selectedProduct={selectedProduct}/>
        </div>
        <div className={style.ProductInfo}>
          <ProductInfo selectedProduct={selectedProduct}/>
        </div>
      </div>
      <h2 className={style.subheading}>Discover similar products</h2>
      <div className={style.relatedProducts}>
        {
          relatedProd.map(product => (
            <ProductCard key={product.id} productInfo={product} path={'/product/'}/>
          ))
        }
      </div>
    </div>
  )
}

export default ProductDetail