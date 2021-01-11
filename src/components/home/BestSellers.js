import React, {useEffect, useState} from 'react'

import ProductCard from '../cards/ProductCard'
import LoadingCard from '../cards/LoadingCard'

import {Pagination} from 'antd'

import {toast} from 'react-toastify'

import {getSortedProducts, getTotal} from '../../functions/product'

const BestSellers = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [products, setProducts] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [total, setTotal] = useState(0)

	useEffect(()=> {
		loadProducts()
	}, [currentPage])

	useEffect(()=>loadTotal(), [])

	const loadProducts = async () => {
		try{
			setIsLoading(true)
			const res = await getSortedProducts('sold', 'desc', currentPage)
			setProducts(res.data)
			setIsLoading(false)
		} catch(error){
			setIsLoading(false)
			console.log(error)
			toast.error('Load products failed')
		}		
	}

	const loadTotal = async () =>{
		try{
			const totalNum = await getTotal()
			setTotal(totalNum.data)
		} catch(error){
			console.log(error)
			error.response&&toast.error(error.response.data)
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
				<div className='row'>
					<nav className='col-md-4 offset-md-4 pt-5 p-3 text-center' >
						<Pagination
							current={currentPage}
							onChange={(page)=>setCurrentPage(page)}
							total={total/3*10}
						/>
					</nav>
				</div>
			</div>
		</>
	)
}

export default BestSellers