import React from 'react'
import './LeftSide.css'
import SearchBox from "../SearchBox/SearchBox"
import SideBar from '../SideBar/SideBar'

function LeftSide() {
  return (
    <div className='LeftSide'>
      <SearchBox />
      <SideBar />
    </div>
  )
}

export default LeftSide

