/**
 * @description: 所有的接口列表
 * @param {*} 无参数
 * @return {*} 无返回值
 * ```js
 * key表示url路径缩写
 * value表示真实请求的路径
 * ```
 */
const apiList = {
    userLogin: 'userLogin',
    newBlog: 'newBlogs',
    getAllClass: 'getAllClass',
    getAllLabel: 'getAllLabel',
    getHomeBlogs: 'getHomeBlogs',
    getBlogDetails: 'getBlogDetails',
    addComment: 'addComment',
    getAllComment: 'getAllComment',
    addUserPraise: 'addUserPraise',
}
/**
 * @description: 所有的接口列表类型
 * @param {*} 无参数
 * @return {*} 无返回值
 */
export type apiKeyType = keyof typeof apiList;
/**
 * @description: 接口对应的数据返回值类型
 * @param {*} 无参数
 * @return {*} 无返回值
 */
export interface apiKeyDataType {
    'userLogin': {
        code: number;
        data: any;
        message: string
    },
    'newBlog': {
        code: number;
        data: any;
        message: string
    },
    'getAllClass': {
        code: number;
        data: any;
        message: string
    },
    'getAllLabel': {
        code: number;
        data: any;
        message: string
    },
    'getHomeBlogs': {
        code: number;
        data: any;
        message: string
    },
    'getBlogDetails': {
        code: number;
        data: any;
        message: string
    },
    'addComment': {
        code: number;
        message: string
    },
    'getAllComment': {
        code: number;
        data: any;
        message: string
    },
    'addUserPraise': {
        code: number;
        data: any;
        message: string
    },
}

export default apiList;
