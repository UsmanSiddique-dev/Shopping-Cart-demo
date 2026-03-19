// import React from 'react'
import useCart from '../hooks/useCart'
type PropsType={
  viewCart:boolean,
 // setViewCart:React.Dispatch<React.SetStateAction<boolean>>
}

function Footer({viewCart}:PropsType) {
  const {totalItems,Totalprice}=useCart();
  const year =new Date().getFullYear()

  const pageContent=viewCart ? <p>Shopping Cart  &copy {year}</p>:(
    <>
    <p>Total Items :{totalItems}</p>
    <p>Total price :{Totalprice}</p>
    <p>Shopping Cart :{year}</p>
    </>
  )
  const content =(
    <footer className='footer'>
      {pageContent}
    </footer>
  )
  return content;
}

export default Footer