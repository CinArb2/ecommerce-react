import React from 'react'
import AsideComp from '../components/AsideComp'
import ProductList from '../components/ProductList'
import SearchBar from '../components/SearchBar'
import styles from '../styles/Home.module.css'

const Home = () => {
  return (
    <main className={styles.mainHome}>
      <aside className={styles.asideHome}>
        <AsideComp/>
      </aside>
      <div className={styles.contentHome}>
        <SearchBar/>
        <ProductList/>
      </div>
    </main>
  )
}

export default Home;