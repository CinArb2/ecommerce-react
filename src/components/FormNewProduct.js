import React, { useState } from 'react'
import styles from '../styles/FormNewProduct.module.css'

const FormNewProduct = ({ show, setShow }) => {
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  })

    const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => {
      return {
        ...prev,
        [name]:  value,
      }
    })
  }
  const addProduct = (e) => {
    e.preventDefault()

    let formSend = formData.username ?
      formData.email ?
        formData :
        { username: formData.username}
      : { email: formData.email}
    
    // dispatch(updateUserInfo(userInfo.id, formSend))
  }

  return (
    <div>
      <form action="" className={show ? `${styles.form}${styles.show}`  : styles.form} onSubmit={addProduct}>
        <label className={styles.inputLabel}>Username</label>
        <input
          className={styles.inputForm}
          type="text"
          value={formData.username}
          name='username'
          onChange={handleChange}
        />
        <label className={styles.inputLabel}>Email</label>
        <input
          className={styles.inputForm}
          type="email"
          value={formData.email}
          name='email'
          onChange={handleChange}
        />
        <button className={styles.btnForm} >Submit</button>
      </form>
    </div>
  )
}

export default FormNewProduct;