import { extend } from 'umi-request';
const request = extend({
    timeout: 1000,
    params: {
        token: localStorage.getItem('token')
    },
    data: {
        token: localStorage.getItem('token')
    }
});
import { message } from "antd";
const http = {
    get(url: string, params?: any) {
        return request
            .get(url, { params: params })
            .then((response) => {
                return response
            })
    },
    post(url: string, data?: any) {
        return request
            .post(url, {
                data: data
            })
            .then((response) => {
                if (response.status === 0) {
                    return response
                } else {
                    message.error(response.msg)
                }
            })

    }
}
export default http