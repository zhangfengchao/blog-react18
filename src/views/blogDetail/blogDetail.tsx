import { message, Avatar, Space, Button, Tag, Input, Badge } from 'antd'
import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import axiosFunc from '../../axios/axios'
import { Editor } from '@wangeditor/editor-for-react'
import { IEditorConfig } from '@wangeditor/editor'
import { AntDesignOutlined, PlusOutlined, LikeOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons'
import { getDates } from '../../utils/utils'
import moment from 'moment'
import { useSelector, useDispatch } from "react-redux";
import { isVisibleAction } from '../../redux/count_action_creator'


const { TextArea } = Input
const BlogDetail: React.FC = () => {
    const editorConfig: Partial<IEditorConfig> = {
        readOnly: true,
    }
    const dispatch = useDispatch()
    const store = useSelector((state: any) => state.react.userInfo)
    const [comment, setcomment] = useState('')
    const blogId = useRef(0)
    const [blogDetail, setblogDetail] = useState({
        comment: '',
        like_int: '',
        title: '',
        user_avater: '',
        browse: 0,
        class_name: '',
        content: '',
        user_name: '',
        create_time: '',
        blog_img: '',
        summary: '',
        label_name: '',
        isPraise: false,
    })
    const location = useLocation().state
    const [commentList, setcommentList] = useState([{
        comment_id: '',
        comment: '',
        create_time: '',
        parent_commentId: '',
        user_name: ''
    }])

    useEffect(() => {
        blogId.current = (location as any).blogId
        getDetail()
        getComment()

        return () => {

        }
    }, [])// eslint-disable-line

    const getDetail = async () => {
        let res = await axiosFunc({
            url: 'getBlogDetails',
            method: 'GET',
            data: {
                blogId: blogId.current,
                userId: store.user_id
            }
        })

        if (res && res.code === 200) {
            setblogDetail(res.data)
        } else message.error(`错误了，${res.message}`)
    }

    const getComment = async () => {
        let res = await axiosFunc({
            url: 'getAllComment',
            method: 'GET',
            data: {
                blogId: blogId.current,
                userId: store.user_id
            }
        })

        if (res && res.code === 200) setcommentList(res.data)
        else message.info(res.message)
    }

    const addComment = async () => {
        if (!comment.length) {
            message.info("请输入评论后再试:)")
            return
        }
        let res = await axiosFunc({
            url: 'addComment',
            method: 'POST',
            data: {
                comment,
                createTime: await getDates(new Date(), 'time'),
                userId: store.user_id,
                blogId: blogId.current,
            }
        })

        if (res && res.code === 200) {
            setcomment('')
            message.success(res.message)
            getComment()
        } else message.info(`发送失败${res.message}`)
    }

    return (
        <div className='detail_pages right_box'>
            <div className='bac_fffs detail_box posr'>
                <div
                    className='fiexd_detail'
                >
                    <Badge
                        color={blogDetail.isPraise ? '#1e80ff' : '#bdb9b9'}
                        count={blogDetail.like_int}
                    >
                        <div className='icon_box' onClick={async () => {
                            let objs = JSON.parse(JSON.stringify(blogDetail))
                            if (!store.user_id) {
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
                                    userId: store.user_id,
                                    blogId: blogId.current,
                                    createTime: await getDates(new Date(), 'time'),
                                    isAdd: objs.isPraise ? 2 : 1
                                }
                            })

                            if (res.code === 200) {
                                if (objs.isPraise) objs.like_int--
                                else objs.like_int++
                                objs.isPraise = !objs.isPraise
                                setblogDetail(objs)
                            } else message.info(res.message)
                        }}>
                            <LikeOutlined className={blogDetail.isPraise ? 'big_icons blues' : 'big_icons'} />

                        </div>
                    </Badge>

                    <Badge className='icon_box' count={blogDetail.comment} color='#bdb9b9'>
                        <MessageOutlined className='big_icons' />
                    </Badge>

                </div>
                <div className='detail_title mar_b10'>
                    {
                        blogDetail.title
                    }
                </div>

                <div className='flex_row_sp mar_b10'>
                    <Space>
                        <Avatar
                            size={40}
                            src={blogDetail.user_avater}
                            icon={<AntDesignOutlined />}
                        />
                        <div className='flex_sp font_size times'>
                            <div>{blogDetail.user_name}</div>
                            <Space>{blogDetail.create_time} · 阅读 {blogDetail.browse}</Space>
                        </div>
                    </Space>
                    <Button className='btn_color'><PlusOutlined />关注</Button>
                </div>

                <div className='max_img mar_b10'>
                    <img src={blogDetail.blog_img} className='imgs' loading="lazy" alt="" />
                </div>

                {
                    blogDetail.summary ? <div className='mar_b10'>{blogDetail.summary}</div> : <></>
                }
                <div>
                    <Editor value={blogDetail.content} defaultConfig={editorConfig} />
                </div>

                <div>
                    <Space className='mar_r20'>
                        分类：<Tag color="processing">
                            {blogDetail.class_name}
                        </Tag>
                    </Space>

                    <Space>
                        标签：<Tag color="warning">
                            {blogDetail.label_name}
                        </Tag>
                    </Space>
                </div>
            </div>

            <div className='bac_fffs mar_t10 detail_box'>
                <div className='ping_title mar_b10'>
                    评论
                </div>

                <div className='flex' id='details'>
                    <Avatar
                        size={40}
                        src={store.user_avater}
                        icon={<UserOutlined />}
                    />

                    <TextArea
                        onClick={() => {
                            if (!store.user_id) {
                                dispatch(isVisibleAction({
                                    isVisible: true
                                }))
                                console.log("触发登录啦")
                            }
                        }}
                        onKeyDown={async e => {
                            const keyCode = e.keyCode || e.which || e.charCode;
                            const keyCombination = e.ctrlKey;
                            if (keyCombination && keyCode === 13) {
                                console.log("按下了Ctrl + Enter");
                                addComment()
                            }

                        }}
                        value={comment}
                        allowClear
                        placeholder='请输入评论（Enter换行，Ctrl + Enter发送）'
                        className='textarea_box'
                        showCount
                        maxLength={100}
                        onChange={(e: any) => setcomment((e.target as any).value)} />
                </div>

                <div className='mar_b10 add_btn'>
                    {
                        store.user_id ? <Button size='small' type={'primary'} onClick={() => addComment()}>发送</Button> : <></>
                    }

                </div>

                <div className='ping_title mar_b10'>
                    全部评论
                </div>
                {
                    commentList.map((i: any, k: number) =>
                        <div key={k} className='flex_comment'>
                            <div>
                                <Avatar
                                    size={40}
                                    src={i.user_avater}
                                    icon={<AntDesignOutlined />}
                                />

                            </div>
                            <div className='names max_w'>
                                <div className='max_w flex_row_sp '>
                                    <span>
                                        {i.user_name}
                                    </span>
                                    <span className='blue'> {moment(i.create_time).fromNow()}</span>
                                </div>
                                <div className='mar_t10'>
                                    {i.comment}
                                </div>

                                <Space className={i.isPraise ? 'mar_t10 cursor blues' : 'cl_f2 mar_t10 cursor'}
                                    onClick={async () => {
                                        if (!store.user_id) {
                                            dispatch(isVisibleAction({
                                                isVisible: true
                                            }))
                                            return
                                        }
                                        let res = await axiosFunc({
                                            url: 'addUserPraise',
                                            method: 'POST',
                                            data: {
                                                type: 2,
                                                userId: store.user_id,
                                                commentId: i.comment_id,
                                                createTime: await getDates(new Date(), 'time'),
                                                isAdd: i.isPraise ? 2 : 1
                                            }
                                        })

                                        if (res.code === 200) {
                                            i.isPraise = !i.isPraise
                                            if (i.isPraise) i.praise++
                                            else i.praise--
                                            setcommentList(JSON.parse(JSON.stringify(commentList)))
                                        } else message.info(res.message)

                                    }}>
                                    <LikeOutlined />
                                    {
                                        i.praise ? i.praise : '点赞'
                                    }
                                </Space>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default BlogDetail
