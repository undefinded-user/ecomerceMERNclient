import React, {useState} from 'react'

import defaultImg from '../../images/4-devices-2.png'

import {Card, Popover} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
const { Meta } = Card




const AdminProductCard = ({product, handleRemove}) => {
	const [visible, setVisible] = useState(false)
	const {title, description, images, slug} = product
	const popupContent = () => {
		return(
			<div className='row'>
				<div className='col text-center'>
					<a className='text-danger' onClick={()=>handleRemove(slug)}>Yes</a>
				</div>
				<div className='col text-center'>
					<a className='text-primary' onClick={()=>setVisible(false)}>Cancel</a>
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
		      <EditOutlined className='text-warning'/>,
		      <Popover
		      	placement='topRight'
		      	content={popupContent()}
		      	title={`Delete "${title}"`}
		      	trigger='click'
		      	visible={visible}
		      	onVisibleChange={(visible)=>setVisible(visible)}   	 
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