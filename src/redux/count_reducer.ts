/* 
1. 该文件是用于创建一个为Count组件服务的reducer. reducer的本质 就是一“个函数
2. reducer函数会接到两个参数，分别为:之前的状态(preState)I动作对象(action)
*/
import { USERINFO, TOKEN, ISNOW, ISRIGHT, DEFAULT_DOCTORID, OUT_TAB, INTO_TAB, ACCOUNT_LIST, DEVICE_TYPE } from './constant'
import reduxSate from './state'
// ES6 初始化默认值
const reducers = (state = reduxSate, { type, data }: any) => {
    switch (type) {
        case USERINFO:
            return { ...state, ...data };
        case TOKEN:
            return { ...state, ...data };
        case ISNOW:
            return { ...state, ...data };
        case ISRIGHT:
            return { ...state, ...data };
        case DEFAULT_DOCTORID:
            return { ...state, ...data };
        case INTO_TAB:
            return { ...state, ...data };
        case OUT_TAB:
            return { ...state, ...data };
        case ACCOUNT_LIST:
            return { ...state, ...data };
        case DEVICE_TYPE:
            return { ...state, ...data };
        default:
            return state;
    }
}

export default reducers