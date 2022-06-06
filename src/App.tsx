import './App.scss'
import Layout from './views/layout/layout'
import { Routes, HashRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persis, store } from './redux/store'
import { ConfigProvider } from 'antd'
import { PersistGate } from 'redux-persist/integration/react'
import zhCN from 'antd/es/locale/zh_CN';  // 引入中文包
import 'moment/locale/zh-cn';
import moment from 'moment';
import './states/main.scss';
moment.locale('zh-cn');

const App = () => {

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
