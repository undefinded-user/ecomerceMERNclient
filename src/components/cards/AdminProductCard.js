import React, {useState} from 'react'

import {Link} from 'react-router-dom'

import defaultImg from '../../images/4-devices-2.png'

import {Card, Popover} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
const { Meta } = Card




const AdminProductCard = ({product, handleRemove}) => {
	const [visibleDelete, setVisibleDelete] = useState(false)
	const [visibleEdit, setVisibleEdit] = useState(false)
	const {title, description, images, slug} = product
	const popoverDeleteContent = () => {
		return(
			<div className='row'>
				<div className='col text-center'>
					<a className='text-danger' onClick={()=>handleRemove(slug)}>Yes</a>
				</div>
				<div className='col text-center'>
					<a className='text-primary' onClick={()=>setVisibleDelete(false)}>Cancel</a>
				</div>
			</div>
		)
	}

	const popoverEditContent = () => {
		return(
			<div className='row'>
				<div className='col text-center'>
					<Link to={`/admin/product/${slug}`} className='text-danger'>Yes</Link>
				</div>
				<div className='col text-center'>
					<a className='text-primary' onClick={()=>setVisibleEdit(false)}>Cancel</a>
				</div>
			</div>
		)
	}

	return (
		 <Card
		    cover={
		      <img
		      	style={{ height: '150px', objectFit: 'cover' }}
		      	className='p-1'
		        alt="Sample of this product"
		        src={images.length? images[0].url : defaultImg}
		      />
		    }
		    actions={[
		    	<Popover
			      	placement='top'
			      	content={popoverEditContent()}
			      	title={`Edit "${title}"`}
			      	trigger='click'
			      	visible={visibleEdit}
			      	onVisibleChange={(visible)=>setVisibleEdit(visible)}   	 
		    	>
	    			<EditOutlined className='text-warning'/>
		    	</Popover>
				,
		    	<Popover
			      	placement='top'
			      	content={popoverDeleteContent()}
			      	title={`Delete "${title}"`}
			      	trigger='click'
			      	visible={visibleDelete}
			      	onVisibleChange={(visible)=>setVisibleDelete(visible)}   	 
		    	>
		      		<DeleteOutlined className='text-danger' />
		    	</Popover>
		    ]}
		  >
		    <Meta
		      title={title}
		      description={`${description&&description.substring(0, 40)}...`}
		    />
		  </Card>
	)
}

export default AdminProductCard