import React, { useEffect, useRef, useState } from "react"
import { Space, Divider, Card, Skeleton, Image, message, Empty } from 'antd'
import axiosFunc from '../../axios/axios'
import { EyeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router-dom"
import moment from 'moment';
import { useSelector, useDispatch } from "react-redux";
import { getDates } from '../../utils/utils'
import { isVisibleAction } from '../../redux/count_action_creator'
interface paramsType {
    userId: any,
    page: any,
    pageSize: any,
    context: any,
    classId?: any
}

const Home: React.FC = () => {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState<boolean>(true);
    const [tabIndex, settabIndex] = useState(1)
    const [page] = useState(1)
    const [blogList, setblogList] = useState([])
    const store = useSelector((state: any) => state.react)

    const tabs = useRef([
        {
            key: 1,
            name: '最新'
        },
        {
            key: 2,
            name: '热门'
        },
    ])

    useEffect(() => {
        getHomeBlog()
        return () => {

        }
    }, [store.searchData, store.userInfo, store.classId])// eslint-disable-line


    const getHomeBlog = async () => {
        let params: paramsType = {
            userId: store.userInfo.user_id,
            page,
            context: store.searchData ? store.searchData : null,
            pageSize: 10
        }

        if (store.classId && store.classId !== '0') {
            params = {
                userId: store.userInfo.user_id,
                page,
                classId: store.classId,
                context: store.searchData ? store.searchData : null,
                pageSize: 10
            }
        }
        setLoading(true)
        let res = await axiosFunc({
            url: 'getHomeBlogs',
            method: 'GET',
            data: params
        })

        if (res.code === 200) {
            if (store.searchData) {
                message.success("搜索成功")
            }
            if (store.classId && store.classId !== '0') setblogList([])
            if (res.data.length) { //还有数据
                // if (res.data.length !== 10) setisBottom(true)
                let list: any = []
                res.data.forEach((item: any) => {
                    list.push(item)
                })
                setblogList(list)
            } else {
                // setisBottom(true)
            }
        }
        setLoading(false)

    }

    return <div className="bac_fffs">
        <div className="flex_row padd10_right" id="home">
            {
                tabs.current.map((i: any, k: number) =>
                    <Space key={k}>
                        <div onClick={() => settabIndex(Number(i.key))}
                            className={tabIndex === i.key ? 'isRadio size_none cursor' : 'size_none cursor'}>
                            {i.name}
                        </div>
                        <Divider type={'vertical'} />
                    </Space>
                )
            }
        </div>
        <div className="border_bottom"></div>
        {
            blogList.length ? blogList.map((i: any, k: number) =>
                <Card loading={loading} bordered={false} key={k} hoverable={true} className='posr'>
                    <Space className="blue cursor" onClick={() => {
                        nav('/blogDetail', {
                            replace: false,
                            state: {
                                blogId: i.blog_id
                            }
                        })
                    }}>
                        <span className="f4f4">{i.user_name}</span>
                        <span className="f3f3">|</span>
                        <span>{moment(i.create_time).fromNow()}</span>
                        <Space className="phones">
                            <span className="f3f3">|</span>
                            <span>{i.class_name}</span>
                            {
                                i.label_name ? <span className="weight">·</span> : <></>
                            }
                            <span>{i.label_name}</span>
                        </Space>
                    </Space>

                    <div className="flex">
                        <div className="right_boxs">
                            <div className="titles mar_t10" onClick={() => {
                                nav('/blogDetail', {
                                    replace: false,
                                    state: {
                                        blogId: i.blog_id,
                                        isPraise: i.isPraise
                                    }
                                })
                            }}>{i.title}</div>
                            <div className="mar_t10 blue" onClick={() => {
                                nav('/blogDetail', {
                                    replace: false,
                                    state: {
                                        blogId: i.blog_id,
                                        isPraise: i.isPraise
                                    }
                                })
                            }}>
                                {i.summary}
                            </div>

                            <Space className="mar_t10 blue">
                                <div className="flex_row">
                                    <EyeOutlined />
                                    <div className="mar_l2">
                                        {i.browse}
                                    </div>
                                </div>

                                <div className="flex_row mar_l15" onClick={async () => {
                                    if (!store.userInfo.user_id) {
                                        message.info("请登录后再试 :）")
                                        dispatch(isVisibleAction({
                                            isVisible: true
                                        }))

                                        return
                                    }
                                    let res = await axiosFunc({
                                        url: 'addUserPraise',
                                        method: 'POST',
                                        data: {
                                            type: 1,
                                            userId: store.userInfo.user_id,
                                            blogId: i.blog_id,
                                            createTime: await getDates(new Date(), 'time'),
                                            isAdd: i.isPraise ? 2 : 1
                                        }
                                    })

                                    if (res.code === 200) {
                                        i.isPraise = !i.isPraise
                                        if (i.isPraise) i.like_int++
                                        else i.like_int--
                                        setblogList(JSON.parse(JSON.stringify(blogList)))
                                    } else message.info(res.message)

                                }}>
                                    <LikeOutlined className={i.isPraise ? 'blues' : ''} />
                                    <div className="mar_l2" >
                                        <span className={i.isPraise ? 'blues' : ''}>{i.like_int}</span>
                                    </div>
                                </div>

                                <div className="flex_row mar_l15">
                                    <MessageOutlined />
                                    <div className="mar_l2">
                                        {i.comment}
                                    </div>
                                </div>
                            </Space>
                        </div>

                        <div className="blog_img_box">
                            <Image src={i.blog_img} width={250} height={250} alt="" />

                        </div>
                    </div>
                </Card>
            ) : <>{
                loading ? <Skeleton loading={loading} avatar active /> : <Empty />
            }</>
        }
    </div>

}

export default Home
