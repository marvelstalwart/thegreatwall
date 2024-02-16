import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
export default function NavBarLayout({setReviewFormOpen}) {
  return (
    <div>
            <Navbar setReviewFormOpen={setReviewFormOpen}/>
            <Outlet/>
        </div>
  )
}
