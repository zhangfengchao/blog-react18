import React, { Suspense, useEffect, useRef, useState } from "react"
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { Layout, Menu, Input, Space, Button, Collapse, Dropdown, Spin, Alert, Avatar, Popconfirm, message, BackTop, Tabs } from 'antd';
import router from '../../router'
import { HomeOutlined, AppstoreOutlined, SettingOutlined, EditOutlined, LikeOutlined, UserAddOutlined, RollbackOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { searchDataAction, countIncrementAction, isVisibleAction, classIdAction } from '../../redux/count_action_creator'
import { useDispatch, useSelector } from "react-redux";
import HomeModal from "../../components/comman/HomeModal"
import axiosFunc from "../../axios/axios";

const { TabPane } = Tabs;
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
    const store = useSelector((state: any) => state.react.userInfo)
    const [defaultKey, setdefaultKey] = useState(['/home'])
    const isVisible = useSelector((state: any) => state.react.isVisible)
    const [classList, setclassList] = useState([])

    useEffect(() => {
        dispatch(searchDataAction({ searchData: '' }))
        window.addEventListener('scroll', () => { //实现隐藏上方导航栏
            settop(document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset)
        })
    }, [top, dispatch, store])

    useEffect(() => {
        getAllTag()

        return () => {

        }
    }, [])


    const getAllTag = async () => {
        const res = await axiosFunc({
            url: 'getAllClass',
            method: 'GET',
        })

        if (res && res.code === 200) setclassList(res.data)
    }

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
                            <Button type="text">写文章</Button>
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

                            <Button type="text">我赞过的</Button>
                        </div>
                    ),
                },
                {
                    key: '3',
                    label: (
                        <>
                            <RollbackOutlined />
                            <Popconfirm
                                title="请确认是否退出登录?"
                                onConfirm={() => {
                                    dispatch(countIncrementAction({
                                        userInfo: {}
                                    }))
                                    message.success("退出登录成功")
                                }}
                                okText="是"
                                cancelText="否"
                            >
                                <Button type="text">退出登录</Button>
                            </Popconfirm>
                        </>
                    ),
                }
            ]}
        />
    );

    return <Layout className="layout">
        <BackTop />
        <HomeModal {
            ...{
                isVisible,
                title: '账号登录'
            }
        }
            handleCancel={() => dispatch(isVisibleAction({
                isVisible: false
            }))} />
        <Header className={top > tops.current ? 'navOff  ' : 'navOn'} >
            <div className="flex_row_center">
                <Menu className="menu_w"
                    onClick={(e: any) => {
                        setdefaultKey(e.keyPath)
                        nav(e.key, {
                            replace: false,
                        })
                    }} selectedKeys={defaultKey} mode="horizontal" items={items} />

                <Search className="" placeholder="搜索本站" onSearch={(e: any) => {
                    nav('/home', {
                        replace: false
                    })
                    dispatch(searchDataAction({ searchData: e }))
                }} style={{ width: 200 }} />
                <Space>
                    {
                        store.user_id ? <Dropdown className="login_title user_login cursor" overlay={menu} placement="bottomLeft" arrow>
                            <Button type="text">
                                <Space>
                                    <Avatar size="large" icon={<UserAddOutlined />} src={store.user_avater} />

                                    {store.user_name}
                                </Space>
                            </Button>
                        </Dropdown> : <div className="login_title user_login cursor" onClick={() => dispatch(isVisibleAction({
                            isVisible: true
                        }))}>
                            <Button type="text">
                                <Space>
                                    <UserAddOutlined />

                                    未登录
                                </Space>
                            </Button>
                        </div>
                    }

                </Space>
            </div>
        </Header>

        <Header className={top > tops.current ? "flex_row_center fixed_top bottom_border" : "flex_row_center bottom_border"}>
            <div className="max_w padd_lr">
                <Tabs defaultActiveKey="0" onChange={(e: any) => dispatch(classIdAction({
                    classId: e
                }))}>
                    <TabPane tab={'综合'} key={'0'} />
                    {
                        classList.map((item, index) =>
                            <TabPane tab={(item as any).class_name} key={(item as any).class_id} />
                        )
                    }
                </Tabs>
            </div>

        </Header>

        <Content className="flex_layout">
            <div className="page_box">
                <Routes>
                    <Route path="*" element={<Navigate to="home" replace={true} />}></Route>
                    {
                        router.map((item, i) => {
                            return (
                                <Route key={i} path={item.path} element={
                                    <Suspense fallback={
                                        <Spin tip="Loading...">
                                            <Alert
                                                message="页面加载中"
                                                description="请等待页面加载 :)"
                                                type="info"
                                            />
                                        </Spin>
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
                        {
                            store.user_id ? <img className="avatar" src={store.user_avater} alt="" />
                                : <img className="avatar" src="https://img1.baidu.com/it/u=3641095638,3765858048&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" alt="" />
                        }

                    </div>
                    <div className="flex_row_center user_name weight cursor">
                        {store.user_id ?
                            store.user_name
                            : <div
                                className="login_btn"
                                onClick={() => dispatch(isVisibleAction({
                                    isVisible: true
                                }))}>
                                登录账号
                            </div>
                        }</div>
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
        <Footer style={{ textAlign: 'center' }}>Welcome to NightBlog Hello world! </Footer>
    </Layout>
}

export default LayoutPage
