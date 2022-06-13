import React from "react";
import {Button, Col, Divider, Layout, Menu, Row} from 'antd';
import {EditOutlined, FileOutlined, PoweroffOutlined, UserOutlined} from '@ant-design/icons';
import {Outlet} from "react-router";
import {getCookie} from './cookies'
import request from "./request";

const {Header, Content, Footer, Sider,} = Layout;


function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('用户管理', '/user', <UserOutlined/>),
    getItem('车辆管理', '/card', <EditOutlined/>),
    getItem('订单管理', '/order', <FileOutlined/>),

];

class Base extends React.Component {

    onSelect = (item, key, keyPath, selectedKeys, domEvent) => {
        window.location = item['key'];
    }

    logout = () => {
        request.get('/api/auth/logout')
        console.log('我退出啦')
        //回到登录页面
        window.location.pathname = '/login'
    }

    render() {

        return (
            <Layout
                style={{
                    minHeight: '100vh',
                }}
            >
                <Sider collapsible>
                    <div className="logo"/>
                    <Menu theme="dark" mode="inline" items={items} onSelect={this.onSelect}/>
                </Sider>

                <Layout className="site-layout">
                    <Header
                        className="site-layout-background"
                        style={{
                            padding: 0,
                        }}
                    >
                        <Row>
                            <Col flex={36}>
                            </Col>
                            <Col flex={1}>
                                <font color="FFFFFF">{getCookie('name')}</font>
                                <Divider type="vertical" style={{borderLeft: '1px solid #FFFFFF'}}/>
                                <a onClick={this.logout}>
                                    <font color="FFFFFF" >退出</font>
                                </a>
                            </Col>
                        </Row>
                    </Header>
                    <Content
                        style={{
                            margin: '0 16px',
                        }}
                    >

                        <Outlet/>
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        Ant Design ©2018 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Base;
