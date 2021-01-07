import React from 'react'
import {Link} from 'react-router-dom'

import {EyeOutlined, ShoppingCartOutlined} from '@ant-design/icons'

import defaultImg from '../../images/4-devices-2.png'

import {Card} from 'antd'
const {Meta} = Card

const ProductCard = ({product}) => {
	const {title, description, images} = product
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
		    		<Link to='/product/slug'>
	    				<EyeOutlined className='text-warning'/><br/> View product
	    			</Link>,
		      		<>
		      			<ShoppingCartOutlined className='text-danger' /><br/>Add to card
		      		</>
		    ]}
		  >
		  	<Meta
		      title={title}
		      description={`${description&&description.substring(0, 40)}...`}
		    />
		</Card>
	)
}

export default ProductCard