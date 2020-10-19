<template>
  <div class="blog">
    <div class="container" v-if="isShow">
      <div class="row">
        <div class="col-lg-12">
          <div class="box intro_box">
            <div class="header_box">
              <header class="box_title f-17">
                <strong>
                  <v-icon>{{ svgUser }}</v-icon>
                  用户信息
                </strong>
              </header>
            </div>
            <div class="alert alert-primary" role="alert">
              此处查看您的个人信息，如需修改请先点击用户名栏右侧修改按钮，再输入信息，邮箱修改需要输入有效的邮箱，并输入有效的验证码才可以修改，如果无法正常显示个人信息，请尝试重新登录
            </div>
            <div class="alert alert-warning alert-dismissible fade show" v-show="tipDia">
              <strong>{{ tip }}</strong>
              <button type="button" class="close" @click="closeTip">
                <span>&times;</span>
              </button>
            </div>
            <form class="info_form">
              <div class="input-group mb-3">
                <input type="text" class="form-control" disabled v-model="userText">
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">注册时间</span>
                </div>
                <input type="text" class="form-control" disabled v-model="userCreated">
              </div>
              <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="用户名" aria-describedby="button-addon2" :disabled="updateLock" v-model="formUser.username" maxlength="20">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="canUpdate">修改</button>
                </div>
              </div>
              <div class="input-group mb-3">
                <input type="email" class="form-control" placeholder="邮箱" aria-describedby="button-addon2" :disabled="updateLock" v-model="formUser.email" @keyup="checkEmail">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button" :disabled="validEmail" @click="sendEmail">发送验证码</button>
                </div>
              </div>
              <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="验证码" aria-describedby="button-addon2" v-model="formUser.code" :disabled="codeLock" maxlength="4">
              </div>
              <button type="button" class="btn btn-outline-primary" style="float: right;" :disabled="updateLock" @click="updateUser">提交修改信息</button>
              <div class="clear-fix"></div>
            </form>
          </div>
        </div>
        <div class="col-lg-12">
          <div class="box intro_box">
            <div class="header_box">
              <header class="box_title f-17">
                <strong>
                  <v-icon>{{ svgPwd }}</v-icon>
                  修改密码
                </strong>
              </header>
            </div>
            <div class="alert alert-primary" role="alert">
              如需修改密码需先点击旧密码栏右侧的修改按钮
            </div>
            <div class="alert alert-warning alert-dismissible fade show" v-show="tipDiaPwd">
              <strong>{{ tipPwd }}</strong>
              <button type="button" class="close" @click="closeTipPwd">
                <span>&times;</span>
              </button>
            </div>
            <form class="info_form">
              <div class="input-group mb-3">
                <input type="password" class="form-control" placeholder="旧密码" aria-describedby="button-addon2" :disabled="updatePwdLock" v-model="formUpdPwd.oldPassword" maxlength="20">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button" @click="canUpdatePwd">修改</button>
                </div>
              </div>
              <div class="input-group mb-3">
                <input type="password" class="form-control" placeholder="新密码" aria-describedby="button-addon2" :disabled="updatePwdLock" v-model="formUpdPwd.newPassword" maxlength="20">
              </div>
              <div class="input-group mb-3">
                <input type="password" class="form-control" placeholder="确认密码" aria-describedby="button-addon2" :disabled="updatePwdLock" v-model="surePassword" maxlength="20">
              </div>
              <button type="button" class="btn btn-outline-primary" style="float: right;" :disabled="updatePwdLock" @click="updatePassword">修改密码</button>
              <div class="clear-fix"></div>
            </form>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="box intro_box">
            <div class="header_box">
              <header class="box_title f-17">
                <strong>
                  <v-icon>{{ svgUnRead }}</v-icon>
                  未读信息
                </strong>
              </header>
            </div>
            <div class="list-group" v-if="msgUnReadArr.length==0">
              <div href="#" class="list-group-item list-group-item-action">
                <small>您暂时没有未读信息</small>
              </div>
            </div>
            <div class="list-group" v-if="msgUnReadArr.length!=0">
              <div href="#" class="list-group-item list-group-item-action" v-for="msg in msgUnReadArr" :key="msg.id" @click="toBlog(msg.b_id)">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1" style="width: 60%;"><b>{{ msg.blogTitle }}</b></h5>
                  <small style="color: grey;">{{ msg.time }}</small>
                </div>
                <p class="mb-1 recall_content">“{{ msg.content }}”</p>
                <small style="color: grey;">回复者：{{ msg.targetName }}</small>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="box intro_box">
            <div class="header_box">
              <header class="box_title f-17">
                <strong>
                  <v-icon>{{ svgRead }}</v-icon>
                  已读信息
                </strong>
              </header>
            </div>
            <div class="list-group" v-if="msgReadArr.length==0">
              <div href="#" class="list-group-item list-group-item-action">
                <small>您暂时没有已读信息</small>
              </div>
            </div>
            <div class="list-group" v-if="msgReadArr.length!=0">
              <div href="#" class="list-group-item list-group-item-action" v-for="msg in msgReadArr" :key="msg.id" @click="toBlog(msg.b_id)">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1" style="width: 60%;"><b>{{ msg.blogTitle }}</b></h5>
                  <small style="color: grey;">{{ msg.time }}</small>
                </div>
                <p class="mb-1 recall_content">“{{ msg.content }}”</p>
                <small style="color: grey;">回复者：{{ msg.targetName }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer" v-if="isShow">
      <p class="footer_text f-14">
        Copyright © 2020 <span class="footer_link">Tuffy</span>. Powered by SpringBoot<br>
        <!-- <span class="footer_link">粤ICP备17114114号-3</span> | <span class="footer_link">Sitemap</span> | <span class="footer_link">站长统计</span> | 网站已在线423天 -->
      </p>
    </div>
  </div>
</template>

<script>
import {
  mdiAccountOutline,
  mdiMessageTextOutline,
  mdiMessageTextLockOutline,
  mdiLockReset
} from '@mdi/js'
import api from '../common/js/api'
export default {
  data: () => ({
    svgUser: mdiAccountOutline,
    svgUnRead: mdiMessageTextLockOutline,
    svgRead: mdiMessageTextOutline,
    svgPwd: mdiLockReset,
    times: [],
    isShow: false,
    userText: 'Hello ' + localStorage.getItem('user') + '，您是本站第' + localStorage.getItem('userId') + '号会员',
    userCreated: '',
    updateLock: true,
    updatePwdLock: true,
    codeLock: true,
    formUser: {
      username: localStorage.getItem('user'),
      email: localStorage.getItem('email')
    },
    formUpdPwd: {},
    surePassword: '',
    validEmail: true,
    created: localStorage.getItem('created'),
    msgReadArr: [],
    msgUnReadArr: [],
    tip: '',
    tipDia: false,
    tipPwd: '',
    tipDiaPwd: false
  }),
  mounted () {
    this.axios.get(api.GETBLOGBYYEAR)
      .then(res => {
        this.times = res.data.data
        this.isShow = true
      })
    this.getReadMsg()
    this.getUnReadMsg()
    const timeY = localStorage.getItem('created').split('T')[0]
    const timeD = localStorage.getItem('created').split('T')[1]
    this.userCreated = timeY + ' ' + timeD
  },
  methods: {
    toLookBlog (id) {
      this.$router.push({
        path: '/blog/content',
        query: {
          id: id
        }
      })
    },
    getReadMsg () {
      this.axios.get(api.GETMSG, {
        params: {
          isRead: true
        }
      }).then(res => {
        this.msgReadArr = res.data.data
      })
    },
    getUnReadMsg () {
      this.axios.get(api.GETMSG, {
        params: {
          isRead: false
        }
      }).then(res => {
        this.msgUnReadArr = res.data.data
      })
    },
    toBlog (id) {
      this.$router.push({
        path: '/blog/content',
        query: {
          id: id
        }
      })
    },
    canUpdate () {
      this.updateLock = !this.updateLock
    },
    canUpdatePwd () {
      this.updatePwdLock = !this.updatePwdLock
    },
    sendEmail () {
      this.tip = '发送中...'
      this.tipDia = true
      this.axios.get(api.SENDEMAIL, {
        params: {
          email: this.formUser.email
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.tip = '发送成功，该验证码五分钟内有效，请不要重复'
          this.tipDia = true
          this.codeLock = false
        } else {
          this.tip = res.data.msg
          this.tipDia = true
        }
      }).catch(error => {
        if (error) {
          this.tip = '发送失败，请尝试一分钟后发送'
          this.tipDia = true
        }
      })
    },
    checkEmail () {
      if (this.formUser.email.search(/^[^\s]+@[^\s]+\.[^\s]+$/) !== -1) {
        this.validEmail = false
      } else {
        this.validEmail = true
      }
    },
    updateUser () {
      this.axios.post(api.UPDATEUSER, this.qs.stringify({
        code: this.formUser.code,
        email: this.formUser.email,
        username: this.formUser.username
      })).then(res => {
        if (res.data.code === 200) {
          this.tip = '修改成功，请重新登录'
          this.tipDia = true
          this.updateLock = true
          this.$router.push({
            path: '/login',
            query: {
              username: this.formUser.username
            }
          })
          localStorage.clear()
        } else {
          this.tip = res.data.msg
          this.tipDia = true
        }
      }).catch(error => {
        if (error) {
          this.tip = '您的登录失效或者如果没有修改邮箱，请不要输入验证码'
          this.tipDia = true
          console.log(error)
        }
      })
    },
    updatePassword () {
      if (this.surePassword === '' || this.formUpdPwd.newPassword === '' || this.formUpdPwd.newPassword === null || this.formUpdPwd.oldPassword === '' || this.formUpdPwd.oldPassword === null) {
        this.tipPwd = '每一项都必须填写'
        this.tipDiaPwd = true
      } else {
        if (this.formUpdPwd.newPassword === this.surePassword) {
          this.axios.post(api.UPDATEPASSWORD, this.qs.stringify({
            newPassword: this.formUpdPwd.newPassword,
            oldPassword: this.formUpdPwd.oldPassword
          })).then(res => {
            if (res.data.code === 200) {
              this.tipPwd = '修改成功，请重新登录'
              this.tipDiaPwd = true
              this.updatePwdLock = true
              this.$router.push({
                path: '/login',
                query: {
                  username: this.formUser.username
                }
              })
              localStorage.clear()
            } else {
              this.tipPwd = res.data.msg
              this.tipDiaPwd = true
            }
          }).catch(error => {
            if (error) {
              console.log(error)
            }
          })
        } else {
          this.tipPwd = '您两次输入的密码不一样'
          this.tipDiaPwd = true
        }
      }
    },
    closeTip () {
      this.tipDia = false
    },
    closeTipPwd () {
      this.tipDiaPwd = false
    }
  }
}
</script>

<style scoped>
.blog {
  background: #F4F4F4;
}
.container {
  min-height: calc(100vh - 56px - 100px);
}
.row {
  text-align: center;
  float: none;
  margin: 0 auto;
  animation: comeon .5s linear;
}
@keyframes comeon {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.box {
  box-sizing: border-box;
  width: 100%;
  background: white;
  /* margin-bottom: 20px; */
  padding: 10px;
}
.box_title {
  margin: 0 auto;
  width: 98%;
  font-weight: bold;
  text-align: left;
  border-bottom: 2px solid #F0F0F0;
}
strong {
  padding-bottom: 8px;
  border-bottom: 2px solid #83D6F1;
}
.header_box {
  line-height: 37px;
  margin-bottom: 20px;
}
.alert {
  margin: 0 auto 15px auto;
  width: 98%;
  text-align: left;
}
.info_form {
  text-align: left;
  margin: 0 auto;
  width: 98%;
}
.list-group {
  text-align: left;
}
.list-group-item {
  cursor: pointer;
}
.recall_content {
  width: 100%;
  word-break: break-all;
}
.footer {
  width: 100%;
  height: 100px;
  background: #1C1F21;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #acacac;
}
.footer_link:hover {
  color: white;
}
.footer_text {
  margin-top: 1rem;
}
@media screen and (max-width: 768px) {
  strong {
    padding-bottom: 9px;
  }
}
</style>
