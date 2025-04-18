import React from 'react';
import Home from '../pages/Home';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <Home />
            <Footer />
        </div>
    );
};

export default MainLayout;