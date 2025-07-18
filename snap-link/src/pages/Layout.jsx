import React from 'react'
import { Outlet } from 'react-router'
import Footer from '../components/pageComponents/Footer'
import Navbar from '../components/pageComponents/Navbar'

function Layout() {
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout