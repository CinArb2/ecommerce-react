import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ShopForm from '../components/ShopForm'
import { getShopById, getShopProducts, getShopUser } from '../redux/shop/shopActionCreators'
import ShopDetails from '../components/ShopDetails'
import ShopProductList from '../components/ShopProductList'
import { useLocation, useParams } from 'react-router'
import { useSearchParams } from 'react-router-dom'



const Shop = () => {
  const dispatch = useDispatch()
  const shopUser = useSelector(state => state.shop.shopUser)
  const { id } = useParams()
  const location = useLocation()
  const pathname = location.pathname
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (id) {
      dispatch(getShopById(id))
      dispatch(getShopProducts(id))
    }

    if (searchParams.get("user") === 'me' && !shopUser.id) {
      dispatch(getShopUser())
    }
  }, [dispatch, id, pathname, shopUser.id, searchParams])

  return (
    <div>
      {
      (searchParams.get("user") === 'me' && shopUser.id)
        &&
          <>
            <ShopDetails />
            <ShopProductList/>
          </>
      }
      {
        id &&
        <>
          <ShopDetails />
          <ShopProductList/>
        </>
      }
      {
        (searchParams.get("user") === 'me' && !shopUser.id)  && <ShopForm/>
      }
    </div>
  )
}

export default Shop