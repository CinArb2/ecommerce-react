import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import {fetchRelatedProducts,fetchSelectedProduct, removeProductSelected, fetchCategories} from '../redux/actionCreators'
import style from '../styles/ProductDetail.module.css'
import CarouselProduct from '../components/CarouselProduct'
import ProductInfo from '../components/ProductInfo'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'
import { MdOutlineDoubleArrow } from 'react-icons/md';

const ProductDetail = () => {
  const selectedProduct = useSelector(state => state.selectedProduct)
  const relatedProd = useSelector(state => state.relatedProd)
  const categories = useSelector(state => state.categories)
  const { id } = useParams()
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchSelectedProduct(id))
    dispatch(fetchCategories())
  }, [dispatch, id])

  useEffect(() => {
    console.log(categories);
    const idSelected = categories.find(el => el.name === selectedProduct.category)?.id
    if (idSelected) {
      dispatch(fetchRelatedProducts(idSelected))
    }
  }, [dispatch, categories, selectedProduct.category])

  useEffect(() => {
    return () => {
      console.log('clean')
      dispatch(removeProductSelected())
    }
  }, [dispatch])

  return (
    <div className={style.productDetailWrapper}>
      <Link to='/' className={style.breadcrumbLink}>Home</Link>
      <span className={style.separator}><MdOutlineDoubleArrow/></span>
      <span className={style.breadcrumb}>{selectedProduct?.title}</span>
      <div className={style.productDescription}>
        <div className={style.carouselContainer}>
          <CarouselProduct />
        </div>
        <div className={style.ProductInfo}>
          <ProductInfo selectedProduct={selectedProduct}/>
        </div>
      </div>
      <h2 className={style.subheading}>Discover similar products</h2>
      <div className={style.relatedProducts}>
        {relatedProd.map(product => (
            <ProductCard key={product.id} productInfo={product} path={'/product/'}/>
          )) }
      </div>
    </div>
  )
}

export default ProductDetail