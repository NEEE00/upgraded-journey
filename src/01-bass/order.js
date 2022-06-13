import React from "react";
import {DatePicker, Drawer, Form, Input, Table} from "antd";
import {getCookie} from "./cookies";
import request from "./request";

class Order extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            name: '',
            select_name: '',
            time1: ['', ''],
            time: ['', ''],
            rentable_before: '',
            rentable_after: '',
            visible: false,
            user_id:null,
            card_id: null,
            current_page: 1,
            page_size: 20,
            total: 0,
            is_admin: ''
        }
    }
    render() {
        const columns = [
            {
                title: 'ident',
                dataIndex: 'ident',
                key: 'ident',
            },
            {
                title: '车辆id',
                dataIndex: 'card_id',
                key: 'card_id',
            },
            {
                title: '用户id',
                dataIndex: 'user_id',
                key: 'user_id',
            },
            {
                title: '价格',
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
            }

        ];
        this.Select = (e, page, page_size) => {
            if (!page){
                page = this.state.current_page
            }
            if (!page_size){
                page_size = this.state.page_size
            }
            request.get('/api/rent/', {
                ident:this.state.ident,

            }).then(response => {
                this.setState({
                    items: response.data.rent,
                    total: response.data.count
                })
                return response.data;
            }).catch(error => {
            })
        }
        //加入页面直接触发搜索功能，显示所有订单信息
        this.Select()
        return(
            <Table columns={columns}
                   dataSource={this.state.items}
                   rowKey={(record) => record.id}
                   pagination={{
                       defaultCurrent:this.state.current_page,
                       defaultPageSize:this.state.page_size,
                       total: this.state.total,
                       // hideOnSinglePage: false,
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
            />
        );
    }
}

export default Order
