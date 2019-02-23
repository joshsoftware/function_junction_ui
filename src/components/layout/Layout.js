import React, { Component } from 'react'
import { Layout } from 'antd';
import { withRouter, NavLink } from 'react-router-dom'
import Sidebar from '../sidebar/Sidebar';
import MainContent from '../mainContent/MainContent';
import Logo from '../../josh-logo.svg';
import './Layout.css';
const { Header, Content } = Layout;

class AppLayout extends Component {
  state = {
  };

  handleMenuChange = (path) => {
    const { history } = this.props;
    history.push(path);
  }


  getSideBarMenu = (collapsed) => <Sidebar open={collapsed} handleMenuChange={this.handleMenuChange}/>

  render() {
    return (
      <Layout>
        <Layout>
          <Header
            style={{
              position: 'fixed',
              zIndex: 1,
              width: '100%',
              background: '#fff',
              textAlign: 'start'
            }}
          >
            <NavLink to='/'>
              <img className='logo' src={Logo} alt='Logo'/>
            </NavLink>
          </Header>
          <Content style={{
            margin: '75px 16px', padding: 24, background: '#fff', minHeight: 600,
          }}>
            <MainContent />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(AppLayout);