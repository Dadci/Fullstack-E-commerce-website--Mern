const offers = [
    { name: 'Download the app', description: 'Get an exclusive $5 off code', href: '#' },
    { name: "Return when you're ready", description: '60 days of free returns', href: '#' },
    { name: 'Sign up for our newsletter', description: '15% off your first order', href: '#' },
]

 function Hero() {
    return (
        <div className="bg-white">
            <div className="flex flex-col border-b border-gray-200 lg:border-0">
                <nav aria-label="Offers" className="order-last lg:order-first">
                    <div className="mx-auto max-w-7xl lg:px-8">
                        <ul
                            role="list"
                            className="grid grid-cols-1 divide-y divide-gray-200 lg:grid-cols-3 lg:divide-x lg:divide-y-0"
                        >
                            {offers.map((offer) => (
                                <li key={offer.name} className="flex flex-col">
                                    <a
                                        href={offer.href}
                                        className="relative flex flex-1 flex-col justify-center bg-white px-4 py-6 text-center focus:z-10"
                                    >
                                        <p className="text-sm text-gray-500">{offer.name}</p>
                                        <p className="font-semibold text-gray-900">{offer.description}</p>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>

                <div className="relative">
                    <div aria-hidden="true" className="absolute hidden h-full w-1/2 bg-gray-100 lg:block" />
                    <div className="relative bg-gray-100 lg:bg-transparent">
                        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:grid lg:grid-cols-2 lg:px-8">
                            <div className="mx-auto w-full max-w-full py-24 lg:py-44 flex items-center justify-center">
                                <div className="lg:pr-24 text-left">
                                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl xl:text-7xl">
                                        The Future Is Here
                                    </h1>
                                    <p className="mt-4 text-xl font-light text-gray-600">
                                        Discover cutting-edge tech that transforms your everyday life. From smart home <br/> devices to the latest gadgets,
                                        find innovation at your fingertips.
                                    </p>
                                    <div className="mt-8">
                                        <a
                                            href="#"
                                            className="inline-block rounded-lg border border-transparent bg-blue-600 px-10 py-2.5 font-medium text-white hover:bg-blue-400"
                                        >
                                            Explore Gadgets
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-48 w-full sm:h-64 lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-1/2">
                        <img
                            alt="Modern tech devices"
                            src="https://images.unsplash.com/photo-1595303526913-c7037797ebe7?q=80&w=3329&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Hero  