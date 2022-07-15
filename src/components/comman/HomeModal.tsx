import { Modal, Form, Input, Button, message } from 'antd'
import axiosFunc from '../../axios/axios'
import { useDispatch } from 'react-redux'
import { countIncrementAction } from '../../redux/count_action_creator'

interface ModalCom {
    isVisible: boolean
    handleCancel: Function
    title: string
}

const HomeModal: React.FC<ModalCom> = (props) => {
    const dispatch = useDispatch()

    return <Modal
        footer={[]}
        title={props.title}
        visible={props.isVisible}
        onCancel={() => props.handleCancel()}
    >
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={async (data) => {
                let res = await axiosFunc({
                    url: 'userLogin',
                    method: 'POST',
                    data
                })

                if (res.code === 200) {
                    dispatch(countIncrementAction({
                        userInfo: res.data
                    }))
                    props.handleCancel()
                    message.success("登录成功")
                } else message.info(`登录失败${res.message}`)

            }}
            onFinishFailed={() => message.info("请正确输入账号、密码 :）")}
            autoComplete="off"
        >
            <Form.Item
                label="账号"
                name="account"
                rules={[{ required: true, message: '请输入账号!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: '请输入密码!' }]}
            >
                <Input.Password />
            </Form.Item>
            <div className='center'>
                <Button type="primary" htmlType="submit">
                    登录
                </Button>
            </div>
        </Form>
    </Modal>
}

export default HomeModal