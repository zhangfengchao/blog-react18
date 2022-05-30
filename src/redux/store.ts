/* 
    该文件专门用于暴露一一个store对象， 整个应用只有一个store对 象
*/

import { createStore, applyMiddleware, combineReducers } from 'redux'
import { persistReducer, persistStore } from "redux-persist";
import countReducer from './count_reducer'
import storage from 'redux-persist/lib/storage'
//  让redux支持异步
import thunk from 'redux-thunk';

// 将所有模块的store的数据汇总
const allReducer = combineReducers({
    react: countReducer
})

// 配置持久化的key， 这里默认使用loacl storage 做持久化的
const persistConfig = {
    key: 'bkl',
    storage: storage
}

const persistedReducer = persistReducer(persistConfig, allReducer);
export const store = createStore(persistedReducer, applyMiddleware(thunk))
export const persis = persistStore(store)