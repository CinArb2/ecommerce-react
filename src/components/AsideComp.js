import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories, fetchSelectedCategory, fetchProducts } from '../redux/actionCreators'
import styles from '../styles/AsideComp.module.css'

const AsideComp = () => {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.categories)
  
  const handleClickAllBtn = () => {
    dispatch(fetchProducts())
    window.scrollTo(0, 0);
  }

  const handleClick = (id) => {
    dispatch(fetchSelectedCategory(id))
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  return (
    <div>
      <h2 className={styles.asideTitle}>Categories</h2>
      <div className={styles.categoryBtns}>
        <button
          className={styles.btnAside}
          onClick={() => handleClickAllBtn()}
        >
          All products
        </button>
        {categories.map(category => (
        <button
          key={category.id}
          onClick={() => handleClick(category.id)}
          className={styles.btnAside}>
          {category.name}
        </button>
        )) }
      </div>
      
      
    </div>
  )
}

export default AsideComp