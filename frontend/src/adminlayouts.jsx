import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from './components/admin/sidebar';

function AdminLayout() {
  return (
    <div className="flex h-screen">
    {/* Sidebar */}
    <Sidebar/>
  
    {/* Main Content Area */}
    <main className="flex-1 p-6 overflow-auto">
      <Outlet />
    </main>
  </div>
  
    
  );

}

export default AdminLayout;