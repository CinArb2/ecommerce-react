import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories, fetchSelectedCategory, fetchProducts } from '../redux/products/productActionCreators'
import styles from '../styles/AsideComp.module.css'

const compStyle = {
  color: "#485470",
  backgroundColor: "#f1f4fb",
  borderRadius: '50px'
}

const AsideComp = () => {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.products.categories)
  const [activeButton, setActiveButton] = useState("");

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
    if (!activeButton) {
      dispatch(fetchProducts())
    }
  }, [dispatch, activeButton])

  return (
    <div className={styles.asideWrapper}>
      <h2 className={styles.asideTitle}>Categories</h2>
      <div className={styles.categoryBtns}>
        <button
          className={styles.btnAside}
          onClick={() => {
            handleClickAllBtn();
            setActiveButton('all');
          }}
          style={activeButton === 'all' ? compStyle : {}}
        >
          All products
        </button>
        {categories?.map(category => (
        <button
          key={category.id}
            onClick={() => {
              handleClick(category.id);
              setActiveButton(category.id);
            }}
            className={styles.btnAside}
            style={activeButton === category.id ? compStyle : {}}
          >
          {category.name}
        </button>
        )) }
      </div>
    </div>
  )
}

export default AsideComp