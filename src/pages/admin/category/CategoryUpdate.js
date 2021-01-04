import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'

import {toast} from 'react-toastify'

import AdminNav from '../../../components/nav/AdminNav'
import CategoryForm from '../../../components/forms/CategoryForm'

import { getCategory, updateCategory} from '../../../functions/category'

const CategoryUpdate = ({history, match}) => {
	const [name, setName] = useState('')
	const [isLoading, setIsLoading] = useState(false)


	const user = useSelector((state) => state.user)

	const slug = match.params.slug

	useEffect(()=>{
		getCategory(slug)
		.then(category => {
			if(category.data) setName(category.data.name)
		})
		.catch((error) => {
			console.log(error)
			if(error.respose.status === 400) toast.error(error.response.data)
		})
	}, [slug])

	const handleSubmit = async (e) => {
		e.preventDefault()
		try{
			setIsLoading(true)
			const updated = await updateCategory(match.params.slug, user.token, name)
			setIsLoading(false)
			setName('')
			toast.success(`"${updated.data.name}" is updated`)
			history.push('/admin/category')
		}catch(error) {
			setIsLoading(false)
			if(error.response.status === 400) toast.error(error.response.data)
		}
	}

	return(
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col'>
					{isLoading? <h4>Loading...</h4> : <h4>Update Category</h4>}
					<CategoryForm name={name} setName={setName} handleSubmit={handleSubmit} btnText='Update' />
				</div>
			</div>
		</div>
	)
}

export default CategoryUpdate