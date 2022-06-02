import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getShopUser } from '../redux/shop/shopActionCreators'
import styles from '../styles/TableProduct.module.css'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'

const TableProduct = ({addBtns, handleUpdate, handleDelete}) => {
  const dispatch = useDispatch()
  const shopUser = useSelector(state => state.shop.shopUser)
  // const shopProducts = useSelector(state => state.shop.shopProducts)

  useEffect(() => {
    if (!shopUser) {
      dispatch(getShopUser())
    }
  }, [dispatch, shopUser])

  return (
     <div className={styles.containerTable}>
      <h2 className={styles.tableTitle}>Stock</h2>
      <table className={styles.stockTable}>
        <tbody>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            { addBtns && <th>Actions</th>  }
          </tr>
          {
            shopUser.products.map(prod => (
              <tr key={prod.id}>
                <td>{prod.title}</td>
                <td>{prod.quantity}</td>
                <td>{prod.price}</td>
                {
                  addBtns &&
                  <td className={styles.containerBtns}>
                    <button
                      className={styles.btnEdit}
                      onClick={()=>handleUpdate(prod)}
                    >
                      <AiOutlineEdit/>
                    </button>
                    <button
                      className={styles.btnDelete}
                      onClick={()=>handleDelete(prod.id)}
                    >
                      <AiOutlineDelete/>
                    </button>
                  </td>
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default TableProduct