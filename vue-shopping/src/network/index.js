import axios from "axios"

const instance = axios.create({
    baseURL: "/api",
    timeout: 5000,
});
instance.interceptors.request.use(
    (config) => {
        const token = document.cookie;
        if(token) {
            const temp = token.substring(token.indexOf("token=") + 6);
            config.headers["Authorization"] = "Bearer " + temp.substring(0, temp.indexOf(";")).trim();
        }
        // 在发送请求之前做些什么
        config.headers["Content-type"] = "application/JSON";
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        // 对响应数据做点什么
        // 隐藏加载图
        // 获取code
        const r = response.data;
        // 返回成功
        if (r.status === 200) {
            return r;
        }
        // token 异常
        if (r.status === 200 || r.status === 500 || r.status === 5101) {
            return r;
        }
        // token 异常
        if (r.status === 508 || r.status === 512 || r.status === 514) {
            // 登出 清除token缓存
        }
        return response;
    },
    (error) => {
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);

export default instance;
