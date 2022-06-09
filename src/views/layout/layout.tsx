import React, { Suspense, useEffect, useRef, useState } from "react"
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { Layout, Menu, Input, Space, Button, Collapse, Dropdown } from 'antd';
import router from '../../router'
import { HomeOutlined, AppstoreOutlined, SettingOutlined, EditOutlined, LikeOutlined, UserAddOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { searchDataAction } from '../../redux/count_action_creator'
import { useDispatch } from "react-redux";
const { Panel } = Collapse;
const { Header, Content, Footer } = Layout;
const { Search } = Input;

const items: MenuProps['items'] = [
    {
        label: '首页',
        key: '/home',
        icon: <HomeOutlined />
    },
    {
        label: '沸点',
        key: 'app',
        icon: <AppstoreOutlined />,
    },
    {
        label: '作品',
        key: 'SubMenu',
        icon: <SettingOutlined />,
    },
    {
        label: '留言',
        key: 'Emil',
        icon: <SettingOutlined />,
    },
];


const LayoutPage: React.FC = () => {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const [top, settop] = useState(0)
    const tops = useRef(0)
    const [defaultKey, setdefaultKey] = useState(['/home'])

    useEffect(() => {
        dispatch(searchDataAction({ searchData: '' }))
        window.addEventListener('scroll', () => { //实现隐藏上方导航栏
            settop(document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset)
        })
    }, [top, dispatch])

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <div onClick={() => {
                            nav('/editBlog', {
                                replace: false,
                                state: {
                                    a: 123
                                }
                            })
                        }}>
                            <EditOutlined />
                            写文章
                        </div>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <div onClick={() => {
                            nav('/editBlog', {
                                replace: false,
                                state: {
                                    a: 123
                                }
                            })
                        }}>
                            <LikeOutlined />
                            我赞过的
                        </div>
                    ),
                }
            ]}
        />
    );

    return <Layout className="layout">
        <Header className={top > tops.current ? 'navOff  ' : 'navOn'} >
            <div className="flex_row_center">
                <Menu className="menu_w"
                    onClick={(e: any) => {
                        setdefaultKey(e.keyPath)
                        nav(e.key, {
                            replace: false,
                        })
                    }} selectedKeys={defaultKey} mode="horizontal" items={items} />

                <Search className="" placeholder="搜索本站" onSearch={(e: any) => dispatch(searchDataAction({ searchData: e }))} style={{ width: 200 }} />
                <Space>

                    <Dropdown className="login_title user_login cursor" overlay={menu} placement="bottomLeft" arrow>
                        <Button type="text">
                            <Space>
                                <UserAddOutlined />登录</Space>
                        </Button>
                    </Dropdown>

                </Space>
            </div>
        </Header>

        <Header className={top > tops.current ? "flex_row_center fixed_top bottom_border" : "flex_row_center bottom_border"}>
            {
                ['综合', '关注', '后端', '前端', '代码人生'].map((item, index) =>
                    <Button key={index} type='text'>{item}</Button>
                )
            }
        </Header>

        <Content className="flex_layout">
            <div className="page_box">
                <Routes>
                    <Route path="*" element={<Navigate to="home" />}></Route>
                    {
                        router.map((item, i) => {
                            return (
                                <Route key={i} path={item.path} element={
                                    <Suspense fallback={
                                        <div>路由懒加载...</div>
                                    }>
                                        < item.component />
                                    </Suspense>
                                } />
                            )
                        })
                    }
                </Routes>
            </div>

            <div className="setting_box">
                <div className="bac_fff  pos_r mar_b20">
                    <div className="user_top"></div>
                    <div className="flex_row_center pos_t mar_b20">
                        <img className="avatar" src="https://img1.baidu.com/it/u=3641095638,3765858048&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" alt="" />
                    </div>
                    <div className="flex_row_center user_name weight">未登录</div>
                    <div className="flex_row_center padd_10">hello world</div>
                </div>

                <div className="car_box">
                    <Collapse expandIconPosition='right'>
                        <Panel className="" header={
                            <Space>
                                <SettingOutlined />
                                <div className="weight">设置</div>
                            </Space>} key="1">
                            <p>设置</p>
                        </Panel>
                    </Collapse>
                </div>
            </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Heelo world!</Footer>
    </Layout>
}

export default LayoutPage
