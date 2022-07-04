/* 
    该文件专门为Count组件生成action对象
*/
import { USERINFO, SEARCH_DATA, IS_VISIBLE, CLASS_ID } from './constant'

// 所谓的异步action,就是action的值为一般对象Object
//用户信息
export const countIncrementAction = (data: any) => ({ type: USERINFO, data })
//搜索内容
export const searchDataAction = (data: any) => ({ type: SEARCH_DATA, data })
//登录弹窗
export const isVisibleAction = (data: any) => ({ type: IS_VISIBLE, data })
//分类
export const classIdAction = (data: any) => ({ type: CLASS_ID, data })

