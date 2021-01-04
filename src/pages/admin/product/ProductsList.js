import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import AdminProductCard from '../../../components/cards/AdminProductCard'

import {getProducts} from '../../../functions/product'

const AdminDashboard = () => {
	const [products, setProducts] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(()=>{
		loadProducts(5)
	}, [])

	const loadProducts = async (count) => {
		try{
			setIsLoading(true)
			const res = await getProducts(count)	
			setIsLoading(false)
			setProducts(res.data)
		} catch(error){
			setIsLoading(false)
		 	console.log(error)
		}
	}


	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col'>
					{isLoading? <h4>Loading...</h4> : <h4>Products</h4>}
					<div className='row'>						
							{products.map((product) =>(
								<div className='col-md-4'>
									<AdminProductCard product={product} key={product._id}/>
								</div>)
							)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default AdminDashboard