import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { fetchProductQuery } from '../redux/actionCreators';
import styles from '../styles/SearchBar.module.css'

const SearchBar = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = data[0].toUpperCase() + data.substring(1)
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