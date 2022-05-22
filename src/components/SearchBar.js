import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { fetchProductQuery } from '../redux/actionCreators';
import styles from '../styles/SearchBar.module.css'

const SearchBar = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState('')
  const navigate = useNavigate()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/')
    const lowerCase = data.toLowerCase()
    const formData = lowerCase[0].toUpperCase() + data.substring(1)
    dispatch(fetchProductQuery(formData))
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        className={styles.formInput}
        type="text"
        value={data}
        placeholder='what are you looking for?'
        onChange={(e)=>setData(e.target.value)}
      />
      <button className={styles.btnForm}>
        <BsSearch/>
      </button>
    </form>
  )
}

export default SearchBar