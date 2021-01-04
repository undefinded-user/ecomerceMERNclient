import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import AdminNav from '../../../components/nav/AdminNav'
import SingleItem from '../../../components/category/SingleItem'
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'

import {toast} from 'react-toastify'

import {createCategory, getCategories, removeCategory} from '../../../functions/category.js'


const CategoryCreate = () => {
	const [name, setName] = useState('')
	const [keyWord, setKeyWord] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [categories, setCategories] = useState([])
	const user = useSelector((state) => state.user)

	useEffect(()=> {
		loadCategories()
	}, [])

	const loadCategories = async() => {
		const categories = await getCategories()
		setCategories(categories.data)
	}

	const handleSubmit = async (e) => {
		try{
			e.preventDefault()
			setIsLoading(true)
			const res = await createCategory(user.token, name)
			toast.success(`"${res.data.name}" is created`)
			setIsLoading(false)
			setName('')
			loadCategories()
		} catch(error){
			setIsLoading(false)
			toast.error(error.response.data)
		}
		
	}	

	const searched = (keyWord) => (category) => category.name.toLowerCase().includes(keyWord)
	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<AdminNav />
				</div>
				<div className='col'>
					{isLoading? <h4>Loading...</h4> : <h4>Create new category</h4>}
					<CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} btnText='Create' />
					<LocalSearch kewWord={keyWord} setKeyWord={setKeyWord} />
					<hr />
					{categories.filter(searched(keyWord)).map((category) =>{
						return(
							<SingleItem
									item={category}
									setItems={setCategories}
									getItems={getCategories}
									removeItem={removeCategory}
									linkTo='category'
									key={category._id}
							/>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default CategoryCreate