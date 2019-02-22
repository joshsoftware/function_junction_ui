import React from 'react';
import { Menu, Layout, Icon } from 'antd';
import MENU from './Constants';
import './Sidebar.css';

const MenuItem = (handleMenuChange) =>(
    <Menu theme="dark" mode="inline" defaultSelectedKeys={[`${window.location.pathname}`]}>
    {MENU.map(({name, icon, path}) => (
        <Menu.Item key={path} onClick={() => handleMenuChange(path)}>
            <Icon type={icon}/>
            <span>{name}</span>
        </Menu.Item>)
    )}
    </Menu>
);

const Sidebar = ({open, handleMenuChange}) => (
    <Layout.Sider
        trigger={null}
        collapsible
        collapsed={open}
    >
        <div className="logo" />
        {MenuItem(handleMenuChange)}
    </Layout.Sider>
)

export default Sidebar;