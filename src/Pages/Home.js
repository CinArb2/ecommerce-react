import React from 'react'
import { useSelector } from 'react-redux'
import AsideComp from '../components/AsideComp'
import ProductList from '../components/ProductList'
import SearchBar from '../components/SearchBar'
import styles from '../styles/Home.module.css'

const Home = () => {
  const products = useSelector(state => state.products)
  return (
    <main className={styles.mainHome}>
      <aside className={styles.asideHome}>
        <AsideComp/>
      </aside>
      <div className={styles.contentHome}>
        <SearchBar />
        {
          products.length === 0 ?
          <h2 className={styles.errorMessageHome}>Product Not found... try again</h2>
          :
          <ProductList />
        }
      </div>
    </main>
  )
}

export default Home;