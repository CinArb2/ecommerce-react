import React from 'react'
import styles from '../styles/Modal.module.css'
import { GrClose } from 'react-icons/gr';

const Modal = ({closeModal, isOpen, children}) => {
  
  return (
    <>
      <div
        className={`${styles.modalBackdrop} ${isOpen ? styles.active : ''}`}
        onClick={()=>closeModal(false)}
      ></div>
      <div className={`${styles.modalWrapper} ${isOpen ? styles.active : ''}`}>
        <GrClose
          className={styles.closeBtn}
          onClick={() => closeModal(false)} />
        {children}
      </div>
    </>
  )
}

export default Modal