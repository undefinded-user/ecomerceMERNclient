import React,{useEffect, useState} from 'react'

import SingleProduct from '../components/cards/SingleProduct'

import {getPrepopulatedProduct} from '../functions/product'

import {toast} from 'react-toastify'

const ProductView = ({match}) => {
	const [product, setProduct] = useState([])
	const {slug} = match.params

	useEffect(()=>getProduct(), [])
	const getProduct = async() => {
		try{
			const result = await getPrepopulatedProduct(slug)
			setProduct(result.data)
		} catch (error) {
			console.log(error)
			error.response&&toast.error(error.response.data)
		}
		
	}

	return(
		<div className='container-fluid'>
			<div className='row pt-4 p-1'>
				<SingleProduct product={product} />
			</div>
			<div className='row'>
				<div className='col text-center pt-5 pb-5'>
					<hr/>
						<h4>Related product</h4>
					<hr/>
				</div>
			</div>
		</div>
	)
}

export default ProductView