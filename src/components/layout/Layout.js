import React, { Component } from 'react'
import { Layout, Select, Icon } from 'antd';
import { withRouter, NavLink } from 'react-router-dom'
import routes from '../../config/routes';
import Sidebar from '../sidebar/Sidebar';
import MainContent from '../mainContent/MainContent';
import Logo from '../../josh-logo.svg';
import './Layout.css';
const { Header, Content } = Layout;
const {Option} = Select;

class AppLayout extends Component {
  state = {
  };

  handleMenuChange = (path) => {
    const { history } = this.props;
    history.push(path);
  }


  getSideBarMenu = (collapsed) => <Sidebar open={collapsed} handleMenuChange={this.handleMenuChange}/>

  getHeaderContent = () => <div className='navbar'>
    <NavLink className='logoWrapper' to={routes.allEvents}>
      <img className='logo' src={Logo} alt='Logo'/>
    </NavLink>
    <Select
        placeholder='Filter Events'
        filterOption
        // onSearch={this.handleSearch}
        // onChange={this.handleChange}
        style={{ width: 200, marginRight: '10px' }}
        suffixIcon={<Icon type="filter" />}
      >
      </Select>
    <Select
        showSearch
        value={this.state.value}
        placeholder='Search Event'
        defaultActiveFirstOption={false}
        showArrow
        filterOption={false}
        // onSearch={this.handleSearch}
        // onChange={this.handleChange}
        // notFoundContent={null}
        style={{ width: 200, marginRight: '10px' }}
        suffixIcon={<Icon type="search" />}
      >
      </Select>
    <NavLink
      to={routes.createEvent}
      style={{ textDecoration: 'none' }}
    >
      <span className='create-link'>Create</span>
    </NavLink>
  </div>

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
            }}
          >
            {this.getHeaderContent()}
          </Header>
          <Content style={{
            margin: '90px 16px', padding: 24, background: '#fff', minHeight: 600,
          }}>
            <MainContent />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(AppLayout);