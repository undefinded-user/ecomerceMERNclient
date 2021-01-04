import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'

import {toast} from 'react-toastify'

import AdminNav from '../../../components/nav/AdminNav'
import CategoryForm from '../../../components/forms/CategoryForm'

import { getSub, updateSub} from '../../../functions/sub'
import {getCategories} from '../../../functions/category'

const SubUpdate = ({history, match}) => {
	const [categories, setCategories] = useState([])
	const [parent, setParent] = useState('')
	const [name, setName] = useState('')
	const [isLoading, setIsLoading] = useState(false)


	const user = useSelector((state) => state.user)

	const slug = match.params.slug

	useEffect(()=>{
		loadCategories()
		getSub(slug)
		.then(sub => {
			if(sub.data) {
				setName(sub.data.name)
				setParent(sub.data.parent)
			}
		})
		.catch((error) => {
			if(error.respose.status === 400) toast.error(error.response.data)
		})
	}, [slug])

	const loadCategories = async () => {
		const categories = await getCategories()
		setCategories(categories.data)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try{
			setIsLoading(true)
			const updated = await updateSub(match.params.slug, user.token, name, parent)
			setIsLoading(false)
			setName('')
			toast.success(`"${updated.data.name}" is updated`)
			history.push('/admin/sub')
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
				<div className='col-md-10'>
					{isLoading? <h4>Loading...</h4> : <h4>Update Sub category</h4>}
					<div className='form-group'>
						<label htmlFor='category'>Parent category</label>
						<select
							value={parent}
							name='category' 
							id='category' 
							className='form-control'
							onChange={(e) => setParent(e.target.value)}
						>
							<option>Please select</option>
							{categories.length&&categories.map((category) => {
								return(
									<option key={category._id} value={category._id}>
											{category.name}
									</option>
								)
							})}
						</select>
					</div>
					<CategoryForm name={name} setName={setName} handleSubmit={handleSubmit} btnText='Update' />
				</div>
			</div>
		</div>
	)
}

export default SubUpdate