import { message, Avatar, Space } from 'antd'
import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import axiosFunc from '../../axios/axios'
import { AntDesignOutlined } from '@ant-design/icons'

const BlogDetail: React.FC = () => {
    const blogId = useRef(0)
    const [blogDetail, setblogDetail] = useState({
        title: ''
    })
    const location = useLocation()

    useEffect(() => {
        console.log(location.state);
        blogId.current = (location.state as any).blogId
        getDetail()

        return () => {

        }
    }, [location])

    const getDetail = async () => {
        let res = await axiosFunc({
            url: 'getBlogDetails',
            method: 'GET',
            data: {
                blogId: blogId.current
            }
        })

        if (res && res.code === 200) {
            setblogDetail(res.data)
        } else message.error(`错误了，${res.message}`)
    }

    return (
        <div className='detail_pages'>
            <div className='detail_title'>
                {
                    blogDetail.title
                }
            </div>

            <div className='flex_row_sp'>
                <Space>
                    <Avatar
                        src={'https://img1.baidu.com/it/u=3641095638,3765858048&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'}
                        icon={<AntDesignOutlined />}
                    />
                </Space>
                <div>123123</div>
            </div>
        </div>
    )
}

export default BlogDetail
