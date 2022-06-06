import { lazy } from 'react'
// 如果你是js就直接无视这个interface的定义
interface Router {
    name?: string,
    path: string,
    children?: Array<Router>,
    component: any
}
// 如果你是js就直接无视这个: Array<Router>的类型限定
const router: Array<Router> = [
    {
        path: '/home',
        component: lazy(() => import('../views/home/home'))
    },
    {
        path: '/editBlog',
        component: lazy(() => import('../views/editBlog/editBlog'))
    }
]

export default router
