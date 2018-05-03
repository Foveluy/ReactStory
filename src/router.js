import React from 'react'
import './index.css'

import { HashRouter as Router, Route } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import Config from './reactstory.config'
const { Header, Content, Footer, Sider } = Layout

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

const Border = '1px solid rgb(232, 232, 232)'
const SiderWidth = 320

export default class App extends React.Component {
  render() {
    return (
      <Layout>
        <Header
          style={{
            background: '#fff',
            width: '100%',
            top: 0,
            position: 'fixed',
            borderBottom: Border,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div className="logo" />
          <Menu onClick={this.handleClick} selectedKeys={['0']} style={{ borderBottom: '0' }} mode="horizontal">
            {Config.navigation.map((navi, index) => {
              if (navi.dropDown) {
                return (
                  <SubMenu key={index} title={<span>{navi.title}</span>}>
                    {navi.dropDown.map(drop => <Menu.Item key={drop.title}>{drop.title}</Menu.Item>)}
                  </SubMenu>
                )
              }
              return <Menu.Item key={index}>{navi.title}</Menu.Item>
            })}
          </Menu>
        </Header>
        <Sider
          style={{
            height: '100vh',
            position: 'fixed',
            left: 0,
            background: 'white',
            borderRight: Border,
            marginTop: 64
          }}
          width={SiderWidth}
        >
          <Menu theme="light" mode="inline" style={{ width: SiderWidth }} defaultSelectedKeys={['4']}>
            {Config.sider.map((item, index) => {
              const type = item.type
              if (type === 'md') {
                return (
                  <SubMenu key={index} title={<span>{item.name}</span>}>
                    {item.title.map((t, idx) => <Menu.Item key={index + '' + idx}>{t}</Menu.Item>)}
                  </SubMenu>
                )
              } else if (type === 'dir') {
              }
            })}
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 320, marginTop: 64 }}>
          <Content style={{ overflow: 'initial' }}>
            <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
              ...
              <br />
              Really
              <br />...<br />...<br />...<br />
              long
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />
              content
            </div>
          </Content>
          <Footer style={{ textAlign: 'center', background: '#fff' }}>Ant Design ©2016 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
  }
}
