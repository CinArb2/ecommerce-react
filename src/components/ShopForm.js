import React, { useEffect, useState } from 'react'
import styles from '../styles/ShopForm.module.css'
import axios from 'axios'
import { useDispatch, useSelector} from 'react-redux'
import { setIsLoading } from '../redux/loader/loaderActionCreators'
import { BsFillImageFill } from 'react-icons/bs'
import { createShop, getShopUser } from '../redux/shop/shopActionCreators'
import { openModalMsg, setError } from '../redux/error/errorActionCreators'

const ShopForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  })
  const [selectedFile, setSelectedFile] = useState({
    logoImg: '',
    coverImg: ''
  });
   const shopUser = useSelector(state => state.shop.shopUser)
  const errorMessage = useSelector(state => state.error.errorMsg)
  
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => {
      return {
        ...prev,
        [name]:  value,
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!selectedFile.logoImg) {
      dispatch(setError('Please upload shop logo image'))
      dispatch(openModalMsg())
      return 
    }

    if (!selectedFile.coverImg) {
      dispatch(setError('Please upload shop cover image'))
      dispatch(openModalMsg())
      return 
    }

    const formDataObj = new FormData();
    
    formDataObj.append('logoImg', selectedFile.logoImg);
    formDataObj.append('coverImg', selectedFile.coverImg);
    formDataObj.append('title', formData.title);
    formDataObj.append('description', formData.description)


    dispatch(createShop(formDataObj))
  }

  const inputImgChange = (e) => {
    const { name } = e.target;

    setSelectedFile(prev => {
      return {
        ...prev,
        [name]:  e.target.files[0],
      }
    })
  } 

  useEffect(() => {
    if (errorMessage === 'success') {
      dispatch(getShopUser())
    }
  }, [errorMessage, dispatch])


  return (
    <div className={styles.formShopContainer}>
      <img src='./images/createShop.png' alt=""
        className={ styles.shopFormImg}/>
      <h1 className={styles.shopFormTitle}>Create Shop</h1>
      <form onSubmit={handleSubmit}>
        <label className={styles.inputLabel}>Title</label>
        <input
          className={styles.inputForm}
          type="text"
          value={formData.title}
          name='title'
          onChange={handleChange}
        />
        <label className={styles.inputLabel}>Description</label>
        <input
          className={styles.inputForm}
          type="text"
          value={formData.description}
          name='description'
          onChange={handleChange}
        />
        <div className={styles.inputContainer}>
          <label
            className={styles.labelImginput}>
            <span
              className={styles.labelTextImg}
            >
              Logo Image
            </span>
            <BsFillImageFill
              className={styles.iconImg}
            />
            <input
            className={styles.inputImg}
            type="file"
            accept="image/*"
            name='logoImg'
            onChange={inputImgChange}
            />
          </label>
        </div>
        <div className={styles.inputContainer}>
          <label
            className={styles.labelImginput}>
            <span
              className={styles.labelTextImg}
            >
              Cover Image
            </span>
            <BsFillImageFill
              className={styles.iconImg}
            />
            <input
            className={styles.inputImg}
            type="file"
            accept="image/*"
            name='coverImg'
            onChange={inputImgChange}
            />
          </label>
        </div>
        <button
          className={styles.createShopButton}
          >Sign Up</button>
      </form>
    </div>
  )
}

export default ShopForm