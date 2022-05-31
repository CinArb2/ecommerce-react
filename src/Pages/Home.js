import AsideComp from '../components/AsideComp'
import Hero from '../components/Hero'
import ProductList from '../components/ProductList'
import styles from '../styles/Home.module.css'

const Home = () => {

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