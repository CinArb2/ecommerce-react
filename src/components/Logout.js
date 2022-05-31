import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { cleanInfoCart } from '../redux/cart/cartActionCreators'
import { cleanShop } from '../redux/shop/shopActionCreators'
import { getUserInfo, updateUserInfo } from '../redux/user/userActionCreators'
import styles from '../styles/Logout.module.css'
import { BsFillImageFill ,BsShop, BsClockHistory } from 'react-icons/bs'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { MdLogout } from 'react-icons/md'


const Logout = ({ closeModal }) => {
  const userInfo = useSelector(state => state.users.userInfo)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  })
  const [selectedFile, setSelectedFile] = useState('');
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
    
    const formDataObj = new FormData();
    
    if (selectedFile)
    formDataObj.append('avatarImg', selectedFile);
    
    if (formData.username)
    formDataObj.append('username', formData.username);
      
    if (formData.email)
    formDataObj.append('email', formData.email)

    dispatch(updateUserInfo(userInfo.id, formDataObj))
  }

  const inputImgChange = (e) => {
    setSelectedFile(e.target.files[0])
  } 

  const handleLogOut = () => {
    localStorage.setItem('token', '')
    localStorage.setItem('user', '')
    closeModal(false)
    dispatch(cleanInfoCart())
    dispatch(cleanShop())
    navigate('/')
  }

  const handleMyShopBtn = () => {
    navigate('/shop/')
    closeModal(false)
    window.scrollTo(0,0)
  }

  useEffect(() => {
    dispatch(getUserInfo())
  }, [dispatch])
  
  return (
    <div className={styles.logoutContainer}>
      <div className={styles.imgContainer}>
        <img src={userInfo.avatarImg} alt="" />
      </div>
      <div>
        <h1 className={styles.logoutTitle}>Welcome {userInfo.username}!</h1>
        <p>{userInfo.email}</p>

        <div className={styles.wrapperBtns}>
          <button className={`${styles.btn} ${styles.btnSetting}`}
            onClick={handleMyShopBtn}
          >
            <BsShop className={styles.iconBtn}/>
            My shop</button>
          
          <button className={`${styles.btn} ${styles.btnSetting}`}>
            <BsClockHistory className={styles.iconBtn}/>
            Order history</button>

          <button className={`${styles.btn} ${styles.btnSetting}`} onClick={() => setShow(true)}>
            <AiOutlineEdit className={styles.iconBtn}/>
            Edit profile</button>
          
          <div className={show ? `${styles.formContainer} ${styles.show}`  : styles.formContainer}>
            <form action="" className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputContainer}>
                <label className={styles.inputLabel}>Username</label>
                <input
                  className={styles.inputForm}
                  type="text"
                  value={formData.username}
                  name='username'
                  onChange={handleChange}
                />
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.inputLabel}>Email</label>
                <input
                  className={styles.inputForm}
                  type="email"
                  value={formData.email}
                  name='email'
                  onChange={handleChange}
                />
              </div>
              <div className={styles.inputContainer}>
                <label
                  className={styles.labelImginput}>
                  <span
                    className={styles.labelTextImg}
                  >
                    New Image
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
              <button className={`${styles.btn} ${styles.btnSubmit}`} >Submit</button>
            </form>
            <button className={`${styles.btn} ${styles.btnCancel}`} onClick={() => setShow(false)}>Cancel</button>
          </div>
        </div>
      </div>
      <button
        className={`${styles.btn} ${styles.btnSetting}`}
        onClick={handleLogOut}>
        <MdLogout className={styles.iconBtn}/>
        Logout</button>
      <button className={`${styles.btn} ${styles.btnDelete}`}>
        <AiOutlineDelete className={styles.iconBtn}/>
        Delete account</button>
    </div>
  )
}

export default Logout