import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getConfig } from '../helper/getConfig'

const Purchases = () => {
  const [purchasesData, setPurchasesData] = useState([])
  const products = purchasesData?.filter(el => el.cart.products.length)
  
  useEffect(() => {
    axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', getConfig())
    .then(resp =>  setPurchasesData(resp.data.data.purchases))
  }, [])
  
  return (
    <div>
      <h1>Purchases</h1>
      {
        products.map(prod => (
          <h3 key={prod.cart.id}>{prod.cart.products[0].title}</h3>
        ))
      }
    </div>
  )
}

export default Purchases