import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom' 
import { BsPersonCircle, BsCart2 } from 'react-icons/bs';
import { BiStore } from 'react-icons/bi';
import style from '../styles/Navbar.module.css'
import Modal from './Modal';
import Login from './Login';
import Cart from './Cart';
import { useSelector } from 'react-redux';
import Logout from './Logout';
import SignUp from './SignUp';
import SearchBar from './SearchBar';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [signUp, setSignUp] = useState(false)
  const token = useSelector(state => state.token)
  const cart = useSelector(state => state.cart)
  const [grow, setGrow] = useState(true)
  let totalQuantityCart = 0

  const handleLoginBtn = () => {
    setIsOpen(true)
    setIsLogin(true)
  }

  const handleCartBtn = () => {
    
    setIsOpen(true)
    setIsLogin(false)
  }

  useEffect(() => {
    if (token) {
      setIsOpen(false)
    }
  }, [token])

  if(cart.productsCart.length > 0)
   totalQuantityCart = cart.productsCart?.reduce((prev, curr)=>prev + curr.quantity, 0)

  return (
    <>
      <nav className={style.navBar}>
        <NavLink to='/' className={style.logo}>
          <img src="./images/logo.png" alt="" />
        </NavLink>
        <div
          className={style.navRight}
        >
          <SearchBar
            grow={grow}
            setGrow={setGrow}
          />
          <ul className={style.navbarList}>
            <li>
              <button className={style.navbarBtn} onClick={handleLoginBtn}>
                <BsPersonCircle className={style.navbarIcon} />
                <span className={style.navbarText}>sign In</span>
              </button>
            </li>
            {
              localStorage.getItem('token') &&
              <NavLink to='/shop?user=me'
                className={style.navbarBtn} >
                <BiStore className={style.navbarIcon} />
                <span className={style.navbarText}>My shop </span>
              </NavLink>
            }
            <li>
              <button className={style.navbarBtn} onClick={handleCartBtn}>
                <BsCart2 className={style.navbarIcon} />
                <span className={style.navbarText}>My cart</span>
              </button>
              <div className={style.navbarQuantity}>{totalQuantityCart ? totalQuantityCart : '0'}</div>
            </li>
          </ul>
        </div>
      </nav>
      <Modal
        closeModal={setIsOpen}
        setSignUp={setSignUp}
        setIsLogin={setIsLogin}
        isOpen={isOpen}>
        {isLogin ?
          localStorage.getItem('token') ?
            <Logout closeModal={setIsOpen}/> :
            <Login
              closeModal={setIsOpen}
              setSignUp={setSignUp}
              setIsLogin={setIsLogin}/>
          : signUp ?
            <SignUp
              closeModal={setIsOpen}
              setSignUp={setSignUp}
              setIsLogin={setIsLogin}/> 
            :
            <Cart setIsLogin={setIsLogin}
              setIsOpen={setIsOpen}/>}
      </Modal>
    </>
  )
}

export default Navbar