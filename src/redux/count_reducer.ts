/* 
1. 该文件是用于创建一个为Count组件服务的reducer. reducer的本质 就是一“个函数
2. reducer函数会接到两个参数，分别为:之前的状态(preState)I动作对象(action)
*/
import { USERINFO, SEARCH_DATA } from './constant'
import reduxSate from './state'
// ES6 初始化默认值
const reducers = (state = reduxSate, { type, data }: any) => {
    switch (type) {
        case SEARCH_DATA:
            return { ...state, ...data };

        case USERINFO:
            return { ...state, ...data };

        default:
            return state;
    }
}

export default reducers