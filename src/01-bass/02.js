
import React from "react";
import {Layout, Menu, Row, Col, Button, Divider} from 'antd';
import {UserOutlined, FileOutlined, EditOutlined,PoweroffOutlined} from '@ant-design/icons';


const { Header, Content, Footer, Sider ,} = Layout;


function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('用户管理', '/user', <UserOutlined />),
    getItem('车辆管理', '/card', <EditOutlined />),
    getItem('订单管理', '/order', <FileOutlined />),

];

class App02 extends React.Component {

    onSelect = (item, key, keyPath, selectedKeys, domEvent) => {
        window.location = item['key'];
    }

    logout = () => {
        console.log('我退出啦')
    }

    render() {

        return (
            <Layout
                style={{
                    minHeight: '100vh',
                }}
            >
                <Sider collapsible   >
                    <div className="logo" />
                    <Menu theme="dark"  mode="inline" items={items} onSelect={this.onSelect} />
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
                                <font color="FFFFFF" >用户名</font>
                                <Divider type="vertical" style={{ borderLeft: '1px solid #FFFFFF' }}/>

                                <font color="FFFFFF" onClick={ this.logout }>退出</font>
                                {/*<font color="FFFFFF">密码</font>*/}
                                <Button
                                    type="text"

                                    icon={<PoweroffOutlined />}

                                    //onClick={() => enterLoading(2)}
                                >
                                    退出
                                </Button>
                            </Col>
                        </Row>
                    </Header>
                    <Content
                        style={{
                            margin: '0 16px',
                        }}
                    >
                        {/*<Breadcrumb
                            style={{
                                margin: '16px 0',
                            }}
                        >
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>*/}
                        <div
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                minHeight: 360,
                            }}
                        >
                            Bill is a cat.
                        </div>
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

export default App02;
