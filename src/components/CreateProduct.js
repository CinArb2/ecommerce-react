import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../styles/CreateProduct.module.css'
import { BsFillImageFill } from 'react-icons/bs'
import { createProduct, fetchCategories } from '../redux/products/productActionCreators'
import { openModalMsg, setError } from '../redux/error/errorActionCreators'


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
  const shopUser = useSelector(state => state.shop.shopUser)
  const errorMessage = useSelector(state => state.error.errorMsg)

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
    if (!selectedFile) {
      dispatch(setError('Please upload at least 1 image'))
      dispatch(openModalMsg())
      return 
    }
    
    const formDataObj = new FormData();
    
    formDataObj.append('productImgs', selectedFile[0]);
    formDataObj.append('productImgs', selectedFile[1]);
    formDataObj.append('productImgs', selectedFile[2]);
    formDataObj.append('title', formData.title);
    formDataObj.append('description', formData.description)
    formDataObj.append('price', formData.price)
    formDataObj.append('quantity', formData.quantity)
    formDataObj.append('categoryId', formData.categoryId)

    dispatch(createProduct(formDataObj))
    setSelectedFile('')
  }

  useEffect(() => {
    if (errorMessage === 'success') {
      setFormData({
        title: '',
        description: '',
        price: '',
        quantity: '',
        categoryId: '',
      })
    }
  }, [errorMessage, shopUser.products.length])
  
  return (
    <div className={styles.cardContainer}>
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
            className={styles.inputTextArea}
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
            className={styles.inputNumber}
            type="number"
            value={formData.price}
            name='price'
            min="1"
            step="0.01"
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="">Quantity</label>
          <input
            className={styles.inputNumber}
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
                className={styles.inputNumber}
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
              Select up to 3 product images
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
        <div className={styles.containerBtns}>
          <button type="reset" className={styles.btnCancel}>Cancel</button>
          <button type="submit" className={styles.btnSubmit}>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default CreateProduct