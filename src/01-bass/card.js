import {Button, Col, DatePicker, Drawer, Form, Input, message, Pagination, Popconfirm, Row, Table} from 'antd';
import {PlusOutlined, SearchOutlined, UndoOutlined} from '@ant-design/icons';
import React from "react";
import request from "./request";
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import {getCookie} from "./cookies";

class Card extends React.Component {
    constructor(props){
        super(props);
        this.state={
            items: [],
            name:'',
            select_name:'',
            time1: ['', ''] ,
            time: ['', ''] ,
            rentable_before:'',
            rentable_after:'',
            visible: false,
            is_create: false,
            card_id: null,
            current_page: 1,
            page_size: 20,
            total: 0,
            is_admin:''
        }
    }

    setName(e){
        this.setState({
            name: e.target.value
        })
    }
    setSelectName(e){
        this.setState({
            select_name: e.target.value
        })
    }
    setCost(e){
        this.setState({
            cost: e.target.value
        })
    }
    setTime(e){
        this.setState({
            time:e.target.value
        })
    }
    //重置
    reset(e) {
        this.setState({
            select_name:'',
            rentable_before:'',
            rentable_after:''
        })
    };

    showDrawer = () => {
        this.setState({
            visible: true
        })
        this.setState({
            is_create: true
        })
    };

    onClose = () => {
        this.setState({
            visible: false
        })
    };



    onChange = (dates, dateStrings) => {
        this.setState({
            time:dateStrings,
        })
    }
    onChange1 = (dates, dateStrings) => {
        this.setState({
            time1:dateStrings,
        })
    }
    checkUserName(e){
        if(this.state.cost>0){
            this.setState({
                status:'error'
            })
            return false;
        }
    }
    checkCost(){
        if(!Number(this.state.cost)&&Number(this.state.cost)!==0){
            this.setState({
                status:'error'
            })
            return false;
        }
        else{
            if(Number(this.state.cost)>0){
                this.setState({
                    status:''
                })
                return true;
            }
            else{
                this.setState({
                    status:'error'
                })
                return false;
            }
        }

    }
    //添加车辆
    create = (e) => {
        const data = this.getData()
        if (data === null){
            return
        }
        request.post('/api/card/', data)
            .then(response => {
                if (response['message'] === "ok") {
                    message.success('添加成功');
                } else {
                    message.success(response['message']);
                }
            })
            .catch((response) => {
                message.warning(response);
                return false;
            });
    }
    //搜索
    Select = (e, page, page_size) => {
        if (!page){
            page = this.state.current_page
        }
        if (!page_size){
            page_size = this.state.page_size
        }
        request.get('/api/card/', {
            name: this.state.select_name,
            rentable_after: this.state.time1[0],
            rentable_before: this.state.time1[1],
            page_size: page_size,
            current_page: page,
        }).then(response => {
            this.setState({
                items: response.data.card,
                total: response.data.count
            })
            return response.data;
        }).catch(error => {
        })
    }
    //删除
    Delete(record){
        request.delete('/api/card/'+record['id'], {
        }).then(response => {
            this.Select()
        }).catch(error => {
        })
    }

    getData() {
        if(!this.checkCost()){
            message.warning('租金必须为正数');
            return null
        }

        return {
            name:this.state.name,
            cost:this.state.cost,
            rentable_after: this.state.time[0],
            rentable_before: this.state.time[1]
        }
    }
    DrawerUpdateButton(record){
        this.setState({
            card_id: record['id'],
            visible: true,
            is_create: false
        })
    }
    //修改车辆信息
    update = (e) => {
        const data = this.getData();
        if (data === null){
            return
        }

        request.put('/api/card/' + this.state.card_id,this.getData())
            .then(response => {
                if (response['message'] === "ok") {
                    message.success('修改成功');
                    this.Select()
                } else {
                    message.success(response['message']);
                }
            })
            .catch((response) => {
                message.warning(response);
                return false;
            });
    }
    //租用车辆
    rentCard(record){
        request.post('/api/rent/'+record['id'], {
        }).then(response => {
            this.Select()
        }).catch(error => {
        })
    }

    DrawerButton (){
        if (this.state.is_create){
            return (
                <Button type="primary" onClick={this.create}>添加车辆</Button>
            )
        } else {
            return (
                <Button type="primary" onClick={this.update}>修改车辆</Button>
            )
        }
    }
    ActionButton(record){
        if(getCookie('is_admin')=='true'){
            return(
                <div>
                    <Button onClick={() => this.DrawerUpdateButton(record)}>修改</Button>
                    <Popconfirm title="是否删除该车辆?" onConfirm={() => this.Delete(record)} okText="是" cancelText="否">
                        <Button>删除</Button>
                    </Popconfirm>
                </div>
            )
        }else {
            return (
                <Popconfirm title="是否租用该车辆?" onConfirm={() => this.rentCard(record)} okText="是" cancelText="否">
                    <Button>租用</Button>
                </Popconfirm>

            )
        }
    }

    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '车辆名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '价格/天',
                dataIndex: 'cost',
                key: 'cost',
            },
            {
                title: '开始日期',
                dataIndex: 'rentable_after',
                key: 'rentable_after',
            },
            {
                title: '结束日期',
                dataIndex: 'rentable_before',
                key: 'rentable_before',
            },
            {
                title: '操作',
                dataIndex: 'action',
                key:'action',
                render:(_, record) => (
            <div>
                {this.ActionButton(record)}
            </div>

        )
            }

        ];


        return (
            <div style={{
                padding: '20px',
            }}>
                <Form >
                    <Row gutter={16}>
                        <Col className="gutter-row" span={6}>
                            <Form.Item label="车辆名称">
                                <Input placeholder="请输入内容"
                                       value={this.state.select_name}
                                       onChange={this.setSelectName.bind(this)}/>
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <Form.Item label="日期">
                                <DatePicker.RangePicker
                                    locale={locale}
                                    onChange={this.onChange1}
                                />

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

                <Button onClick={this.showDrawer} icon={<PlusOutlined />}>添加车辆</Button>

                <Drawer title="车辆信息" placement="right" onClose={this.onClose} visible={this.state.visible}>
                    <form>
                        <Form.Item label="车辆名称">
                            <Input placeholder="请输入内容"
                                   ref='name'
                                   onChange={this.setName.bind(this)}/>
                        </Form.Item>
                        <Form.Item label="租金">
                            <Input placeholder="请输入内容"
                                   ref='cost'
                                   status={this.state.status}
                                   onChange={this.setCost.bind(this)}/>
                        </Form.Item>
                        <Form.Item label="日期">
                            <DatePicker.RangePicker
                                locale={locale}
                                ref='time'
                                onChange={this.onChange}
                            />

                        </Form.Item>
                        {this.DrawerButton()}
                        {/*<Button type="primary" onClick={this.update}>确定</Button>*/}
                    </form>
                </Drawer>
                <br/>

                <Table columns={columns}
                       dataSource={this.state.items}
                       rowKey={(record) => record.id}
                       pagination={{
                           defaultCurrent:this.state.current_page,
                           defaultPageSize:this.state.page_size,
                           total: this.state.total,
                           showTotal: (total) => `Total ${total} items`,
                           onChange: (page, page_size) => {
                               this.setState({
                                   current_page: page,
                                   page_size: page_size,
                               })
                               this.Select(null, page, page_size)
                           },
                           showSizeChanger: true,
                       }}
                />;
            </div>
        );
    };
}

export default Card
