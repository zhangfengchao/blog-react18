/* 
    该文件专门为Count组件生成action对象
*/

import { USERINFO, TOKEN, ISNOW, ISRIGHT, DEFAULT_DOCTORID, OUT_TAB, INTO_TAB, ACCOUNT_LIST, DEVICE_TYPE } from './constant.js'


// 所谓的异步action,就是action的值为一般对象Object
export const countIncrementAction = (data: any) => (
    { type: USERINFO, data }
)

export const countToken = (data: any) => (
    { type: TOKEN, data }
)

export const countIsnow = (data: any) => (
    { type: ISNOW, data }
)

export const countIsright = (data: any) => (
    { type: ISRIGHT, data }
)

export const countDefDoctor = (data: any) => (
    { type: DEFAULT_DOCTORID, data }
)

export const countOutTab = (data: any) => (
    { type: OUT_TAB, data }
)

export const countIntoTab = (data: any) => (
    { type: INTO_TAB, data }
)

export const countCountList = (data: any) => (
    { type: ACCOUNT_LIST, data }
)

export const deviceCount = (data: any) => (
    { type: DEVICE_TYPE, data }
)
