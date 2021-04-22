import axios from 'axios'  // 引入axios模块

// 引入NProgress  JS和 CSS
import NProgress from 'nprogress'  // 在ajax请求时，显示进度条
import 'nprogress/nprogress.css'  // 进度条的css

axios.defaults.timeout = 10000;   // 配置ajax请求的超时时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; // 配置ajax post请求的请求头

// 配置请求拦截器
axios.interceptors.request.use((config)=>{
    NProgress.start();  // 开启进度条
    return config;
}, (error)=>{
    return Promise.error(error);
});

// 配置响应拦截器
axios.interceptors.response.use((response)=>{
    NProgress.done(); // 关闭进度条
    // 过滤
    if(response.status === 200){
        return Promise.resolve(response.data); // response.data是服务器响应的数据
    }else {
        return Promise.reject(response.data);
    }

}, (error)=>{
    console.log(error);
});

// 声明一个方法，ajax，后面只要发请求，那么就需要调用ajax方法
// ajax("/manager/api/auth/admin/login",{username,password},'post')
// 发ajax请求，就是调用ajax方法，调用ajax方法，返回promise
// ajax("/manager/api/auth/admin/login",{username,password},'post').then(value=>).catch(err=>)
export default function ajax(url = '', params = {}, type = 'GET') {
     let promise;

    return new Promise((resolve, reject)=>{
        if(type.toUpperCase() === 'GET'){
            params['itliaoma'] = randomCode(20);
            promise = axios({
                url,
                params
            })
        }else if(type.toUpperCase() === 'POST'){
            promise = axios({
                method: 'post',
                url,
                data: params
            })
        }

        promise.then((response)=>{
            resolve(response);
        }).catch((error)=>{
            reject(error);
        })
    });
}

function randomCode(length) {
    const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let result = '';
    for (let i=0; i<length; i++){
        let index = Math.ceil(Math.random()*9);
        result += chars[index];
    }
    return result;
}
