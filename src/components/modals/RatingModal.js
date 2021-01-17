import React, {useState} from 'react'

import {useSelector} from 'react-redux'
import {useHistory, useParams} from 'react-router-dom'

import {toast} from 'react-toastify'

import {Modal} from 'antd'
import {StarOutlined} from '@ant-design/icons'

const RatingModal = ({children}) => {
	const {slug} = useParams()
	const history = useHistory()
	const user = useSelector((state) => state.user)
	const [modalVisible, setModalVisible] = useState(false)
	const handleModal = () => {
		if(user&&user.token){
			setModalVisible(true)
		} else {
			history.push({
				pathname: '/login',
				state: {
					from: `/product/${slug}`
				}
			})
		}
	}
	return(
		<>
			<div onClick={handleModal}>
				<StarOutlined className='text-danger' /> <br />
				{user? 'Leave rating' : 'Login to leave rating'}
			</div>
			<Modal
				title='Leave your rating'
				centered
				visible={modalVisible}
				onOk={()=>{
					setModalVisible(false)
					toast.success('Thanks for your review. It will appear soon')
				}}
				onCancel={() => setModalVisible(false)}
			>
				{children}
			</Modal>
		</>
	)
}

export default RatingModal