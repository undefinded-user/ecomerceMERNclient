import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import AdminNav from '../../../components/nav/AdminNav'
import SingleItem from '../../../components/category/SingleItem'
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'

import {toast} from 'react-toastify'

import {getCategories} from '../../../functions/category'
import {createSub, getSubs, removeSub } from '../../../functions/sub.js'

const SubCreate = () => {
	const [name, setName] = useState('')
	const [keyWord, setKeyWord] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [categories, setCategories] = useState([])
	const [category, setCategory] = useState('')
	const [subs, setSubs] = useState([])
	const user = useSelector((state) => state.user)

	useEffect(()=> {
		setIsLoading(true)
		loadCategories()
		loadSubs()
		setIsLoading(false)
	}, [])

	const loadCategories = async() => {
		const categories = await getCategories()
		setCategories(categories.data)
	}

	const loadSubs = async() => {
		const subs = await getSubs()
		setSubs(subs.data)
	}

	const handleSubmit = async (e) => {
		try{
			e.preventDefault()
			setIsLoading(true)
			const res = await createSub(user.token, name, category)
			toast.success(`"${res.data.name}" is created`)
			loadSubs()
			setIsLoading(false)
			setName('')
			setCategory('')
		} catch(error){
			console.log(error)
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
				<div className='col-md-10'>
					{isLoading? <h4>Loading...</h4> : <h4>Create new sub category</h4>}
					<div className='form-group'>
						<label htmlFor='category'>Parent category</label>
						<select
							value={category}
							name='category' 
							id='category' 
							className='form-control'
							onChange={(e) => setCategory(e.target.value)}
						>
							<option value=''>Please select</option>
							{categories.length&&categories.map((category) => {
								return(
									<option key={category._id} value={category._id}>
											{category.name}
									</option>
								)
							})}
						</select>
					</div>
					<CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} btnText='Create' />
					<LocalSearch kewWord={keyWord} setKeyWord={setKeyWord} />
					<hr />
					{subs.filter(searched(keyWord)).map((sub) =>{
							return(
								<SingleItem
										setItems={setSubs} 
										item={sub} 
										removeItem={removeSub} 
										getItems={getSubs}
										linkTo='sub'
										key={sub._id}/>
							)
					})}
				</div>
			</div>
		</div>
	)
}

export default SubCreate