import React, {ReactNode} from 'react';
import '@/assets/styles/globals.css'

export const metadata = {
    title: 'Next.js CRUD Application for Users and Companies Management',
    description: 'A responsive web app built with Next.js for managing users and companies, featuring CRUD operations, dynamic routing, and advanced validation.',
    keywords: ['Next.js', 'CRUD', 'Users', 'Companies', 'Formik', 'Yup', 'Dynamic Routing', 'Admin Features', 'Responsive Design'],
}

type MainLayoutProps = {
    children: ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({children}) => {
    return (
        <html>
         <body>
          <main>{children}</main>
         </body>
        </html>
    );
};

export default MainLayout;
