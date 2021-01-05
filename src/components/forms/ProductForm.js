import React, {useState} from 'react'

import {Select} from 'antd'
const {Option} = Select

const ProductForm = ({product, handleChange, handleSubmit, setProduct}) => {
	return(
		<form onSubmit={handleSubmit}>
			<div className='form-group'>
				<label htmlFor='title'>Title</label>
				<input 
					id='title'
					name='title'
					type='text'
					value={product.title}
					onChange={handleChange}
					className='form-control mb-3'
				/>
			</div>
			<div className='form-group'>
				<label htmlFor='description'>Description</label>
				<textarea
					id='description'
					name='description'
					value={product.description}
					onChange={handleChange}
					className='form-control mb-3'
				/>
			</div>
			<div className="row mb-3">
				<div className='col-sm-6'>
					<div className='form-group'>
						<label htmlFor='parent'>Parent category</label>
						<select 
							id='parent'
							name='category'
							value={product.category}
							onChange={handleChange}
							className='form-control'
						>
							<option value=''>Please select one</option>
							{product.categories.map((category) => (
								<option key={category._id} value={category._id}>{category.name}</option>
							))}
						</select>
					</div>
				</div>
				{product.category&&product.subsOptions.length !== 0 &&(<div className='col-sm-6'>
									<div className='form-group'>
										<label htmlFor='subs'>Sub category</label>
										<Select 
											id='subsOptions' 
											value={product.subs}
											onChange={(value) => setProduct((prevProduct) => ({
												...prevProduct,
												subs: value
											}))}
											mode='multiple'
											style={{width: '100%'}}
										>
											{product.subsOptions.map((sub) => (
													<Option value={sub._id} key={sub._id}>{sub.name}</Option>
											))}
										</Select>
									</div>
								</div>)}
			</div>
			<div className="row mb-3">
				<div className='col-sm-6'>
					<div className='form-group'>
						<label htmlFor='price'>Price</label>
						<input 
							id='price'
							type='number'
							name='price'
							value={product.price}
							onChange={handleChange}
							className='form-control'
						/>
					</div>
				</div>
				<div className='col-sm-6'>
					<div className='form-group'>
						<label htmlFor='quantity'>Quantity</label>
						<input 
							id='quantity'
							type='number'
							name='quantity'
							value={product.quantity}
							onChange={handleChange}
							className='form-control'
						/>
					</div>
				</div>
			</div>
			<div className="row mb-3">
				<div className='col-sm-4'>
					<div className='form-group'>
						<label htmlFor='shipping'>Shipping</label>
						<select 
							id='shipping'
							onChange={handleChange}
							name='shipping' 
							value={product.shipping}
							className='form-control mb-3'
						>
							<option value=''>Please select one</option>
							<option value="Yes">Yes</option>
							<option value="No">No</option>					
						</select>
					</div>
				</div>
				<div className='col-sm-4'>
					<div className='from-group'>
						<label htmlFor='brand'>Brand</label>
						<select 
							id='brand'
							onChange={handleChange}
							name='brand' 
							value={product.brand}
							className='form-control mb-3'
						>
							<option value=''>Please select one</option>
							{product.brands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}				
						</select>
					</div>
				</div>
				<div className='col-sm-4'>
					<div className='from-group'>
						<label htmlFor='color'>Color</label>
						<select 
							id='color'
							onChange={handleChange} 
							name='color'
							value={product.color}
							className='form-control'
						>
							<option value=''>Please select one</option>
							{product.colors.map((color) => <option key={color} value={color}>{color}</option>)}				
						</select>
					</div>
				</div>
			</div>
			
			<button className='btn btn-outline-info'>Create</button>
		</form>
	)
}


export default ProductForm