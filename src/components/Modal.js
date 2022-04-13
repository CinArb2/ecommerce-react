import React from 'react'
import styles from '../styles/Modal.module.css'
import { GrClose } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../redux/actionCreators';

const Modal = () => {
  const isOpenModal = useSelector(state => state.isOpenModal)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(setModal(false))
  }

  return (
    <>
      <div
        className={`${styles.modalBackdrop} ${isOpenModal ? styles.active : ''}`}
        onClick={handleClose}
      ></div>
      <div className={`${styles.modalWrapper} ${isOpenModal ? styles.active : ''}`}>
        <h1>Login</h1>
        <GrClose
          className={styles.closeBtn}
          onClick={handleClose}/>
      </div>
    </>
  )
}

export default Modal