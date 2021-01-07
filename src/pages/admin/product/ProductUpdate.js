import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import AdminNav from '../../../components/nav/AdminNav'
import ProductForm from '../../../components/forms/ProductForm'
import FileUpload from '../../../components/forms/FileUpload'

import {toast} from 'react-toastify'

import {getCategories, getParentSubs} from '../../../functions/category'
import {updateProduct, getProduct} from '../../../functions/product'

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

const ProductUpdate = ({history, match}) => {
	// product information object
	const [product, setProduct] = useState(initialProductState)
	const [isLoading, setIsLoading] = useState(false)

	// prepopulated category and subs
	const [initialCategory, setInitialCategory] = useState('')
	const [initialSubs, setInitialSubs] = useState([])

	const user = useSelector((state) => state.user)

	const {slug} = match.params

	useEffect(()=> {
		setIsLoading(true)
		loadCategories()
		populateForm()
		setIsLoading(false)
	}, [])

	//Add subs select after user choose/change category 
	useEffect(() => {
		setIsLoading(true)
		loadSubsOptions()
		clearSubs()		
		checkInitialCategory()
		setIsLoading(false)
	}, [product.category])

	const loadCategories = async() => {
		const categories = await getCategories()
		setProduct((prevProduct) => ({
			...prevProduct,
			categories:categories.data
		}))
	}

	const loadSubsOptions = async() => {
		const subs = await getParentSubs(product.category)		
		if(subs.data) {
			setProduct((prevProduct) => ({
				...prevProduct,
				subsOptions:subs.data
			}))
		}
	}

	// refresh subs if category is changed / excluding prepopulated values
	const clearSubs = () => {
		(product.category !== initialCategory)&&setProduct((prevProduct) => ({
				...prevProduct,
				subs: []
			}))
	}

	const populateForm = async () => {
		// load product info from the server
		const res = await getProduct(slug)
		// grab info
		const product = res.data
		setInitialCategory(product.category)
		setInitialSubs(product.subs)
		setProduct((prevState) => ({
			...prevState,
			...res.data
		}))
	}

	const checkInitialCategory = ()=> {
		if(product.category === initialCategory){
			setProduct((prevProduct) => ({
				...prevProduct,
				subs: initialSubs
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
			const updatedProduct = await updateProduct(product.slug, user.token, product)
			setIsLoading(false)
			toast.success(`"${updatedProduct.data.title}" is updated`)
			history.push('/admin/products')
		} catch(error){
			console.log(error)
			if(error.response) toast.error(error.response.data.error)
		}
		
	}	

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col-md-10'>
					{isLoading? <h4>Loading...</h4> : <h4>{`Update "${product.title}" product`}</h4>}
					<FileUpload product={product} setProduct={setProduct} setIsLoading={setIsLoading} />
					<ProductForm 
						product={product}
						handleChange={handleChange}
						handleSubmit={handleSubmit}
						setProduct={setProduct}
						btnText='update'
					/>
				</div>
			</div>
		</div>
	)
}

export default ProductUpdate