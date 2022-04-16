import React, { useState } from 'react'
import styles from '../styles/SignUp.module.css'
import axios from 'axios'

const SignUp = ({ closeModal, setSignUp, setIsLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    role: ''
  })
  const [signUpError, setSignUpError] = useState('')

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
    axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users', formData)
      .then(() => {
        setSignUpError('')
        setIsLogin(true)
        setSignUp(false)
      })
      .catch(error => {
        if (error.response.status === 400) {
          setSignUpError(error.response.data.message)
        }
      })
  }

  return (
    <div className={styles.signUpContainer}>
      <h1 className={styles.signUpTitle}>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label className={styles.inputLabel}>First Name</label>
        <input
          className={styles.inputForm}
          type="text"
          value={formData.firstName}
          name='firstName'
          onChange={handleChange}
        />
        <label className={styles.inputLabel}>Last Name</label>
        <input
          className={styles.inputForm}
          type="text"
          value={formData.lastName}
          name='lastName'
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
        <label className={styles.inputLabel}>Password</label>
        <input
          className={styles.inputForm}
          type="password"
          value={formData.password}
          name='password'
          onChange={handleChange}
        />
        <label className={styles.inputLabel}>Phone (10 characters)</label>
        <input
          className={styles.inputForm}
          type="text"
          value={formData.phone}
          name='phone'
          onChange={handleChange}
        />
        <button
          className={styles.signUpButton}
          >Sign Up</button>
        {signUpError && <p> { signUpError} </p>}
        <p>Already have an account?
          <span
            className={styles.btnRedirect}
            onClick={() => {
              setSignUp(false);
              setIsLogin(true)
            }}>
            Login
          </span>
        </p>
      </form>
    </div>
  )
}

export default SignUp