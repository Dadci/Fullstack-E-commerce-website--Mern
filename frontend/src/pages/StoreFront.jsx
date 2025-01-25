import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import ProductList from '../components/ProductList'

const StoreFront = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <Categories />
            <ProductList />
        </div>
    )
}

export default StoreFront