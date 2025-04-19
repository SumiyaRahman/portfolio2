import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className='container mx-auto'>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;