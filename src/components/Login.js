import React, { useState } from 'react'
import styles from '../styles/Login.module.css'
import { useDispatch} from 'react-redux'
import { loginUser } from '../redux/user/userActionCreators'

const Login = ({setSignUp, setIsLogin}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
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
    dispatch(loginUser(formData))
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