import React, {useEffect, useState} from 'react'

import ProductCard from '../cards/ProductCard'
import LoadingCard from '../cards/LoadingCard'

import {toast} from 'react-toastify'

import {getSortedProducts} from '../../functions/product'

const BestSellers = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [products, setProducts] = useState([])

	useEffect(()=> {
		loadProducts()
	}, [])

	const loadProducts = async () => {
		try{
			setIsLoading(true)
			const res = await getSortedProducts('sold', 'desc', 3)
			setProducts(res.data)
			setIsLoading(false)
		} catch(error){
			setIsLoading(false)
			console.log(error.response.data)
			toast.error('Load products failed')
		}		
	}

	return (
		<>	
			<h4 className='text-center mb-5 mt-5 p-3 display-4 jumbotron'>
				Best Sellers
			</h4>
			<div className='container'>
				<div className='row'>
					{!isLoading&&products.map((product) => (
						<div key={product._id} className='col-md-4'>
							<ProductCard product={product} />
						</div>
					))}
					{isLoading&&<LoadingCard count={3} />}
				</div>
			</div>
		</>
	)
}

export default BestSellers