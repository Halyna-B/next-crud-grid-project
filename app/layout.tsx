import React, {ReactNode} from 'react';
import '@/assets/styles/globals.css'

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
    title: 'Next.js CRUD Application for Users and Companies Management',
    description: 'A responsive web app built with Next.js for managing users and companies, featuring CRUD operations, dynamic routing, and advanced validation.',
    keywords: ['Next.js', 'CRUD', 'Users', 'Companies'],
}

type MainLayoutProps = {
    children: ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({children}) => {
    return (
        <html>
        <body className="flex flex-col min-h-screen">
        <Navbar/>
        <main className="flex-1 bg-gray-50 overflow-auto">
            {children}
        </main>
        <Footer/>
        </body>
        </html>
    );
};

export default MainLayout;
