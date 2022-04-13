import React from 'react'
import { NavLink } from 'react-router-dom' 
import { BsPersonCircle, BsFillInboxFill, BsCart2 } from 'react-icons/bs';
import style from '../styles/Navbar.module.css'
import Modal from './Modal';
import { useDispatch } from 'react-redux'
import { setModal } from '../redux/actionCreators';

const Navbar = () => {
  const dispatch = useDispatch()
  

  const handleLogin = () => {
    dispatch(setModal(true))
  }

  return (
    <>
      <nav className={style.navBar}>
        <NavLink to='/' className={style.logo}>ecommerce</NavLink>
        <ul className={style.navbarList}>
          <li>
            <button  className={style.navbarBtn} onClick={handleLogin}>
              <BsPersonCircle />
            </button>
          </li>
          <li>
            <button className={style.navbarBtn}>
              <BsFillInboxFill />
            </button>
          </li>
          <li>
            <button className={style.navbarBtn}>
              <BsCart2 />
            </button>
          </li>
        </ul>
      </nav>
      <Modal/>
    </>
  )
}

export default Navbar