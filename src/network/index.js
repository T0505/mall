import axios from "axios";
import { ElMessage } from "element-plus";

const instance = axios.create({
    baseURL: "/api",
    timeout: 5000,
});
instance.interceptors.request.use(
    (config) => {
        const token = document.cookie;
        if(token) {
            const temp = token.substring(token.indexOf("token=") + 6);
            const index = temp.indexOf(";");
            config.headers["Authorization"] = "Bearer " + temp.substring(0, index+1?index:temp.length).trim();
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
        const r = response.data;
        // 返回成功
        // token 异常
        if (r.status === 508 || r.status === 512 || r.status === 514) {
            // 登出 清除token缓存
            document.cookie = "";
            ElMessage.success("登录过期请重新登录")
            window.location.replace("http://localhost:5174/login");
        }
        return r;
    },
    (error) => {
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);

export default instance;
