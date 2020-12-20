import React from 'react'


const categoryForm = ({name, setName, handleSubmit, btnText}) => {
	return (
		<form onSubmit={handleSubmit}>
			<div className='form-group'>
				<label htmlFor='name'>Name</label>
				<input 
					id='name'
					type='text' 
					className='form-control'
					value={name}
					onChange={(e)=>setName(e.target.value)}
					autoFocus
					required
				/>
				<br />
				<button className='btn btn-outline-primary'>{btnText}</button>
			</div>
		</form>
	)
}

export default categoryForm