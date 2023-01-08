import request from '@/api/request'

// 登录
export const login = data => request({ url: '/user/login', method: 'post', data })

// 注册
export const register = data => request({ url: '/user/register', method: 'post', data })

// 获取首页10条随机视频数据
export const geRandomData = () => request({ url: '/movie/geRandomData/10', method: 'get' })

// 获取所以作者列表
export const getAuthorList = () => request({ url: '/movie/getAllAuthor', method: 'get' })

// 获取作者分页视频列表数据
export const getAuthorWorksList = params => request({ url: '/movie/getAuthor', method: 'get', params })

// 获取用户作者页喜欢列表
export const getAuthorLike = params => request({ url: '/contact/getUserLike', method: 'get', params })

// 获取用户作者页喜欢列表
export const getAuthorCollected = params => request({ url: '/contact/getUserCollected', method: 'get', params })

// 获取用户观看历史记录信息
export const getUserVideoHistory = params => request({ url: '/contact/getUserVideoHistory', method: 'get', params })

// 获取单个作者详细信息
export const getSignalAuthorInfo = (author, params) => request({ url: `/contact/getSignalAuthor/${author}`, method: 'get', params })

// 获取用户详细信息
export const getUserInfo = params => request({ url: '/contact/getUserInfo', method: 'get', params })

// 获取用户收藏列表
export const getUserCollected = params => request({ url: '/contact/getUserCollected', method: 'get', params })

// 获取用户喜欢列表
export const getUserLike = params => request({ url: '/contact/getUserLike', method: 'get', params })

// 获取弹幕分页数据
export const getCommentData = params => request({ url: '/comment/getComment', method: 'get', params })

// 修改视频喜欢状态
export const updateVideoLike = data => request({ url: '/contact/setVideoLike', method: 'post', data })

// 修改视频收藏状态
export const updateVideoCollected = data => request({ url: '/contact/setVideoCollected', method: 'post', data })

// 所以总共播放量统计
export const updateVideoPlayAllNum = data => request({ url: '/movie/updatePlayNum', method: 'put', data })

// 统计用户当前视频播放量
export const updateUserVideoData = data => request({ url: '/contact/updateUserVideoData', method: 'post', data })
