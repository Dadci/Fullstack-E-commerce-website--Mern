import { Fragment, useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const categories = [
    { name: 'Smartphones', href: '/category/smartphones' },
    { name: 'Laptops', href: '/category/laptops' },
    { name: 'Tablets', href: '/category/tablets' },
    { name: 'Accessories', href: '/category/accessories' },
    { name: 'Wearables', href: '/category/wearables' }
]

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const cartItemsCount = useSelector(state => state.cart.items.reduce((total, item) => total + item.quantity, 0))

    return (
        <div className="bg-white">
            {/* Top notification bar */}
            <div className="bg-gray-900">
                <div className="mx-auto flex h-10 max-w-7xl items-center justify-center px-4">
                    <p className="text-center text-sm font-medium text-white">
                        Get free delivery on orders over $100
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <header className="relative bg-white">
                <nav aria-label="Top" className="mx-auto  px-4 sm:px-6 lg:px-8 border-b border-gray-200">
                    <div className="">
                        <div className="flex h-16 items-center justify-between">
                            {/* Logo */}
                            <div className="flex lg:flex-1">
                                <Link to="/">
                                    <span className="sr-only">Your Company</span>
                                    <h1 className='text-2xl font-black'>Techy</h1>
                                </Link>
                            </div>

                            {/* Mobile menu button */}
                            <div className="flex lg:hidden">
                                <button
                                    type="button"
                                    className="-ml-2 p-2 text-gray-400"
                                    onClick={() => setOpen(true)}
                                >
                                    <span className="sr-only">Open menu</span>
                                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>

                            {/* Categories - Desktop */}
                            <div className="hidden lg:flex lg:gap-x-12">
                                {categories.map((category) => (
                                    <Link
                                        key={category.name}
                                        to={category.href}
                                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </div>

                            {/* Cart */}
                            <div className="flex flex-1 items-center justify-end">
                                <Link to="/cart" className="group -m-2 flex items-center p-2">
                                    <ShoppingCartIcon
                                        className="h-6 w-6 flex-shrink-0 text-gray-700 group-hover:text-gray-500"
                                        aria-hidden="true"
                                    />
                                    <span className="ml-1 text-sm font-medium text-white w-5 h-5 flex items-center justify-center rounded-full bg-blue-800 group-hover:text-gray-200">
                                        {cartItemsCount}
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Mobile menu */}
            <Dialog as="div" className="lg:hidden" open={open} onClose={setOpen}>
                <div className="fixed inset-0 z-40 bg-black bg-opacity-25" />
                <DialogPanel className="fixed inset-y-0 left-0 z-40 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt=""
                            />
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {categories.map((category) => (
                                    <Link
                                        key={category.name}
                                        to={category.href}
                                        className="-mx-3 block px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </div>
    )
}
