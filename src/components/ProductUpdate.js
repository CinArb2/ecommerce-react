import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../styles/ProductUpdate.module.css'
import { BsFillImageFill } from 'react-icons/bs'
import { deleteProductById, fetchCategories, updateProduct } from '../redux/products/productActionCreators'
import setIsLoading from '../redux/loader/loaderActionCreators'
import axios from 'axios'
import { getShopProducts, getShopUser } from '../redux/shop/shopActionCreators'
import TableProduct from './TableProduct'

const ProductUpdate = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    quantity: '',
    categoryId: '',
    productId: ''
  })
  const [selectedFile, setSelectedFile] = useState('');
  const dispatch = useDispatch()
  const categories = useSelector(state => state.products.categories)
  const shopUser = useSelector(state => state.shop.shopUser)
  const errorMessage = useSelector(state => state.error.errorMsg)
  
  useEffect(() => {
    if (!shopUser) {
      dispatch(getShopUser())
    }
  }, [dispatch, shopUser])

  useEffect(() => {
    if (!categories) {
      dispatch(fetchCategories())
    }
  }, [dispatch, categories])

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

  const handleDelete = (id) => {
    dispatch(deleteProductById(id))
  }

  const handleUpdate = (productInfo) => {
    setFormData(
      {
        title: productInfo.title,
        description: productInfo.description,
        price: productInfo.price,
        quantity: productInfo.quantity,
        categoryId: productInfo.categoryId,
        productId: productInfo.id
      }
    )
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const formDataObj = new FormData();
    
    if (selectedFile[0]) 
      formDataObj.append('productImgs', selectedFile[0]);
    
    if (selectedFile[1]) 
    formDataObj.append('productImgs', selectedFile[1]);
    
    if (selectedFile[2])
    formDataObj.append('productImgs', selectedFile[2]);

    formDataObj.append('title', formData.title);
    formDataObj.append('description', formData.description)
    formDataObj.append('price', formData.price)
    formDataObj.append('quantity', formData.quantity)
    formDataObj.append('categoryId', formData.categoryId)

    dispatch(updateProduct(formData.productId, formDataObj))

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
    <div className={styles.containerUpdate}>
      <h2 className={styles.updateTitle}>Update Product</h2>
      <p className={styles.updateText}>Select a product to update from the list</p>
      <div className={styles.containerInfo}>
        <div className={styles.containerTable}>
          <TableProduct
            addBtns={true}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        </div>

        <form onSubmit={handleSubmit} className={styles.cardContainer}>
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
              step="0.01"
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
                  className={styles.inputNumber}
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
          <div className={styles.containerBtns}>
            <button className={styles.btnCancel} type="reset">Cancel</button>
            <button className={styles.btnSubmit} type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductUpdate