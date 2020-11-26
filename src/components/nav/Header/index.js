import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

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
  const state = useSelector((state) => state)

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
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to='/register' >
            Register
          </Link>
        </Item>
        <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link to='/login'>
            Login
          </Link>
        </Item>
        <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Register">
            <Item key="setting:1">Option 1</Item>
            <Item key="setting:2">Option 2</Item>
            <Item icon={<LogoutOutlined />}
                  key="logout"
                  onClick={logout}>Logout</Item>
        </SubMenu>
      </Menu>

    );
}

export default Header