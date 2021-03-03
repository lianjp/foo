/*
 * @Author: tian.fanfan
 * @Date: 2019-02-22 12:51:29
 * @Last Modified by: tian.fanfan
 * @Last Modified time: 2019-04-05 22:27:00
 */
/**
 ** 数据层面错误码对应的 错误提示，表驱动
 */
import router from '@/router/index'

const backToLogIn = () => router.push({ name: 'login' })

export default {
  4001: ['你根本未登录', backToLogIn],
  4002: ['你的账户在别处登录了', backToLogIn]
}
