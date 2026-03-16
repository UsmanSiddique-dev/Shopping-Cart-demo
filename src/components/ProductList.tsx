import React from 'react'
import useCart from '../hooks/useCart';
import useProducts from '../hooks/useProduct';

import {type  UseProductsContextType } from '../context/ProductsProvider';
function ProductList() {
  const [dispatch,REDUCER_ACTIONS,totalItems,Totalprice,cart]=useCart()
  return (
    <div>ProductList</div>
  )
}

export default ProductList