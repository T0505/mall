import axios from "axios"

const instance = axios.create({
    baseURL: "/api",
    timeout: 5000,
    method: "post",
});
instance.interceptors.request.use(
    (config) => {
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
        const res = response.data;
        // 返回成功
        if (res === 200) {
            return res;
        }
        // token 异常
        if (res === 508 || res === 512 || res === 514) {
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
