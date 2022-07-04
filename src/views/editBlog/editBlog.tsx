
import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig } from '@wangeditor/editor'
import { getDates } from '../../utils/utils'
import axios from '../../axios/axios'
import { Input, Space, Button, message, Dropdown, Card, Divider, Radio, Select } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Option } = Select
const { TextArea } = Input;

const MyEditor: React.FC = () => {
    const nav = useNavigate()
    const [editor, setEditor] = useState<IDomEditor | null>(null) // 存储 editor 实例
    const [html, setHtml] = useState('') // 编辑器内容
    const [title, settitle] = useState('')
    const [diopFlag, setdiopFlag] = useState(false)
    const [classId, setclassId] = useState()
    const [blogImg, setblogImg] = useState<string>('https://img1.baidu.com/it/u=1283015551,382418629&fm=253&fmt=auto&app=120&f=JPEG?w=708&h=500')
    const [summary, setsummary] = useState('')
    const [labels, setlabels] = useState([])
    const [labelList, setlabelList] = useState([{
        label_id: null,
        label_name: null
    }])
    const options = labelList.map(d => <Option key={d.label_id}>{d.label_name}</Option>);
    const [radioList, setradioList] = useState([{
        class_id: 0,
        class_name: ''
    }])
    const toolbarConfig = {}
    const editorConfig: Partial<IEditorConfig> = {
        placeholder: '请输入内容...',
    }
    // 模拟 ajax 请求，异步设置 html
    useEffect(() => {
        getClass()
        getLabel()
    }, [])

    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    const getClass = async () => {
        let res = await axios({
            url: 'getAllClass',
            method: 'GET'
        })

        if (res && res.code === 200) setradioList(res.data)
    }

    const getLabel = async () => {
        const res = await axios({
            url: 'getAllLabel',
            method: 'GET'
        })

        if (res && res.code === 200) setlabelList(res.data)
    }

    const postBlog = async () => {
        if (!title) {
            message.info("请输入标题后再试 :)")
            return
        }

        if (!html) {
            message.info("请输入内容后再试 :)")
            return
        }

        if (!labels.length) {
            message.info("请选择标签后再试 :)")
            return
        }

        if (!classId) {
            message.info("请选择分类后再试 :)")
            return
        }

        const params = {
            title,
            content: html,
            createTime: await getDates(new Date(), 'time'),
            blogUser: 1,
            classId,
            blogImg,
            summary,
            labelId: labels.join('_')
        }

        const res = await axios({
            url: 'newBlog',
            method: 'POST',
            data: params
        })

        if (res && res.code === 200) {
            message.success("发布成功")
            setdiopFlag(false)
            nav('/home', {
                replace: true,
            })
        } else {
            message.error(`发布失败${res.message}`)
            setdiopFlag(false)
        }
    }

    const confirmDiog = () => {
        return <Card className='padd10' title="发布文章" style={{ width: 600 }}>
            <Divider />
            <div className='flex mar_b20'>
                <div className='title_f'>
                    <div className='must'>*</div> 分类：
                </div>

                <Radio.Group onChange={e => setclassId(e.target.value)} size="large" className='flex_wrap'>
                    {
                        radioList.map((i, k) =>
                            <div className='padd5' key={k}>
                                <Radio.Button value={i.class_id}>{i.class_name}</Radio.Button>
                            </div>
                        )
                    }
                </Radio.Group>
            </div>

            <div className='flex mar_b20'>
                <div className='title_f'>
                    <div className='must'>*</div> 添加标签：
                </div>

                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="请选择标签"
                    onChange={(e) => setlabels(e)}
                >
                    {options}
                </Select>
            </div>

            <div className='flex mar_b20'>
                <div className='title_f'>
                    文章封面：
                </div>

                <Input placeholder='请输入文章封面图片链接' value={blogImg} onInput={e => setblogImg((e.target as any).value)}></Input>
            </div>

            <div className='flex mar_b20'>
                <div className='title_f'>
                    文章摘要：
                </div>
                <TextArea className='max_textarea' showCount maxLength={100} style={{ height: 120 }} onChange={e => setsummary((e.target as any).value)} />
            </div>
            <Divider />
            <div className='right'>
                <Space>
                    <Button type={'ghost'} onClick={() => setdiopFlag(false)}>
                        取消
                    </Button>
                    <Button type={'primary'} onClick={() => {
                        postBlog()
                    }}>
                        确定并发布
                    </Button>
                </Space>
            </div>
        </Card>
    }

    return (
        <>
            <div>
                <div className='right mar_b10 mar_r10'>
                    <Space>
                        <Button onClick={() => nav(-1)} >取消</Button>
                        <Dropdown
                            visible={diopFlag}
                            overlay={confirmDiog}
                            placement="bottomRight"
                            arrow
                            trigger={['click']}>
                            <Button type={'primary'} onClick={() => setdiopFlag(true)} >发布</Button>
                        </Dropdown>
                    </Space>

                </div>

                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <div className='edit_input'>
                    <Input placeholder='请输入标题' onInput={e => settitle((e.target as any).value)} />
                </div>
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={editor => setHtml(editor.getHtml())}
                    mode="default"
                    style={{ height: '500px', 'overflowY': 'hidden' }}
                />
            </div>
        </>
    )
}

export default MyEditor