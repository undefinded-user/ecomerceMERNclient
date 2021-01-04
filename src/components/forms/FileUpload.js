import React from 'react'
import {useSelector} from 'react-redux'

import Resizer from 'react-image-file-resizer'
import axios from 'axios'

import {Avatar, Badge} from 'antd'


const FileUpload = ({product, setProduct, setIsLoading}) => {
	const user = useSelector((state) => state.user)
	let allUploadedFiles = product.images

	const fileUploadAndResize = (e) => {
		let files = e.target.files
		if(files){
			setIsLoading(true)
			for(let i=0; i<files.length; i++){
				Resizer.imageFileResizer(files[i], 720, 720, 'JPEG', 100, 0, (uri) => {
					let res = axios.post(`${process.env.REACT_APP_API}/uploadimages`, {image:uri}, {
						headers: {
							authtoken: user&&user.token
						}
					})
					.then((res) => {
						setIsLoading(false)
						allUploadedFiles.push(res.data)
						setProduct((prevProduct) =>({
							...prevProduct,
							images: allUploadedFiles
						}))
					})
					.catch((error) =>{
						setIsLoading(false)
						console.log(error.response)
					})
				}, 'base64')
			}
		}

	}
	const handleImageRemove = async (public_id) => {
		try{
			setIsLoading(true)
			const res = await axios.post(`${process.env.REACT_APP_API}/removeimage`, {public_id}, {
				headers: {
					authtoken: user&&user.token
				}
			})
			setIsLoading(false)
			const currentImages = allUploadedFiles.filter((image) => image.public_id !== public_id)
			setProduct((prevProduct) =>({
				...prevProduct, 
				images: currentImages
			}))
			console.log(res)
		} catch(error) {
			setIsLoading(false)
			console.log(error.response.data)
		}
		

	} 
	return(
		<>
			<div className='row'>
				{product.images&&product.images.map((image) =>(
					<Badge 
						count='X' 
						key={image.public_id}
						style={{cursor: 'pointer'}}
						onClick={() => handleImageRemove(image.public_id)}
						>
						<Avatar  
						src={image.url} 
						size={100} 
						className='ml-3' 
						shape='square'
						/>
					</Badge>
				))}
			</div>
			<div className='row'>
				<label className='btn btn-primary'>
					Choose file
					<input 
						type='file'
						multiple
						// accept='images/*'
						hidden
						onChange={fileUploadAndResize}
					/>
				</label>
			</div>  
		</>
		
	)
}

export default FileUpload