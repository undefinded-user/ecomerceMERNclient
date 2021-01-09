import React, {useEffect, useState} from 'react'

import ProductCard from '../components/cards/ProductCard'
import LoadingCard from '../components/cards/LoadingCard'

import {getProducts} from '../functions/product'

import {toast} from 'react-toastify'

const Home = () => {
	const [products, setProducts] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(()=>{
		loadProducts()
	}, [])

	const loadProducts = async () => {
		try{
			setIsLoading(true)
			const res = await getProducts(3)
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

export default Home