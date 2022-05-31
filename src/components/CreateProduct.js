import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../styles/CreateProduct.module.css'
import { BsFillImageFill } from 'react-icons/bs'
import { fetchCategories } from '../redux/products/productActionCreators'
import setIsLoading from '../redux/loader/loaderActionCreators'
import axios from 'axios'

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    quantity: '',
    categoryId: '',
  })
  const [selectedFile, setSelectedFile] = useState('');
  const dispatch = useDispatch()
  const categories = useSelector(state => state.products.categories)
  const [errormsg, setErrorMsg] = useState('')

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => {
      return {
        ...prev,
        [name]:  value,
      }
    })
  }

  const inputImgChange = (e) => {
    setSelectedFile([e.target.files[0],e.target.files[1],e.target.files[2]])
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
    if (!selectedFile) {
      return setErrorMsg('please upload at least 1 image')
    }
    formDataObj.append('productImgs', selectedFile[0]);
    formDataObj.append('productImgs', selectedFile[1]);
    formDataObj.append('productImgs', selectedFile[2]);
    formDataObj.append('title', formData.title);
    formDataObj.append('description', formData.description)
    formDataObj.append('price', formData.price)
    formDataObj.append('quantity', formData.quantity)
    formDataObj.append('categoryId', formData.categoryId)

    for (let value of formDataObj.values()) {
      console.log(value)
    }

    dispatch(setIsLoading(true))
    axios.post(`${API_URL}/products/`, formDataObj, config)
      .then(() => {
        setErrorMsg('')
      })
      .catch(error => {
        console.log(error.response)
        if (error.response.status === 404) {
          setErrorMsg(error.response.data.message)
        }
      })
      .finally(()=> dispatch(setIsLoading(false)))
  }

  return (
    <div className={styles.createContainer}>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label htmlFor="">Title</label>
          <input
            className={styles.inputForm}
            type="text"
            value={formData.title}
            name='title'
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="">Description</label>
          <textarea
            // className={styles.inputForm}
            value={formData.description}
            name='description'
            placeholder="maximum 50 characters"
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="">Price</label>
          <input
            className={styles.inputForm}
            type="number"
            value={formData.price}
            name='price'
            min="1"
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="">Quantity</label>
          <input
            className={styles.inputForm}
            type="number"
            min="1"
            value={formData.quantity}
            name='quantity'
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputContainer}>
            <label htmlFor="categoryId">Category</label>
            <select 
                id="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                name="categoryId"
                required>
                <option value="">-- Choose --</option>
                {
                  categories.map(category => (
                    <option
                      key={category.id}
                      value={category.id}
                    >{category.name}</option>
                  ))
                }
            </select>
        </div>
        <div className={styles.inputContainer}>
          <label
            className={styles.labelImginput}>
            <span
              className={styles.labelTextImg}
            >
              Select up to 3 images for your product
            </span>
            <BsFillImageFill
              className={styles.iconImg}
            />
            <input
            className={styles.inputImg}
            type="file"
            accept="image/*"
            name='productImg'
            onChange={inputImgChange}
            multiple
            />
          </label>
        </div>
        <button>Submit</button>
      </form>
      <button>Cancel</button>
      {errormsg && <p className={styles.messageError}> {errormsg} </p>}
    </div>
  )
}

export default CreateProduct