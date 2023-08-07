import React from 'react'
import SidebarHeader from './SidebarHeader';
import SidebarSearch from './SidebarSearch';
import SidebarChats from './SidebarChats';
const Sidebar = () => {
  return (
    <div className='sidebar'>
     <SidebarHeader/>
     <div className='sidebarscroll'>
     <SidebarSearch/>
     <SidebarChats/>  
     </div>
    </div>
  )
}

export default Sidebar
