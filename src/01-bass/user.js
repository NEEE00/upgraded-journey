import React from 'react';
import {Button, Col, Form, Input, Row, Space, Table, Tag} from 'antd';
import {SearchOutlined, UndoOutlined} from '@ant-design/icons';
import request from "./request";

const style = {
    background: '#0092ff',
    padding: '8px 0',
};

const columns = [
//     id: 1
// is_admin: 1
// license_id: null
// name: "管理员"
// password: "admin"
// phone: null
// username: "admin"


    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: '是否管理员',
        dataIndex: 'is_admin',
        key: 'is_admin',
        render: (is_admin) => <font>{ is_admin ? '是' : '否' }</font>,
    },
    {
        title: '驾照',
        dataIndex: 'license_id',
        key: 'license_id',
    },
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '电话号码',
        dataIndex: 'phone',
        key: 'phone',
    },

];

class User extends React.Component {

    constructor(props){
        super(props);
        this.state={
            items: [],
            username: '',
            phone:'',
            license_id:''
        }
    }

    setUsername(e){
        this.setState({
            username: e.target.value
        })
    }
    setPhone(e){
        this.setState({
            phone: e.target.value
        })
    }
    setLicense_id(e){
        this.setState({
            license_id: e.target.value
        })
    }

    reset(e) {
        this.setState({
            username: '',
            phone:'',
            license_id:''
        })
        console.log(this.state)
    };

    Select = (e) => {
        request.get('/api/user/', {
            username: this.state.username,
            license_id: this.state.license_id,
            phone: this.state.phone,
        }).then(response => {
            this.setState({
                items: response.data.user
            })
            console.log(this.state)
            return response.data;
        })
    }

    render() {
        return (
            <div style={{
                padding: '20px',
            }}>
                <Form

                >
                    <Row gutter={16}>
                        <Col className="gutter-row" span={6}>
                            <Form.Item label="用户名">
                                <Input placeholder="请输入内容"
                                       value={this.state.username}
                                       onChange={this.setUsername.bind(this)}/>
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <Form.Item label="手机号码">
                                <Input placeholder="请输入内容"
                                        value={this.state.phone}
                                        onChange={this.setPhone.bind(this)}/>
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <Form.Item label="驾照号码">
                                <Input placeholder="请输入内容"
                                        value={this.state.license_id}
                                        onChange={this.setLicense_id.bind(this)}/>
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={1.5}>
                            <Button icon={<SearchOutlined/>} onClick={this.Select}>搜索</Button>
                        </Col>
                        <Col className="gutter-row" span={2}>
                            <Button icon={<UndoOutlined/>} onClick={this.reset.bind(this)}>重置</Button>
                        </Col>
                    </Row>
                </Form>
                <Table columns={columns} dataSource={this.state.items}/>;
            </div>
        );
    };

}

export default User
