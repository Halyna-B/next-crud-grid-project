"use client";

import {useEffect, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {FaGoogle} from 'react-icons/fa';
import {ClientSafeProvider, getProviders, signIn, useSession} from 'next-auth/react';

import {ListItem} from './ListItem';
import profileImage from '../assets/images/profile.png'
import logoImage from '../assets/images/logo.png'


const Navbar = () => {

    const {data: session} = useSession();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [authProviders, setAuthProviders] = useState<Record<string, ClientSafeProvider> | null>(null);

    useEffect(() => {
        const fetchAuthProviders = async () => {
            try {
                const res = await getProviders();
                setAuthProviders(res);
            } catch (error) {
                console.error("Error fetching providers:", error);
            }
        };

        fetchAuthProviders();
    }, []);

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-md">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image className="w-8 h-8 rounded-full" src={logoImage} alt="Flowbite Logo"/>
                    <span
                        className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">UserCoHub</span>
                </Link>
                <div className="flex items-center gap-2 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {!session &&
                        authProviders &&
                        Object.values(authProviders).map((provider) => (
                            <button
                                key={provider.id}
                                className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                                onClick={() => signIn(provider.id)}
                            >
                                <FaGoogle className="text-white mr-2"/>
                                <span>Login with {provider.name}</span>
                            </button>
                        ))}
                    {session && (
                        <div className="relative ml-3">
                            <button type="button"
                                    className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                    id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown"
                                    data-dropdown-placement="bottom"
                                    onClick={() => setIsProfileMenuOpen((prevState: boolean) => !prevState)}>
                                <span className="sr-only">Open user menu</span>
                                <Image className="w-8 h-8 rounded-full" src={profileImage}
                                       alt="user photo"/>
                            </button>
                            {/*<!-- Dropdown menu -->*/}
                            {isProfileMenuOpen && (
                                <div
                                    id="user-menu"
                                    className=" absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="user-menu-button"
                                    tabIndex={-1}>
                                    <div className="px-4 py-3">
                                        <span
                                            className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                                        <span
                                            className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                                    </div>
                                    <ul className="py-2" aria-labelledby="user-menu-button">
                                        <li>
                                            <Link href="/"
                                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign
                                                out</Link>
                                        </li>
                                    </ul>
                                </div>)}
                        </div>)}
                    <button data-collapse-toggle="navbar-user" type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-user" aria-expanded="false"
                            onClick={() => setIsMobileMenuOpen((prevState: boolean) => !prevState)}>
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>
                <div
                    className={`items-center justify-between ${!isMobileMenuOpen && 'hidden'} w-full md:flex md:w-auto md:order-1`}
                    id="navbar-user">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <ListItem href={'/users'} title={'Users'}/>
                        <ListItem href={'/companies'} title={'Companies'}/>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;