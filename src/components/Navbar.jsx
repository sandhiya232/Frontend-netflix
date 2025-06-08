import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react'; // Optional: You can use any icon library

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optional: clear auth data here (like localStorage.clear())
    navigate('/');
  };

  return (
    <nav className="bg-black text-red-600 flex items-center justify-between px-6 py-3 shadow-md">

    <h1 className="text-5xl font-bold">Netflix</h1>

      <div onClick={handleLogout} className="cursor-pointer flex items-center">
        <LogOut className="mr-2" />
        <span className="text-lg font-semibold">Logout</span>
      </div>

    </nav>
  );
}

