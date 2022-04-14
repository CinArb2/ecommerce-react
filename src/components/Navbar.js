import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom' 
import { BsPersonCircle, BsFillInboxFill, BsCart2 } from 'react-icons/bs';
import style from '../styles/Navbar.module.css'
import Modal from './Modal';
import Login from './Login';
import Cart from './Cart';
import { useDispatch, useSelector } from 'react-redux';
import Logout from './Logout';
import { getCart } from '../redux/actionCreators';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const token = useSelector(state => state.token)
  const dispatch = useDispatch()

  const handleLoginBtn = () => {
    setIsOpen(true)
    setIsLogin(true)
  }

  const handleCartBtn = () => {
    setIsOpen(true)
    setIsLogin(false)
    //dispatch(getCart())
  }

  useEffect(() => {
    if (token) {
      setIsOpen(false)
    }
  }, [token])

  return (
    <>
      <nav className={style.navBar}>
        <NavLink to='/' className={style.logo}>iBuy</NavLink>
        <ul className={style.navbarList}>
          <li>
            <button  className={style.navbarBtn} onClick={handleLoginBtn}>
              <BsPersonCircle />
            </button>
          </li>
          <li>
            <button className={style.navbarBtn}>
              <BsFillInboxFill />
            </button>
          </li>
          <li>
            <button className={style.navbarBtn} onClick={handleCartBtn}>
              <BsCart2 />
            </button>
          </li>
        </ul>
      </nav>
      <Modal
        closeModal={setIsOpen}
        isOpen={isOpen}
      >
        {isLogin ?
          localStorage.getItem('token') ?
            <Logout closeModal={setIsOpen}/> :
            <Login closeModal={setIsOpen} />
          : <Cart setIsLogin={setIsLogin}/>}
      </Modal>
    </>
  )
}

export default Navbar