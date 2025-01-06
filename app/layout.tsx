import React, {ReactNode} from 'react';
import '@/assets/styles/globals.css'

import ReduxProvider from '../components/ReduxProvider';
import AuthProvider from '../components/AuthProvider';
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
        <AuthProvider>
            <html>
            <body className="flex flex-col min-h-screen">
            <ReduxProvider>
                <Navbar/>
                <main className="flex-1 bg-gray-50 overflow-auto">
                    {children}
                </main>
                <Footer/>
            </ReduxProvider>
            </body>
            </html>
        </AuthProvider>
    );
};

export default MainLayout;
