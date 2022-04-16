import React from 'react'
import { useDispatch } from 'react-redux'
import { cleanInfoCart } from '../redux/actionCreators'
import styles from '../styles/Logout.module.css'

const Logout = ({ closeModal }) => {

  const name = localStorage.getItem('user')
  const dispatch = useDispatch()

  return (
    <div className={styles.logoutContainer}>
      <img src="./images/logoutIllus.png" alt="" />
      <h1 className={styles.logoutTitle}>Welcome {name}!</h1>
      <button
        className={styles.btnLogout}
        onClick={() => {
          localStorage.setItem('token', '')
          localStorage.setItem('user', '')
          closeModal(false)
          dispatch(cleanInfoCart())
        }
        }>Logout</button>
    </div>
  )
}

export default Logout