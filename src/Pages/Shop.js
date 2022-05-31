import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ShopForm from '../components/ShopForm'
import { getCurrentShop, getShopById, getShopProducts } from '../redux/shop/shopActionCreators'
import ShopDetails from '../components/ShopDetails'
import ShopProductList from '../components/ShopProductList'
import { useParams } from 'react-router'


const Shop = () => {
  const dispatch = useDispatch()
  const currentShop = useSelector(state => state.shop.currentShop)
  const { id } = useParams()
  
  useEffect(() => {
    if (!id) {
      console.log(currentShop.id)
      dispatch(getCurrentShop())
      dispatch(getShopProducts(currentShop.id))
    } else {
      dispatch(getShopById(id))
      dispatch(getShopProducts(id))
    }
  }, [dispatch, currentShop.id, id])

  return (
    <div>
      {
        currentShop.id ?
          <>
            <ShopDetails />
            <ShopProductList/>
          </>
        :
        <ShopForm/>
      }
    </div>    
  )
}

export default Shop