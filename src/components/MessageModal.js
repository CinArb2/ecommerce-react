import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModalMsg, setError } from '../redux/error/errorActionCreators'
import styles from '../styles/MessageModal.module.css'
import { AiOutlineCloseCircle, AiFillCheckCircle } from 'react-icons/ai';
import { BiError } from 'react-icons/bi';


const MessageModal = () => {
  const errorMessage = useSelector(state => state.error.errorMsg)
  const modalMsg = useSelector(state => state.error.modalMsg)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(closeModalMsg())
    dispatch(setError(null))
  }

  return (
    <div 
      className={modalMsg ? `${styles.modalWrapper} ${styles.open}`: styles.modalWrapper}
    >
      <div
        className={styles.modalBackdrop}
        onClick={handleClose}
      ></div>
      <div className={styles.modalContainer}>
        <h2>Message</h2>
        <p>{errorMessage}</p>
        {
          errorMessage === 'success' ?
            <div className={styles.containerIcon}>
              <AiFillCheckCircle className={styles.iconSuccess}/>
            </div>
            :
          <div className={styles.containerIcon}>
            <BiError className={styles.iconError}/>
          </div>
        }
        <button
          className={styles.btnClose}
          onClick={handleClose}>
          <AiOutlineCloseCircle/>
        </ button>
     </div>
    </div>
    
  )
}

export default MessageModal