import Vue from "vue"
import axios from "axios"
import utils from "./util"
import router from "../router"
import api from "./api"
import { Loading, Message } from "element-ui" // 这里我是使用elementUI的组件来给提示

let service = axios.create({
  //创建axios实例，在这里可以设置请求的默认配置
  timeout: 60000, // 设置超时时间60s
  baseURL: api.request,
})

let httpCode = {
  //这里我简单列出一些常见的http状态码信息，可以自己去调整配置
  400: "(400)请求参数错误",
  401: "(401)权限不足, 请重新登录",
  403: "(403)服务器拒绝本次访问",
  404: "(404)请求资源未找到",
  500: "(500)内部服务器错误",
  501: "(501)服务器不支持该请求中使用的方法",
  502: "(502)网关错误",
  504: "(504)网关超时",
}

let loading // 加载全局的loading
/** 添加请求拦截器 **/
service.interceptors.request.use(
  (config) => {
    let showLoading = true
    if (config.loading === false) {
      showLoading = false
    }
    if (showLoading) {
      loading = Loading.service({
        text: "拼命加载中...",
        spinner: "el-icon-loading",
        lock: true,
      })
    }
    /**
     * 在这里：可以根据业务需求可以在发送请求之前做些什么。
     */
    config.headers["token"] = Vue.ls.get("rtfl_info", false)
      ? Vue.ls.get("rtfl_info").hasOwnProperty("token")
        ? Vue.ls.get("rtfl_info").token
        : ""
      : ""
    return config
  },
  (error) => {
    // 对请求错误做些什么
    console.log("请求错误，原因：", error)
    return Promise.reject(error)
  }
)

/** 添加响应拦截器  **/
service.interceptors.response.use(
  (response) => {
    let rtflInfo
    if (response.headers.hasOwnProperty("n-token")) {
      if (Vue.ls.get("rtfl_info", false)) {
        if (Vue.ls.get("rtfl_info").hasOwnProperty("token")) {
          rtflInfo = Vue.ls.get("rtfl_info")
          rtflInfo.token = response.headers["n-token"]
          Vue.ls.set("rtfl_info", rtflInfo)
        } else {
          rtflInfo.token = response.headers["n-token"]
          Vue.ls.set("rtfl_info", rtflInfo)
        }
      } else {
        rtflInfo.token = response.headers["n-token"]
        Vue.ls.set("rtfl_info", rtflInfo)
      }
    }
    loading.close()
    if (response.data.code === 0) {
      // 响应结果里的status: 200是我与后台的约定，大家可以根据实际情况去做对应的判断
      return Promise.resolve(response.data)
    } else if (response.data.code == 401) {
      // 响应code码为401token失效，则处理本地缓存内的数据，跳转登录页面，并加防抖函数
      utils.debounce(() => {
        Message({
          message: "登录验证失效，请重新登录。",
          type: "error",
          showClose: true,
        })
        if (localStorage.hasOwnProperty("rtfl_info")) {
          let localSpace = Vue.ls.get("rtfl_info")
          if (localSpace.hasOwnProperty("token")) {
            delete localSpace.token
          }
          if (localSpace.hasOwnProperty("userId")) {
            delete localSpace.userId
          }
          Vue.ls.set("rtfl_info", localSpace)
        }
        router.push({ name: "login", params: { loginType: "401" } })
        // return Promise.reject(response)
      }, 500)
    } else {
      Message({
        message: response.data.msg,
        type: "error",
        showClose: true,
      })
      return Promise.reject(response.data)
    }
  },
  (error) => {
    loading.close()
    if (error.response) {
      /**
       * 在这里：可以根据业务需求可以在请求失败后做什么。
       * 根据请求失败的http状态码去给用户相应的提示
       */
      let tips =
        error.response.data.code in httpCode
          ? httpCode[error.response.data.code]
          : error.response.data.msg
      Message({
        message: tips,
        type: "error",
        showClose: true,
      })
      return Promise.reject(error)
    } else {
      utils.debounce(() => {
        Message({
          message: "请求失败",
          type: "error",
          showClose: true,
        })
        return Promise.reject(new Error("请求失败"))
      }, 500)
    }
  }
)

export default {
  /* 统一封装get请求 */
  get(
    url,
    params,
    config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
  ) {
    return new Promise((resolve, reject) => {
      service({
        method: "get",
        url,
        params,
        ...config,
      })
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  /* 统一封装post请求  */
  post(
    url,
    data,
    config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
  ) {
    return new Promise((resolve, reject) => {
      service({
        method: "post",
        url,
        data,
        ...config,
      })
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}