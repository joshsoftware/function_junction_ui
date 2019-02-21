import React, { Component } from 'react'
import { Layout, Icon } from 'antd';
import Sidebar from '../sidebar/Sidebar';
const { Header, Content } = Layout;

class AppLayout extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  getSideBarMenu = (collapsed) => <Sidebar open={collapsed}/>

  render() {
    const { collapsed } = this.state;
    return (
      <Layout>
        {this.getSideBarMenu(collapsed)}
        <Layout>
          <Header style={{ background: '#fff', padding: 0, textAlign: 'start' }}>
            <Icon
              className="trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
              style={{ paddingLeft: '2%'}}
            />
          </Header>
          <Content style={{
            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
          }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default AppLayout;