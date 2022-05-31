import React, { useState } from 'react'
import styles from '../styles/SignUp.module.css'
import axios from 'axios'
import { useDispatch} from 'react-redux'
import { setIsLoading } from '../redux/loader/loaderActionCreators'
import { BsFillImageFill } from 'react-icons/bs'

const SignUp = ({ closeModal, setSignUp, setIsLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [selectedFile, setSelectedFile] = useState('');
  const [signUpError, setSignUpError] = useState('')
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
    const API_URL = 'http://localhost:3000/api/v1'
    const formDataObj = new FormData();
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    if (selectedFile)
    formDataObj.append('avatarImg', selectedFile);
    
    formDataObj.append('username', formData.username);
    formDataObj.append('email', formData.email)
    formDataObj.append('password', formData.password)

    dispatch(setIsLoading(true))
    axios.post(`${API_URL}/users`, formDataObj, config)
      .then(() => {
        setSignUpError('')
        setIsLogin(true)
        setSignUp(false)
      })
      .catch(error => {
        console.log(error.response)
        if (error.response.status === 404) {
          setSignUpError(error.response.data.message)
        }
      })
      .finally(()=> dispatch(setIsLoading(false)))
  }

  const inputImgChange = (e) => {
      setSelectedFile(e.target.files[0])
  } 
  
  return (
    <div className={styles.signUpContainer}>
      <h1 className={styles.signUpTitle}>Sign Up</h1>
      <form onSubmit={handleSubmit}>
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
        <label className={styles.inputLabel}>Password</label>
        <input
          className={styles.inputForm}
          type="password"
          value={formData.password}
          name='password'
          onChange={handleChange}
        />
        <div className={styles.inputContainer}>
          <label
            className={styles.labelImginput}>
            <span
              className={styles.labelTextImg}
            >
              Avatar Image
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
        <button
          className={styles.signUpButton}
          >Sign Up</button>
        {signUpError && <p className={styles.messageError}> { signUpError} </p>}
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