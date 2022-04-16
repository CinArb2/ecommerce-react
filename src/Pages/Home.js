import React, { useEffect } from 'react'
import { useDispatch} from 'react-redux'
import AsideComp from '../components/AsideComp'
import Hero from '../components/Hero'
import ProductList from '../components/ProductList'
import SearchBar from '../components/SearchBar'
import { fetchProducts } from '../redux/actionCreators'
import styles from '../styles/Home.module.css'

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <main className={styles.mainHome}>
      <aside className={styles.asideHome}>
        <AsideComp/>
      </aside>
      <div className={styles.contentHome}>
        <Hero/>
        <SearchBar />
        <ProductList />
      </div>
    </main>
  )
}

export default Home;