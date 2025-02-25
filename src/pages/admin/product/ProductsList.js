import React, {useState, useEffect} from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import AdminProductCard from '../../../components/cards/AdminProductCard'

import {useSelector} from 'react-redux'

import {getProducts, removeProduct} from '../../../functions/product'

import {toast} from 'react-toastify'

const ProductList = () => {
	const [products, setProducts] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const token = useSelector((state) => state.user.token)

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

	const handleRemove = async (slug) => {
		try{
			const deleted = await removeProduct(slug, token)
			loadProducts()
			toast.success(`${deleted.data.title} is deleted successfully`)

		} catch(error) {
			if(error.response.status === 400) toast.error(error.response.data)
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
									<AdminProductCard product={product} handleRemove={handleRemove} key={product._id}/>
								</div>)
							)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductList