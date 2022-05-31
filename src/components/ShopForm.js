import React, { useState } from 'react'
import styles from '../styles/ShopForm.module.css'
import axios from 'axios'
import { useDispatch} from 'react-redux'
import { setIsLoading } from '../redux/loader/loaderActionCreators'
import { BsFillImageFill } from 'react-icons/bs'
import { getCurrentShop } from '../redux/shop/shopActionCreators'

const ShopForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  })
  const [selectedFile, setSelectedFile] = useState({
    logoImg: '',
    coverImg: ''
  });
  const [signUpError, setSignUpError] = useState('')
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
    const API_URL = 'http://localhost:3000/api/v1'
    const formDataObj = new FormData();
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'content-type': 'multipart/form-data'
      }
    }

    
    formDataObj.append('logoImg', selectedFile.logoImg);
    formDataObj.append('coverImg', selectedFile.coverImg);
    formDataObj.append('title', formData.title);
    formDataObj.append('description', formData.description)

    // for (let value of formDataObj.values()) {
    //   console.log(value)
    // }

    dispatch(setIsLoading(true))
    axios.post(`${API_URL}/shop`, formDataObj, config)
      .then(()=> dispatch(getCurrentShop()))
      .then(() => {
        setSignUpError('')
      })
      .catch(error => {
        console.log(error.response)
        if (error.response.status === 404) {
          setSignUpError(error.response.data.message)
        }
      })
      .finally(()=> dispatch(setIsLoading(false)))
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
        {signUpError && <p className={styles.messageError}> { signUpError} </p>}
      </form>
    </div>
  )
}

export default ShopForm