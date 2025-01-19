import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const items = [
        {
            name: "Overview",
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 22V12H15V22" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            link: "/admin"
        },
        {
            name: "Products",
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2V12H22Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21.2104 15.8881C20.5742 17.3926 19.5792 18.7183 18.3123 19.7494C17.0454 20.7805 15.5452 21.4856 13.9428 21.8029C12.3405 22.1203 10.6848 22.0403 9.12055 21.5699C7.55627 21.0996 6.13103 20.2532 4.96942 19.1048C3.80782 17.9564 2.94522 16.5409 2.45704 14.9821C1.96886 13.4233 1.86996 11.7686 2.169 10.1628C2.46804 8.55691 3.1559 7.04875 4.17245 5.77015C5.189 4.49156 6.50329 3.48144 8.0004 2.82812" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            link: "products"
        },
        {
            name: "Orders",
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 13.5V4C4 3.46957 4.21071 2.96086 4.58579 2.58579C4.96086 2.21071 5.46957 2 6 2H14.5L20 7.5V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H12.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 2V8H20" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10.42 12.6073C10.615 12.4123 10.8465 12.2576 11.1013 12.152C11.3561 12.0465 11.6292 11.9922 11.905 11.9922C12.1808 11.9922 12.4539 12.0465 12.7087 12.152C12.9635 12.2576 13.195 12.4123 13.39 12.6073C13.585 12.8023 13.7397 13.0338 13.8452 13.2886C13.9508 13.5434 14.0051 13.8165 14.0051 14.0923C14.0051 14.3681 13.9508 14.6412 13.8452 14.896C13.7397 15.1508 13.585 15.3823 13.39 15.5773L7.95 20.9973L4 21.9973L4.99 18.0473L10.42 12.6073Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            link: "orders"
        }
    ];

    return (
        <div className="flex min-h-screen relative border-r border-gray-0">
            <aside className={`${isSidebarOpen ? "w-full md:w-64" : "w-20"} bg-white transition-width duration-100`}>
                <div className={`${isSidebarOpen ? "items-start" : "items-center"} transition duration-100 h-full w-full p-10 flex flex-col justify-between`}>
                    <div className={`${isSidebarOpen ? "items-start w-full h-full" : "items-center"}`}>
                        {/* Logo */}
                        {isSidebarOpen ? (
                            <h1 className='font-bold text-xl'>Admin Panel</h1>
                        ) : (
                            <h1 className='font-bold text-xl text-center'>AP</h1>
                        )}

                        <nav className="md:mt-10 mt-5">
                            <ul className="space-y-3">
                                {items.map((item, index) => (
                                    <Link to={item.link} key={index}>
                                        <li className={`flex items-center ${isSidebarOpen ? "" : "w-12 h-14"} px-3 py-3 text-sm text-black hover:bg-gray-100 rounded-lg`}>
                                            {item.icon}
                                            <span className={`${isSidebarOpen ? "block ml-3 text-sm font-semibold" : "hidden"}`}>
                                                {item.name}
                                            </span>
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    {/* Sidebar Toggle Button */}
                    <div className={`flex items-center px-3 mt-10 py-3 text-sm text-black hover:bg-gray-100 rounded-lg ${isSidebarOpen ? "w-full" : ""}`}>
                        <button className="flex items-center" onClick={toggleSidebar}>
                            <svg className={`transform transition-transform duration-300 ${isSidebarOpen ? "rotate-0" : "rotate-180"}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 17L6 12L11 7" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M18 17L13 12L18 7" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className={`${isSidebarOpen ? "block ml-3" : "hidden"}`}>
                                Hide Sidebar
                            </span>
                        </button>
                    </div>
                </div>
            </aside>
        </div>
    )
}

export default Sidebar