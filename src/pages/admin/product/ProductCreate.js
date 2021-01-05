import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import AdminNav from '../../../components/nav/AdminNav'
import SingleItem from '../../../components/category/SingleItem'
import ProductForm from '../../../components/forms/ProductForm'
import LocalSearch from '../../../components/forms/LocalSearch'
import FileUpload from '../../../components/forms/FileUpload'

import {toast} from 'react-toastify'

import {getCategories, getParentSubs} from '../../../functions/category'
import {createProduct} from '../../../functions/product'

const initialProductState = {
		title: '',
		slug: '',
		description: '',
		price: '',
		categories: [],
		category: '',
		subsOptions: [],
		subs: [],
		quantity: '',
		sold: 0,
		images: [],
		shipping: '',
		colors:['Black', 'Brown', 'Silver', 'White', 'Blue'],
		color: '',
		brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
		brand: ''

	}

const ProductCreate = () => {
	// product information object
	const [product, setProduct] = useState(initialProductState)
	const [isLoading, setIsLoading] = useState(false)
	const [categories, setCategories] = useState([])
	const user = useSelector((state) => state.user)

	useEffect(()=> {
		setIsLoading(true)
		loadCategories()
		setIsLoading(false)
	}, [])

	useEffect(() => {
		setIsLoading(true)
		loadSubs()
		setIsLoading(false)
	}, [product.category])

	const loadCategories = async() => {
		const categories = await getCategories()
		setProduct((prevProduct) => ({
			...prevProduct,
			categories:categories.data
		}))
	}

	const loadSubs = async() => {
		const subs = await getParentSubs(product.category)		
		if(subs.data) {
			setProduct((prevProduct) => ({
			...prevProduct,
			subsOptions:subs.data,
			subs:[]
			}))
		}
	}

	const handleChange =(e) => {
		setProduct((prevProduct) => {
			return{
				...prevProduct,
				[e.target.name] : e.target.value
			}
			
		})
	}

	

	const handleSubmit = async (e) => {
		try{
			e.preventDefault()
			const createdProduct = await createProduct(user.token, product)
			setIsLoading(false)
			toast.success(`"${createdProduct.data.title}" is created`)
			setProduct({
				...initialProductState,
				images: []
			})
		} catch(error){
			if(error.response) toast.error(error.response.data.error)
		}
		
	}	
	// const searched = (keyWord) => (category) => category.name.toLowerCase().includes(keyWord)
	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col-md-10'>
					{isLoading? <h4>Loading...</h4> : <h4>Create new product</h4>}
					<FileUpload product={product} setProduct={setProduct} setIsLoading={setIsLoading} />
					<ProductForm 
						product={product}
						handleChange={handleChange}
						handleSubmit={handleSubmit}
						setProduct={setProduct}
					/>
				</div>
			</div>
		</div>
	)
}

export default ProductCreate