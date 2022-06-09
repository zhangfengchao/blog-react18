import React, { useEffect, useRef, useState } from "react"
import { Space, Divider, Card, Skeleton, Image, message } from 'antd'
import axios from '../../axios/axios'
import { EyeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router-dom"
import moment from 'moment';
import { useSelector } from "react-redux";

const Home: React.FC = () => {
    const nav = useNavigate()
    const [loading, setLoading] = useState(true);
    const [tabIndex, settabIndex] = useState(1)
    const [page] = useState(1)
    // const [isBottom, setisBottom] = useState(false)
    const [blogList, setblogList] = useState([])
    const store = useSelector((state: any) => state)

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
    }, [store.react.searchData])// eslint-disable-line


    const getHomeBlog = async () => {
        // if (isBottom && !store.react.searchData) return
        let res = await axios({
            url: 'getHomeBlogs',
            method: 'GET',
            data: {
                page,
                context: store.react.searchData ? store.react.searchData : null,
                pageSize: 10
            }
        })

        if (res.code === 200) {

            if (store.react.searchData) {
                message.success("搜索成功")
            }
            if (loading) setLoading(false)
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
    }


    return <>
        <div className="flex_row padd10_right" id="home">
            {
                tabs.current.map((i: any, k: number) =>
                    <Space key={k} >
                        <div onClick={() => settabIndex(Number(i.key))} className={tabIndex === i.key ? 'isRadio cursor' : 'cursor'}>{i.name}</div>
                        <Divider type={'vertical'} />
                    </Space>
                )
            }
        </div>
        <div className="border_bottom"></div>
        {
            blogList.length ? blogList.map((i: any, k: number) =>
                <Card loading={loading} bordered={false} key={k} hoverable={true} className='posr' onClick={() => {
                    console.log("进入详情");
                    nav('/blogDetail', {
                        replace: false,
                        state: {
                            blogId: i.blog_id
                        }
                    })
                }}>
                    <Space className="blue cursor">
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
                            <div className="titles mar_t10">{i.title}</div>
                            <div className="mar_t10 blue">
                                {i.title}
                            </div>

                            <Space className="mar_t10 blue">
                                <div className="flex_row">
                                    <EyeOutlined />
                                    <div className="mar_l2">
                                        {i.browse}
                                    </div>
                                </div>

                                <div className="flex_row mar_l15">
                                    <LikeOutlined />
                                    <div className="mar_l2">
                                        {i.like_int}
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
            ) : <Skeleton loading={loading} avatar active />
        }
    </>

}

export default Home
