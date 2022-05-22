import React, { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import AsideComp from '../components/AsideComp'
import Hero from '../components/Hero'
import ProductList from '../components/ProductList'
import { fetchProducts } from '../redux/actionCreators'
import styles from '../styles/Home.module.css'

const Home = () => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts())
    }
  }, [dispatch, products.length])

  return (
    <main className={styles.mainHome}>
      <aside className={styles.asideHome}>
        <AsideComp/>
      </aside>
      <div className={styles.contentHome}>
        <Hero/>
        <ProductList />
      </div>
    </main>
  )
}

export default Home;