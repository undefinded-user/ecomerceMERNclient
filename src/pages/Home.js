import React, {useEffect, useState} from 'react'

import NewArrivals from '../components/home/NewArrivals'
import BestSellers from '../components/home/BestSellers'

import {getProducts, getSortedProducts} from '../functions/product'

import {toast} from 'react-toastify'

const Home = () => {

	return (
		<>
			<NewArrivals />
			<BestSellers />
		</>
	)
}

export default Home