import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Searchbar from '../Searchbar'

function Layout({children}) {
  return (
    <div className='layout'>
      
      <Header/>
      <Searchbar/>

<div style={{minHeight : '100vh'}}>
<main>
    {children}
</main>
</div>
      <Footer/>

    </div>
  )
}

export default Layout
