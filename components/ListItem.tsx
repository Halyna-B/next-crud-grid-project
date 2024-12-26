"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ListItemProps {
    href: string;
    title: string;
}

export const ListItem = ({ href, title }: ListItemProps) => {
    const pathname = usePathname();
    const isActive = pathname === href;


    return (
        <li>
            <Link
                href={href}
                className={` ${
                    isActive
                        ? 'text-blue-700 dark:text-blue-500'
                        : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                }`}
            >
                {title}
            </Link>
        </li>
    );
};
