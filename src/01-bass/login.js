/* class Test{
    constructor(){
        this.a=1;
        this.b=2;
    }
    testa(){
        console.log("This is testa!")
    }

    testb(){
        console.log("This is testb!")
    }

}

//继承
class ChildTest extends Test{
    testc(){
        console.log("This is testc!")
    }
}

var obj2=new ChildTest()
obj2.testb()
console.log(obj2.b)

var obj =new ChildTest()
obj.testa()
console.log(obj.a) */

/* import React from "react";
//App组件类必须继承React中的Component类
class App extends React.Component{
    //render函数是固定的，有返回值
    render(){
        //最外层必须由唯一一个标签包括，不能有并列几个标签
        return <section>
            Hello react Component
            <ur>
                <li>111</li>
                <li>222</li>
            </ur>
            <div>可以有多个并列的非最外层标签</div>
            <div>可以有多个并列的非最外层标签</div>
            </section>
        //为使return后面的内容对齐，可以将return的内容用（）括起来
    }
}
//导出
export default App */

import React, {useEffect} from "react";
import '../App.css';
//import Column from "antd/lib/table/Column";
//App组件类必须继承React中的Component类
import {Button, Input, message, Space, Tabs} from 'antd';
import {EyeInvisibleOutlined, EyeTwoTone, IdcardOutlined, KeyOutlined, UserOutlined} from '@ant-design/icons';
import request from "./request";
import {useNavigate} from "react-router";

const {TabPane} = Tabs;



class App extends React.Component {

    constructor(props){
        super(props);
        this.state={
            username: '',
            password:'',
            code:'',
            code_url:'/api/auth/get_code',
            status: '',
        }
    }

    setUsername(e){
        this.setState({
            username: e.target.value
        })
    }
    setName(e){
        this.setState({
            name: e.target.value
        })
    }

    setPassword(e){
        this.setState({
            password: e.target.value
        })
    }

    setPassword2(e){
        this.setState({
            password2: e.target.value
        })
    }
    //两次密码必须一致
    checkPassword(e){
        if (this.state.password === this.state.password2){
            this.setState({
                status: ''
            })
            return true;
        } else {
            this.setState({
                status: 'error'
            })
        }
        return false;
    }

    //用户名和账号不能一致
    checkUserName(e){
        if (this.state.username === this.state.phone){
            this.setState({
                status2: 'error'
            })
            return false;
        } else {
            this.setState({
                status2: ''
            })
        }
        return true;
    }

    setCode(e){

        this.setState({
            code: e.target.value
        })
    }

    setPhone(e){
        this.setState({
            phone:e.target.value
        })
    }

    setLicense(e){

        this.setState({
            license:e.target.value
        })
    }
    //刷新验证码
    setImg(e){
        this.setState({
            code_url : `/api/auth/get_code?num=${Math.ceil(Math.random() * 100)}`
        })
    }

    // Goto = (url) => {
    //     useNavigate()(url)
    // }

    login = (e) => {
        request.post('/api/auth/login', {
            username: this.state.phone,
            password: this.state.password,
            code: this.state.code,
        })
            .then(response => {
                console.log(response)
                if (response['code'] === 200 && response['message'] === "ok") {
                    message.success('登录成功');
                    //登录成功跳转到首页+
                    window.location.pathname = '/'
                } else {
                    message.success(response['message']);
                }
            })
            .catch((response) => {
                message.warning(response);
                return false;
            });

    }


    register = (e) => {
        if (!this.checkPassword(e)){
            message.warning('密码不一致');
            return
        }

        if(!this.checkUserName(e)){
            message.warning('用户名和账号不能一致');
            return
        }

        request.post('/api/auth/register', {
            username: this.state.username,
            phone: this.state.phone,
            password: this.state.password,
            license_id:this.state.license,
            name:this.state.code,
            code: this.state.code,
        })
            .then(response => {
                console.log(response)
                if (response['code'] === 200 && response['message'] === "ok") {
                    message.success('注册成功');
                } else {
                    message.success(response['message']);
                }
            })
            .catch((response) => {
                message.warning(response);
                return false;
            });
    };

    render() {
        return (
            <div className="App" style={{margin: '200px'}}>
                <Tabs type="card" style={{alignItems: 'center', justifyContent: 'center'}}>
                    <TabPane tab="登录" key="1">
                        <Space direction="vertical">
                            <Input placeholder="账号/手机号" ref='phone' onChange={this.setPhone.bind(this)}
                                   prefix={<UserOutlined/>}/>
                            <Input.Password placeholder="密码"  ref='password' onChange={this.setPassword.bind(this)}
                                            prefix={<KeyOutlined/>}
                                            iconRender={visible => (visible ? <EyeTwoTone/> :
                                                <EyeInvisibleOutlined/>)}/>
                            <Input placeholder="验证码" ref='code' onChange={this.setCode.bind(this)}
                                   prefix={<UserOutlined/>}/>
                            <img src={this.state.code_url}  onClick={this.setImg.bind(this)}/>

                                <Button type="primary" onClick={this.login}>登录</Button>

                        </Space>

                    </TabPane>
                    <TabPane tab="注册" key="2">
                        <Space direction="vertical">
                            <Input placeholder="用户名" ref='username' onChange={this.setUsername.bind(this)}
                                   prefix={<UserOutlined/>} status={this.state.status2}/>
                            <Input placeholder="账号/手机号" ref='phone' onChange={this.setPhone.bind(this)}
                                   prefix={<UserOutlined/>} status={this.state.status2}/>
                            <Input.Password placeholder="密码" ref='password' onChange={this.setPassword.bind(this)}
                                            status={this.state.status}
                                            prefix={<KeyOutlined/>}
                                            iconRender={visible => (visible ? <EyeTwoTone/> :
                                                <EyeInvisibleOutlined/>)}/>
                            <Input.Password placeholder="确认密码" ref='password2' onChange={this.setPassword2.bind(this)}
                                            status={this.state.status}
                                            prefix={<KeyOutlined/>}
                                            iconRender={visible => (visible ? <EyeTwoTone/> :
                                                <EyeInvisibleOutlined/>)}/>
                            <Input placeholder="姓名" ref='name' onChange={this.setName.bind(this)}
                                   prefix={<UserOutlined/>}/>
                            <Input placeholder="驾照号码" ref='license' onChange={this.setLicense.bind(this)}
                                   prefix={<IdcardOutlined/>}/>
                            <Input placeholder="验证码" ref='code' onChange={this.setCode.bind(this)}
                                   prefix={<UserOutlined/>}/>
                            <img src={this.state.code_url} onClick={this.setImg.bind(this)}/>
                            <Button type="primary" onClick={this.register}>注册</Button>
                        </Space>
                    </TabPane>
                </Tabs>
            </div>

        );
    };
}

//导出

export default App
