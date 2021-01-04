import React from 'react'

import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
const { Meta } = Card


const AdminProductCard = ({product}) => {
	const {title, description, images} = product
	return (
		 <Card
		    cover={
		      <img
		      	style={{ height: '150px', objectFit: 'cover' }}
		      	className='p-1'
		        alt="Sample of this product"
		        src={images.length? images[0].url : ''}
		      />
		    }
		    // actions={[
		    //   <SettingOutlined key="setting" />,
		    //   <EditOutlined key="edit" />,
		    //   <EllipsisOutlined key="ellipsis" />,
		    // ]}
		  >
		    <Meta
		      title={title}
		      description={description}
		    />
		  </Card>
	)
}

export default AdminProductCard