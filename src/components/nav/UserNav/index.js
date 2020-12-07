import React from 'react'
import { Link } from 'react-router-dom'

const UserNav = () => {
	return (
		<nav>
			<ul className='nav flex-column'>
				<li className='nav-item'>
					<Link to='/user/history'>History</Link>
				</li>

				<li className='nav-item'>
					<Link to='/user/password'>Change password</Link>
				</li>

				<li className='nav-item'>
					<Link to='/user/wishlist'>Wish list</Link>
				</li>
			</ul>
		</nav>
	)
}

export default UserNav