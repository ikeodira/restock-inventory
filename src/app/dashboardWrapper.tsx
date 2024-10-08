"use client";

import React, { useEffect } from 'react'
import Navbar from './(components)/Navbar'
import Sidebar from './(components)/Navbar/Sidebar'
import StoreProvider, { useAppSelector } from './redux'


function DashboardLayout({ children }: { children: React.ReactNode }) {

    const isSidebarCollopsed = useAppSelector((state) => state.global.isSidebarCollopsed)
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.add("light");
        }
    })

    return (
        <div className={`${isDarkMode ? "dark" : "light"} light flex bg-gray-50 text-gray-900 w-full min-h-screen`}>
            <Sidebar />
            <main className={`flex flex-col w-full py-7 bg-gray-50 ${isSidebarCollopsed ? 'md:pl-24' : 'md:pl-72'}`} >
                <Navbar />
                {children}
            </main>

        </div >
    )
}



function DashboardWrapper({ children }: { children: React.ReactNode }) {
    return (
        <StoreProvider>
            <DashboardLayout>
                {children}
            </DashboardLayout>
        </StoreProvider>
    )
}

export default DashboardWrapper