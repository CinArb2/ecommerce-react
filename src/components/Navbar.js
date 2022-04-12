import React from 'react'
import { NavLink } from 'react-router-dom' 
import { BsPersonCircle, BsFillInboxFill, BsCart2 } from 'react-icons/bs';
import style from '../styles/Navbar.module.css'

const Navbar = () => {
  return (
    <nav className={style.navBar}>
      <NavLink to='/' className={style.logo}>ecommerce</NavLink>
      <ul className={style.navbarList}>
        <li>Login <BsPersonCircle /></li>
        <li>Purchases <BsFillInboxFill /></li>
        <li> <BsCart2 /></li>
      </ul>
    </nav>
  )
}

export default Navbar