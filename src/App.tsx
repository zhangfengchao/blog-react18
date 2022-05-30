import { Button } from 'antd'
import { useState } from 'react'
import './App.css'
import './states/main.less'
import Layout from './views/layout/layout'
import { Routes, HashRouter, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persis, store } from './redux/store'
import { ConfigProvider } from 'antd'
import { PersistGate } from 'redux-persist/integration/react'
import zhCN from 'antd/es/locale/zh_CN';  // 引入中文包
import 'moment/locale/zh-cn';
import moment from 'moment';
moment.locale('zh-cn');

const App = () => {
  const [count, setCount] = useState(0)

  return <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persis}>
        <HashRouter>
          <Routes>
            <Route path='/*' element={<Layout />} />
          </Routes>
        </HashRouter>
      </PersistGate>
    </Provider>
  </ConfigProvider>
}

export default App
