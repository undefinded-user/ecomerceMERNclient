import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

import {toast} from 'react-toastify'

import {DeleteOutlined, EditOutlined} from '@ant-design/icons'

import {removeCategory, getCategories} from '../../functions/category'


const CategoryItem = ({category, setCategories}) => {
	const [showConfirmation, setShowConfirmation] = useState(false)
	const user = useSelector((state) => state.user)

	const handleRemove = async() => {
		try{
			setShowConfirmation(false)
			const deleted = await removeCategory(category.slug, user.token)
			toast.success(`${deleted.data.name} is deleted`)
			const categories = await getCategories()
			setCategories(categories.data)

		} catch(error) {
			console.log(error)
			if(error.response.status === 400) toast.error(error.response.data)
		}
		
	}

	const renderConfirmation = () => {
		return (
			<div className='col-md-auto'>
					<p>Delete "{category.name}" category?</p>
				<div className='row justify-content-center'>
					<button onClick={handleRemove} className='btn btn-small btn-danger col-md-auto'>Yes</button>
					<button onClick={()=>setShowConfirmation(false)} className='btn btn-slmall btn-secondary col-md-auto'>Cancel</button>
				</div>
				
			</div>
		)
	}

	return (
		<div className='container' >
			<div className='row'>
				<div className='col alert alert-secondary' >
					{category.name} 
					<span className='btn btn-small float-right' onClick={()=>setShowConfirmation(true)}>
						<DeleteOutlined className='text-danger' />
					</span>
					<Link to={`/admin/category/${category.slug}`}>
						<span className='btn btn-small float-right'>
							<EditOutlined className='text-warning'/>
						</span>
					</Link>
				</div>
			</div>
			<div className='row justify-content-end'>
				{showConfirmation? renderConfirmation() : ''}
			</div>
		</div>
	)
}

export default CategoryItem