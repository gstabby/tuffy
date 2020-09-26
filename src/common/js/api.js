const ip = 'http://192.168.31.250'

const ws = ip + '/ws/endpointChat' // websocket连接

const wstopic = ip + '/topic/chat' // websocket连接

const wssend = 'ws://192.168.31.229:80' + '/ws/chat' // websocket连接

const LOGIN = ip + '/login' // 登陆接口

const REGIST = ip + '/user/register' // 注册接口

const ISEXPIRED = ip + '/isTokenExpired' // 判断token是否失效

const ISEXISTUSER = ip + '/user/isExistUserName' // 是否存在用户名

const SENDEMAIL = ip + '/user/getCode' // 发送验证码

const GETALLUSERS = ip + '/user/getAllUserAndRole' // 获取所有的用户信息

const GETALLBLOG = ip + '/blog/all' // 获取所有博客

const GETBLOGBYLIKE = ip + '/blog/getByLike' // 搜索博客

const GETBLOG = ip + '/blogs' // 根据页码获取所有博客

const GETTYPE = ip + '/category/all' // 获取所有类型

const GETTAGS = ip + '/tag/all' // 获取所有标签

const GETBLOGBYTYPE = ip + '/blog/getByCategory' // 根据类型获取博客

const GETBLOGBYTAG = ip + '/blog/getByTag' // 根据标签获取博客

const GETBLOGBYID = ip + '/blog/getById' // 根据ID获取博客内容

const GETBLOGBYYEAR = ip + '/blog/getAllGroupByYear' // 根据年份分组博客

const ADDBLOG = ip + '/blog/save' // 新增博客

const ADDTYPE = ip + '/category/saveOrUpdate' // 新增类型或者修改类型

const ADDTAG = ip + '/tag/saveOrUpdate' // 新增标签或者修改标签

const DELTYPE = ip + '/category/delete' // 删除类型

const DELTAG = ip + '/tag/delete' // 删除标签

const DELBLOG = ip + '/blog/delete' // 删除博客

const BLOGREADCOUNT = ip + '/blog/read' // 模拟阅读量+1

const GETBLOGCOMMENT = ip + '/comment/getCommentByBlog' // 通过博客ID获取评论

const COMMENT = ip + '/comment/add' // 添加评论

const GETMSG = ip + '/comment/getByIsRead' // 获取该用户的消息队列

const READMSG = ip + '/comment/read' // 将博客的未读信息转为已读

const UPDATEUSER = ip + '/user/updateUser' // 修改个人信息

const UPDATEPASSWORD = ip + '/user/updatePassword' // 修改密码

const GETUSERBYEMAIL = ip + '/user/getUsernameByEmail' // 获取邮箱下的用户列表

const FORGETPASSWORD = ip + '/user/forgetPassword' // 忘记密码

export default {
  LOGIN: LOGIN,
  REGIST: REGIST,
  GETBLOG: GETBLOG,
  GETTYPE: GETTYPE,
  GETTAGS: GETTAGS,
  GETBLOGBYTYPE: GETBLOGBYTYPE,
  GETBLOGBYTAG: GETBLOGBYTAG,
  GETBLOGBYID: GETBLOGBYID,
  ADDBLOG: ADDBLOG,
  GETALLBLOG: GETALLBLOG,
  GETBLOGBYYEAR: GETBLOGBYYEAR,
  ADDTYPE: ADDTYPE,
  ADDTAG: ADDTAG,
  DELTYPE: DELTYPE,
  DELTAG: DELTAG,
  DELBLOG: DELBLOG,
  BLOGREADCOUNT: BLOGREADCOUNT,
  GETALLUSERS: GETALLUSERS,
  GETBLOGCOMMENT: GETBLOGCOMMENT,
  COMMENT: COMMENT,
  SENDEMAIL: SENDEMAIL,
  ISEXISTUSER: ISEXISTUSER,
  GETMSG: GETMSG,
  READMSG: READMSG,
  UPDATEUSER: UPDATEUSER,
  GETUSERBYEMAIL: GETUSERBYEMAIL,
  FORGETPASSWORD: FORGETPASSWORD,
  UPDATEPASSWORD: UPDATEPASSWORD,
  GETBLOGBYLIKE: GETBLOGBYLIKE,
  ISEXPIRED: ISEXPIRED,
  ws: ws,
  wstopic: wstopic,
  wssend: wssend
}
