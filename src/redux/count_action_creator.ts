/* 
    该文件专门为Count组件生成action对象
*/
import { USERINFO, SEARCH_DATA } from './constant'

// 所谓的异步action,就是action的值为一般对象Object
export const countIncrementAction = (data: any) => ({ type: USERINFO, data })

export const searchDataAction = (data: any) => ({ type: SEARCH_DATA, data })