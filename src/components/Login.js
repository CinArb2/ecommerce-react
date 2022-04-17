import React, { useState } from 'react'
import styles from '../styles/Login.module.css'
import axios from 'axios'
import { useDispatch} from 'react-redux'
import { setIsLoading } from '../redux/actionCreators'
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';

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
    axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', formData)
      .then(resp => {
        localStorage.setItem('token', resp.data.data.token)
        localStorage.setItem('user', `${resp.data.data.user.firstName} ${resp.data.data.user.lastName}` )
        setLoginError('')
        closeModal(false)
      })
      .catch(error => {
        if (error.response.status === 404) {
          setLoginError(error.response.data.message)
        }
      })
      .finally(()=> dispatch(setIsLoading(false)))
  }
  
  return (
    <div className={styles.loginContainer}>
      <img src='./images/login.png' alt="" />
      <h1 className={styles.loginTitle}>Login</h1>
      <div className={styles.testData}>
        <h3>Test data</h3>
        <p> <span className={styles.icon}><MdEmail/></span>
          Louie@gmail.com</p>
        <p> <span className={styles.icon}> <RiLockPasswordFill/></span>
          test1234</p>
      </div>
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
        {loginError && <p className={styles.messageError}>{ loginError}</p>}
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