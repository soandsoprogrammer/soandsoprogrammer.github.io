/**
 * Created by 10652 on 2018/7/9.
 */
import axios from './axiosWrap'
const json2url = json => {
    var arr = []
    var str = ''
    for (var i in json) {
        str = i + '=' + json[i]
        arr.push(str)
    }
    return arr.join('&')
}
const fetch = (url, data, method, postHeaders) => {
    let type = method.toLowerCase()
    let res = {}
    if (type === 'get') {
        res = axios.get(url + '?' + json2url(data))
    } else if (type === 'post') {
        res = axios.post(url, data, postHeaders)
    }
    return res
}
const api = {}
api.account = params => {
    return fetch('/backgroundUser/findAllUser', params, 'post')
}
export { api }