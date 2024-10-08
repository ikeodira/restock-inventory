"use client";

import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsSidebarCollapsed } from '@/app/state';
import { ArchiveIcon, CircleDollarSign, ClipboardIcon, LayoutIcon, LucideIcon, MenuIcon, SlidersHorizontalIcon, UsersIcon } from 'lucide-react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

interface SidebarLinkProps {
    href: string,
    icon: LucideIcon,
    label: string,
    isCollapsed: boolean,

}

const SidebarLink = ({
    href,
    icon: Icon,
    label,
    isCollapsed,
}: SidebarLinkProps) => {

    const pathname = usePathname();
    const isActive = pathname === href || (pathname === "/" && href === "/dashboard");

    return (
        <Link href={href}>
            <div className={`cursor-pointer flex items-center ${isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"} hover:text-blue-500 hover:bg-blue-500 gap-3 transition-colors ${isActive ? "bg-blue-200 text-white" : ""}`}>
                <Icon className='w-6 h-6 !text-gray-700' />
                <span className={`${isCollapsed ? "hidden" : "block"} font-medium text-gray-700`}>
                    {label}
                </span>
            </div>

        </Link>
    )

}


const Sidebar = () => {

    const dispatch = useAppDispatch();
    const isSidebarCollopsed = useAppSelector((state) => state.global.isSidebarCollopsed);

    const toggleSidebar = () => {
        dispatch(setIsSidebarCollapsed(!isSidebarCollopsed));
    }

    const sidebarClassNames = `fixed flex flex-col ${isSidebarCollopsed ? "w-0 md:w-16" : "w-72 md:w-64"} bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`

    return (
        <div className={sidebarClassNames}>
            {/* TOP LOGO */}
            <div className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${isSidebarCollopsed ? 'px-5' : 'px-8'}`}>
                <div>Logo</div>
                <h1 className={`${isSidebarCollopsed ? "hidden" : "block"} font-extrabold text-2xl`}>DESTOCK</h1>
                <button className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100" onClick={toggleSidebar}>
                    <MenuIcon className='w-4 h-4' />
                </button>
            </div>

            {/* LINKS */}
            <div className='flex-grow mt-8'>
                <SidebarLink href='/dashboard' icon={LayoutIcon} label="Dashboard" isCollapsed={isSidebarCollopsed} />
                <SidebarLink href='/inventory' icon={ArchiveIcon} label="Inventory" isCollapsed={isSidebarCollopsed} />
                <SidebarLink href='/products' icon={ClipboardIcon} label="Products" isCollapsed={isSidebarCollopsed} />
                <SidebarLink href='/users' icon={UsersIcon} label="Users" isCollapsed={isSidebarCollopsed} />
                <SidebarLink href='/settings' icon={SlidersHorizontalIcon} label="Settings" isCollapsed={isSidebarCollopsed} />
                <SidebarLink href='/expenses' icon={CircleDollarSign} label="Expenses" isCollapsed={isSidebarCollopsed} />
            </div>

            {/* FOOTER */}
            <div className={`${isSidebarCollopsed ? "hidden" : "block"} mb-10`}>
                <p className='text-center text-xs text-gray-500'>&copy; {new Date().getFullYear()} Destock</p>
            </div>
        </div>
    )
}

export default Sidebar