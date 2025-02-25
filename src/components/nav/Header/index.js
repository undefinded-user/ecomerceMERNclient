import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { auth } from '../../../firebase.js'
import { Menu } from 'antd';
import {
  WindowsOutlined,
  UserAddOutlined, 
  UserOutlined, 
  SettingOutlined,
  LogoutOutlined  
} from '@ant-design/icons';


const { SubMenu, Item } = Menu


const Header = () => {
	const [current, setCurrent] = useState('');

  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

	const handleClick = (e) => {
    const { key } = e
    setCurrent(key)
	}

  const logout = () => {
    auth.signOut()
    dispatch({
      type: 'LOGOUT',
      payload: null
    })
    history.push('/login')
  }

	return (

      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Item key="home" icon={<WindowsOutlined />}>
          <Link to='/'>
            Home
          </Link>
        </Item>
         <Item key="admin" icon={<WindowsOutlined />}>
          <Link to='/admin/dashboard'>
            admin
          </Link>
        </Item>
        {!user&&
                <Item key="register" icon={<UserAddOutlined />} className="float-right">
                  <Link to='/register' >
                    Register
                  </Link>
                </Item>
        }
        {!user&&
                <Item key="login" icon={<UserOutlined />} className="float-right">
                  <Link to='/login'>
                    Login
                  </Link>
                </Item>
        }
        {user&&
                <SubMenu 
                  key="SubMenu" 
                  icon={<SettingOutlined />} 
                  title={user.email&&user.email.split('@')[0]}
                  className='float-right'
                >
                    {user.role === 'subscriber'&&(
                    <Item key="dashboard">
                      <Link to="/user/history">Dashboard</Link>
                    </Item>
                    )}
                    {user.role === 'admin'&&(
                    <Item key="dashboard">
                      <Link to="/admin/dashboard">Dashboard</Link>
                    </Item>
                    )}
                    <Item icon={<LogoutOutlined />}
                          key="logout"
                          onClick={logout}>Logout</Item>
                </SubMenu>
        }
      </Menu>

    );
}

export default Header