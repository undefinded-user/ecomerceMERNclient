import React from 'react'

const LocalSearch = ({keyWord, setKeyWord}) => {

	const handleSearchChange = (e) => {
		e.preventDefault()
		setKeyWord(e.target.value.toLowerCase())
	}

	return(
			<input
				type='search'
				value={keyWord}
				onChange={handleSearchChange}
				placeholder='Filter'
				className='form-control mb-4'
			/>
	)
}

export default LocalSearch