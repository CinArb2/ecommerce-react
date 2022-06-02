import React, { useEffect, useState } from 'react'
import styles from '../styles/ShopUpdate.module.css'
import axios from 'axios'
import { useDispatch, useSelector} from 'react-redux'
import { setIsLoading } from '../redux/loader/loaderActionCreators'
import { BsFillImageFill } from 'react-icons/bs'
import { deleteShop, getShopUser, updateShop } from '../redux/shop/shopActionCreators'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'

const ShopUpdate = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  })
  const [selectedFile, setSelectedFile] = useState({
    logoImg: '',
    coverImg: ''
  });
  const [edit, setEdit] = useState({
    title: true,
    description: true
  })
  const shopUser = useSelector(state=> state.shop.shopUser)
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
    const formDataObj = new FormData();

    if(selectedFile.logoImg)
      formDataObj.append('logoImg', selectedFile.logoImg)
    
    if(selectedFile.coverImg)
      formDataObj.append('coverImg', selectedFile.coverImg)
    
    if(formData.title)
      formDataObj.append('title', formData.title)
    
    if(formData.description)
    formDataObj.append('description', formData.description)

    dispatch(updateShop(shopUser.id, formDataObj))

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
  
  const handleEditTitle = () => {
    setEdit(prev => {
      return {
        ...prev,
        title: !prev.title
      }
    })
  }

  const handleEditDesc = () => {
    setEdit(prev => {
      return {
        ...prev,
        description: !prev.description
      }
    })
  }

  const handleDelete = () => {
    dispatch(deleteShop(shopUser.id))
  }

  useEffect(() => {
    if (!shopUser) {
      dispatch(getShopUser())
    }
  }, [dispatch, shopUser])

  return (
    
    <div className={styles.formShopContainer}>
      <h1 className={styles.shopFormTitle}>Update Shop</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.labelContainer}>
          <label className={styles.inputLabel}>Title</label>
          <div className={styles.containerFlex}>
            <input
              className={styles.inputForm}
              type="text"
              value={formData.title}
              name='title'
              onChange={handleChange}
              placeholder={shopUser.title}
              disabled={edit.title}
            />
            <button
              type="button"
              onClick={handleEditTitle}
              className={styles.btnEdit}>
              <AiOutlineEdit className={styles.iconEdit}/>
            </button>
          </div>
        </div>
        <div className={styles.labelContainer}>
          <label className={styles.inputLabel}>Description</label>
          <div className={styles.containerFlex}>
            <input
              className={styles.inputForm}
              type="text"
              value={formData.description}
              name='description'
              placeholder={shopUser.description}
              onChange={handleChange}
              disabled={edit.description}
            />
            <button
              type="button"
              onClick={handleEditDesc}
              className={styles.btnEdit}>
              <AiOutlineEdit className={styles.iconEdit}/>
            </button>
          </div>
        </div>
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
        <div className={styles.containerBtns}>
          <button 
            className={styles.btnCancel}type="reset">Cancel</button>
          <button
              className={styles.btnSubmit}
              type="submit"
          >Submit</button>
        </div>
      </form>
      <div className={styles.containerDelete}>
        <h3>Delete shop</h3>
        <p>Once you delete the store there is no way to reactivate it. </p>
        <button
          onClick={handleDelete}
          className={styles.deleteShop}>
          <AiOutlineDelete/>
          Delete
        </button>
      </div>
    </div>
    
  )
}

export default ShopUpdate