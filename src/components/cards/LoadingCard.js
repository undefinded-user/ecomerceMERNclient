import React from 'react'

import {Card, Skeleton} from 'antd'

const LoadingCard = ({count}) => {
	const generateContent = () => {
		const content = []
		for(let i = 0; i<count; i++){
			content.push(
				<div className='col-md-4 p-1' key={i}>
					<Card>
						<Skeleton active></Skeleton>
					</Card >
				</div>
			)
		}
		return content
	}

	

	return (
		<>
			{generateContent()}
		</>		
	)
}

export default LoadingCard