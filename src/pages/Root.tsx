import React from 'react';
import { Outlet } from 'react-router-dom';
import { MainNavigation } from '../components/utils/MainNavigation';
import { Footer } from '../components/utils/Footer';

export const Root: React.FC = () => {
    return (
        <div className='w-[1200px] m-auto'>
            <MainNavigation />
            <Outlet />
            <Footer />
        </div>
    )
};