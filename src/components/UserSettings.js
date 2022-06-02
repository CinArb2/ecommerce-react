import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/UserSettings.module.css'
import { BsFillImageFill } from 'react-icons/bs'
import { deleteUser, updateUserInfo } from '../redux/user/userActionCreators';
import { AiOutlineDelete } from 'react-icons/ai'

const UserSettings = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  })
  const [selectedFile, setSelectedFile] = useState('');
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.users.userInfo)

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
    
    if (selectedFile)
    formDataObj.append('avatarImg', selectedFile);
    
    if (formData.username)
    formDataObj.append('username', formData.username);
      
    if (formData.email)
    formDataObj.append('email', formData.email)

    dispatch(updateUserInfo(userInfo.id, formDataObj))
  }

  const inputImgChange = (e) => {
    setSelectedFile(e.target.files[0])
  }
  
  const handleDelete = () => {
    dispatch(deleteUser(userInfo.id))
  }

  return (
    <div className={styles.formUserContainer}>
      <h2 className={styles.formTitle}>User settings</h2>
      <div>
        <form action="" className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
                <label className={styles.inputLabel}>Username</label>
                <input
                  className={styles.inputForm}
                  type="text"
                  value={formData.username}
                  name='username'
                  onChange={handleChange}
                />
            </div>
              <div className={styles.inputContainer}>
                <label className={styles.inputLabel}>Email</label>
                <input
                  className={styles.inputForm}
                  type="email"
                  value={formData.email}
                  name='email'
                  onChange={handleChange}
                />
              </div>
              <div className={styles.inputContainer}>
                <label
                  className={styles.labelImginput}>
                  <span
                    className={styles.labelTextImg}
                  >
                    New Image
                  </span>
                  <BsFillImageFill
                    className={styles.iconImg}
                  />
                  <input
                  className={styles.inputImg}
                  type="file"
                  accept="image/*"
                  name='avatarImg'
                  onChange={inputImgChange}
                  />
                </label>
              </div>
              <button className={`${styles.btn} ${styles.btnSubmit}`} >Submit</button>
        </form>
        <div className={styles.containerDelete}>
          <h3>Delete Profile</h3>
          <p>Once you deactivate your profile there is no way to reactivate it. </p>
          <button
            onClick={handleDelete}
            className={styles.deleteUser}>
            <AiOutlineDelete/>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserSettings