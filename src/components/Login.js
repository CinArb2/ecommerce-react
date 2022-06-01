import React, { useState } from 'react'
import styles from '../styles/Login.module.css'
import axios from 'axios'
import { useDispatch} from 'react-redux'
import { setIsLoading } from '../redux/loader/loaderActionCreators'
import { getUserInfo } from '../redux/user/userActionCreators'

const Login = ({closeModal, setSignUp, setIsLogin}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loginError, setLoginError] = useState('')
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
    dispatch(setIsLoading(true))
    
    axios.post('http://localhost:3000/api/v1/users/login', formData)
      .then(resp => {
        localStorage.setItem('token', resp.data.token)
        setLoginError('')
        closeModal(false)
        dispatch(getUserInfo())
      })
      .catch(error => {
        if (error.response.status === 400) {
          setLoginError(error.response.data.message)
        }
      })
      .finally(()=> dispatch(setIsLoading(false)))
  }
  
  return (
    <div className={styles.loginContainer}>
      <img src='./images/login.png' alt="" />
      <h1 className={styles.loginTitle}>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <button className={styles.loginButton}>Login</button>

        {loginError && <p className={styles.messageError}>{loginError}</p>}
        
        <p>Don't have an account?
          <span
            className={styles.btnRedirect}
            onClick={() => {
              setSignUp(true);
              setIsLogin(false)
            }}>
            Sign up
          </span>
        </p>
      </form>
    </div>
  )
}

export default Login