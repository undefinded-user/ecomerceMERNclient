import React, {useEffect} from 'react'

import {Link} from 'react-router-dom'

import ProductItemsList from './ProductItemsList'
import RatingModal from '../modals/RatingModal'

import StarRating from 'react-star-ratings'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import {Carousel} from 'react-responsive-carousel'

import DefaultImage from '../../images/4-devices-2.png'

import {HeartOutlined, ShoppingCartOutlined} from '@ant-design/icons'
import {Card, Tabs} from 'antd'
const {TabPane} = Tabs

const SingleProduct = ({product}) => {
	const {title,images, description, _id} = product

	return (
		<>
			<div className='col-md-7'>
				{images&&images.length? 
					(<Carousel showArrows={true} autoPlay infiniteLoop>
						{images.map((image)=><img src={image.url} key={image.public_id} />)}
					</Carousel>)
					:
					(<Card
						cover={
					      <img
					      	className='p-1 card-image'
					        src={DefaultImage}
					   		/>
						}
					></Card>)
				}
				<Tabs className='mt-2' type='card'>
					<TabPane className='pl-3 pr-3' tab='Description' key='1'>
						{description&&description}
					</TabPane>
					<TabPane className='pl-3 pr-3' tab='More' id='2'>
						Some additional information
					</TabPane>
				</Tabs>
			</div>
			<div className='col-md-5'>
				

				<h1 className='bg-info p-3 text-center'>{title}</h1>

				<Card
					actions={[
						<>
							<ShoppingCartOutlined className='text-success' />
							<br/>
							Add to Cart
						</>,
						<Link to=''>
							<HeartOutlined  className='text-info' />
							<br/>
							Add to Wishist
						</Link>,
						<RatingModal>	
							<StarRating
								name={_id}
								numberOfStars={5}
								rating={3}
								changeRating={(newRating, name) => console.log('RATING', newRating, 'NAME', name)}
								isSelectable={false}
								starRatedColor='red'
						 	/>
						</RatingModal>
					]}
				>
					<ProductItemsList product={product} />
				</Card>
			</div>
		</>
	)
}

export default SingleProduct 