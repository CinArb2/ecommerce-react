import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../styles/CreateProduct.module.css'
import { BsFillImageFill } from 'react-icons/bs'
import { deleteProductById, fetchCategories, fetchProducts, updateProduct } from '../redux/products/productActionCreators'
import setIsLoading from '../redux/loader/loaderActionCreators'
import axios from 'axios'
import { getShopProducts } from '../redux/shop/shopActionCreators'

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
  const [errormsg, setErrorMsg] = useState('')
  const currentShop = useSelector(state => state.shop.currentShop)
  const shopProducts = useSelector(state => state.shop.shopProducts)
  // const [edit, setEdit] = useState(false)
  
  useEffect(() => {
    dispatch(getShopProducts(currentShop.id))
  }, [dispatch, currentShop.id])

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

  const handleDelete = (id) => {
    dispatch(deleteProductById(id, currentShop.id))
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
    const API_URL = 'http://localhost:3000/api/v1'
    const formDataObj = new FormData();
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'content-type': 'multipart/form-data'
      }
    }
    
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
    // formDataObj.append('_method', 'PATCH');

    for (let value of formDataObj.values()) {
      console.log(value)
    }

    // dispatch(updateProduct(formData.productId, formDataObj, currentShop.id))

    dispatch(setIsLoading(true))
    axios.patch(`${API_URL}/products/${formData.productId}`, formDataObj, config)
      .then(response => console.log(response))
      .then(()=> dispatch(getShopProducts(currentShop.id)))
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
    setSelectedFile('')
    setFormData(
      {
        title: '',
        description: '',
        price: '',
        quantity: '',
        categoryId: '',
      }
    )
  }

  return (
    <div>
      <h2>Update Product</h2>
      <div>
        <p>Select product to update from the list</p>
        <div>
          <table>
            <tbody>
              <tr>
                <td>Product Name</td>
                <td>Available quantity</td>
                <td>Price</td>
                <td>Status</td>
                <td>action</td>
              </tr>
              {
                shopProducts.map(prod => (
                  <tr key={prod.id}>
                    <td>{prod.title}</td>
                    <td>{prod.quantity}</td>
                    <td>{prod.price}</td>
                    <td>{prod.status}</td>
                    <td>
                      <button
                        onClick={()=>handleUpdate(prod)}
                      >Update</button>
                      <button
                        onClick={()=>handleDelete(prod.id)}
                      >Delete</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>

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
            className={styles.inputForm}
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
      {errormsg && <p className={styles.messageError}> { errormsg} </p>}
    </div>
  )
}

export default ProductUpdate