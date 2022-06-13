import fly from 'flyio';
// import {ElMessage} from 'element-plus';

//创建实例
const request = fly;

//设置超时
request.config.timeout = 10000;

//添加请求拦截器
request.interceptors.request.use(request => {
    if (request.method !== 'GET' && !request.headers['Content-Type']) {
        request.headers['Content-Type'] = 'application/json';
    }
    return request;
});

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
request.interceptors.response.use(
    response => {
        // 只返回 code == 200 的请求
        if (response.data.code === 200) {
            return response.data;
        }
        // ElMessage.error(response.data.message.substring(0, 200));
        return Promise.reject(response.data.message);
    }
);

export default request;
