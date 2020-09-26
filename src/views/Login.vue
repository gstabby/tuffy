<template>
  <div class="login">
    <v-app>
      <div class="login_box">
        <v-snackbar
          v-model="snackbar"
          absolute
          style="top: 20%;"
        >
          {{ tip }}

          <template v-slot:action="{ attrs }">
            <v-btn
              color="pink"
              text
              v-bind="attrs"
              @click="snackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
        <v-tabs
          v-model="tab"
          background-color="accent-4"
          color="basil"
          centered
          grow
        >
          <v-tab
            v-for="i in tabs"
            :key="i.id"
          >
            {{ i.name }}
          </v-tab>

          <v-tab-item
          >
            <v-card
              flat
              tile
            >
            <h3 class="login_title">LOGIN</h3>
              <div class="login_info">
                <v-form v-model="validLogin">
                  <v-container class="login_container">
                    <v-text-field
                      v-model="formLogin.username"
                      :rules="userRules"
                      label="用户名"
                      color="cyan darken"
                      required
                      clearable
                      :loading="loading"
                      prepend-inner-icon="mdi-badge-account"
                    >
                    </v-text-field>
                    <v-text-field
                      v-model="formLogin.password"
                      :rules="pwdRules"
                      label="密码"
                      type="password"
                      color="cyan darken"
                      required
                      clearable
                      :loading="loading"
                      prepend-inner-icon="mdi-form-textbox-password"
                    >
                    </v-text-field>
                  </v-container>
                  <v-btn
                    :disabled="!validLogin"
                    color="#6ABADC"
                    class="submit_button"
                    outlined
                    @click="login"
                  >
                    登录
                  </v-btn>
                  <v-btn
                    color="red"
                    class="submit_button forget_button"
                    outlined
                    @click="forgetPwd"
                  >
                    忘记密码？
                  </v-btn>
                </v-form>
              </div>
            </v-card>
          </v-tab-item>
          <v-tab-item
          >
            <v-card
              flat
              tile
            >
            <h3 class="login_title">REGIST</h3>
              <div class="login_info">
                <v-form v-model="validRegist">
                  <v-container class="login_container">
                    <v-text-field
                      v-model="formRegister.username"
                      :rules="userRules"
                      label="用户名"
                      color="cyan darken"
                      required
                      clearable
                      :loading="loading"
                      @blur="isExist"
                      prepend-inner-icon="mdi-badge-account-outline"
                      counter="20"
                      maxlength="20"
                    >
                    </v-text-field>
                    <v-text-field
                      v-model="formRegister.password"
                      :rules="pwdRules"
                      label="密码"
                      type="password"
                      color="cyan darken"
                      required
                      clearable
                      :loading="loading"
                      prepend-inner-icon="mdi-form-textbox-password"
                      counter="20"
                      maxlength="20"
                    >
                    </v-text-field>
                    <v-text-field
                      v-model="surePassword"
                      :rules="pwdInsureRules"
                      label="确认密码"
                      type="password"
                      color="cyan darken"
                      required
                      clearable
                      :loading="loading"
                      prepend-inner-icon="mdi-form-textbox-password"
                      counter="20"
                      maxlength="20"
                    >
                    </v-text-field>
                    <v-text-field
                      v-model="formRegister.email"
                      :rules="emailRules"
                      label="邮箱"
                      type="email"
                      color="cyan darken"
                      required
                      :loading="loading"
                      @keyup="checkEmail"
                      prepend-inner-icon="mdi-email-outline"
                    >
                    </v-text-field>
                    <v-btn
                      :disabled="validEmail"
                      color="#6ABADC"
                      class="submit_button submit_button_send"
                      outlined
                      @click="sendEmail"
                    >
                      点击发送验证码
                    </v-btn>
                    <v-text-field
                      v-model="formRegister.code"
                      :rules="verificationCodeRules"
                      label="验证码"
                      color="cyan darken"
                      required
                      clearable
                      :loading="loading"
                      prepend-inner-icon="mdi-check-decagram"
                      counter="4"
                      maxlength="4"
                    >
                    </v-text-field>
                  </v-container>
                  <v-btn
                    :disabled="!validRegist"
                    color="#6ABADC"
                    class="submit_button submit_button_register"
                    outlined
                    @click="regist"
                  >
                    注册
                  </v-btn>
                </v-form>
              </div>
            </v-card>
          </v-tab-item>
          <v-tab-item
          >
            <v-card
              flat
              tile
            >
            <h3 class="login_title">RESET</h3>
              <div class="login_info">
                <v-form v-model="validReset" v-show="validateFindEmail">
                  <v-container class="find_container">
                    <v-text-field
                      v-model="formReset.email"
                      :rules="emailRules"
                      label="邮箱"
                      color="cyan darken"
                      required
                      :loading="loading"
                      @keyup="checkEmailReset"
                      prepend-inner-icon="mdi-email-outline"
                    >
                    </v-text-field>
                    <v-btn
                      :disabled="validEmailReset"
                      color="#6ABADC"
                      class="submit_button submit_button_send"
                      outlined
                      @click="sendEmailReset"
                    >
                      点击发送验证码
                    </v-btn>
                    <v-text-field
                      v-model="formReset.code"
                      :rules="verificationCodeRules"
                      label="验证码"
                      color="cyan darken"
                      required
                      clearable
                      :loading="loading"
                      prepend-inner-icon="mdi-check-decagram"
                      counter="4"
                      maxlength="4"
                    >
                    </v-text-field>
                  </v-container>
                  <v-btn
                    :disabled="!validReset"
                    color="red"
                    class="submit_button find_button"
                    outlined
                    @click="accountAim"
                  >
                    账户救援
                  </v-btn>
                </v-form>
                <v-form v-show="chooseAccount">
                  <v-container class="choose_container">
                    <v-list one-line outlined dense style="text-align: left;">
                      <v-subheader>请选择您想找回密码的账户</v-subheader>
                      <v-list-item-group>
                        <template v-for="(account) in accounts">
                          <v-list-item :key="account.id" @click="selectAccount(account.username)">
                            <v-list-item-content>
                              <v-list-item-subtitle class="text--primary" v-text="account.username"></v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action>
                              <v-list-item-action-text v-text="account.created"></v-list-item-action-text>
                            </v-list-item-action>
                          </v-list-item>
                          <!-- <v-divider
                            v-if="index + 1 < accounts.length"
                            :key="account.id"
                          ></v-divider> -->
                        </template>
                      </v-list-item-group>
                    </v-list>
                    <v-btn
                      :disabled="!validChoose"
                      color="red"
                      class="submit_button choose_button"
                      outlined
                      @click="choosedAccount"
                    >
                      选择完毕
                    </v-btn>
                  </v-container>
                </v-form>
                <v-form v-model="validUpdatePwd" v-show="resetPwd">
                  <v-container class="reset_container">
                    <v-text-field
                      v-model="formResetPwd.username"
                      label="用户名"
                      color="cyan darken"
                      required
                      clearable
                      :loading="loading"
                      disabled
                      prepend-inner-icon="mdi-badge-account-outline"
                    >
                    </v-text-field>
                    <v-text-field
                      v-model="formResetPwd.password"
                      :rules="pwdRules"
                      label="新的密码"
                      color="cyan darken"
                      required
                      clearable
                      type="password"
                      :loading="loading"
                      prepend-inner-icon="mdi-form-textbox-password"
                      counter="20"
                      maxlength="20"
                    >
                    </v-text-field>
                    <v-text-field
                      v-model="surePassword"
                      :rules="pwdInsureRules"
                      label="确认密码"
                      color="cyan darken"
                      required
                      clearable
                      type="password"
                      :loading="loading"
                      prepend-inner-icon="mdi-form-textbox-password"
                      counter="20"
                      maxlength="20"
                    >
                    </v-text-field>
                  </v-container>
                  <v-btn
                    :disabled="!validUpdatePwd"
                    color="red"
                    class="submit_button find_button"
                    outlined
                    @click="resetPassword"
                  >
                    修改完成
                  </v-btn>
                </v-form>
              </div>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </div>
    </v-app>
  </div>
</template>

<script>
import api from '../common/js/api'
export default {
  data: () => ({
    tab: null,
    loading: false,
    validLogin: false,
    validRegist: false,
    validReset: false,
    validChoose: false,
    validUpdatePwd: false,
    snackbar: false,
    switchMe: false,
    validEmail: true,
    validEmailReset: true,
    validateFindEmail: true,
    chooseAccount: false,
    resetPwd: false,
    tabs: [
      {
        id: 0,
        name: 'login'
      },
      {
        id: 1,
        name: 'regist'
      },
      {
        id: 2,
        name: 'forget password?'
      }
    ],
    tip: '',
    formLogin: {
      username: '',
      password: ''
    },
    formRegister: {
      email: '',
      password: '',
      username: ''
    },
    formReset: {},
    formResetPwd: {},
    surePassword: '',
    accounts: [],
    userRules: [
      v => !!v || 'user is required'
    ],
    pwdRules: [
      v => !!v || 'password is required'
    ],
    pwdInsureRules: [
      v => !!v || 'password insure is required'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    verificationCodeRules: [
      v => !!v || 'verificationCode is required'
    ]
  }),
  created () {
    if (this.$route.query.username) {
      this.formLogin.username = this.$route.query.username
    }
  },
  mounted () {
  },
  computed: {
    progress () {
      return Math.min(100, this.value.length * 10)
    },
    color () {
      return ['error', 'warning', 'success'][Math.floor(this.progress / 40)]
    }
  },
  methods: {
    login () {
      const formData = new FormData()
      for (const key in this.formLogin) {
        formData.append(key, this.formLogin[key])
      }
      this.loading = true
      this.validLogin = false
      this.axios.post(api.LOGIN, formData)
        .then(res => {
          if (res.data.code !== 200) {
            this.formLogin.username = ''
            this.formLogin.password = ''
            this.tip = res.data.msg
            this.snackbar = true
            this.loading = false
            this.validLogin = false
          } else {
            const token = res.headers.authorization
            localStorage.setItem('token', token)
            localStorage.setItem('user', res.data.data.username)
            localStorage.setItem('userId', res.data.data.id)
            localStorage.setItem('created', res.data.data.created)
            localStorage.setItem('email', res.data.data.email)
            localStorage.setItem('avatar', res.data.data.avatar)
            // this.formLogin.username = ''
            // this.formLogin.password = ''
            this.tip = '登陆成功'
            this.snackbar = true
            this.loading = false
            this.validLogin = true
            if (res.data.data.id === 1) {
              this.toManager()
            } else {
              this.toBlog()
            }
          }
        })
        .catch(error => {
          if (error) {
            this.form.username = ''
            this.form.password = ''
            this.tip = '用户名或者密码错误'
            this.snackbar = true
            this.loading = false
            this.validLogin = true
          }
        })
    },
    regist () {
      const formData = new FormData()
      for (const key in this.formRegister) {
        formData.append(key, this.formRegister[key])
      }
      this.loading = true
      this.validRegist = false
      if (this.surePassword === this.formRegister.password) {
        this.axios.post(api.REGIST, formData)
          .then(res => {
            if (res.data.code !== 200) {
              this.tip = res.data.msg
              this.snackbar = true
              this.loading = false
              this.validRegist = false
            } else {
              // this.formLogin.username = ''
              // this.formLogin.password = ''
              this.formLogin.username = this.formRegister.username
              this.formLogin.password = this.formRegister.password
              this.formRegister.username = ''
              this.formRegister.password = ''
              this.formRegister.email = ''
              this.formRegister.code = ''
              this.surePassword = ''
              this.tip = '注册成功'
              this.snackbar = true
              this.loading = false
              this.validEmail = true
              this.validRegist = true
              this.tab = 0
            }
          })
          .catch(error => {
            if (error) {
              this.tip = '验证码错误或者服务器繁忙'
              this.snackbar = true
              this.loading = false
              this.validRegist = true
            }
          })
      } else {
        this.tip = '您两次输入的密码不一样'
        this.snackbar = true
      }
    },
    toManager () {
      this.$router.push({
        path: '/blog/manager'
      })
    },
    toBlog () {
      this.$router.push({
        path: '/blog'
      })
    },
    sendEmail () {
      this.loading = true
      this.axios.get(api.SENDEMAIL, {
        params: {
          email: this.formRegister.email
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.tip = '发送成功，该验证码五分钟内有效，请不要重复发送'
          this.snackbar = true
          this.loading = false
        } else {
          this.tip = res.data.msg
          this.snackbar = true
          this.loading = false
        }
      }).catch(error => {
        if (error) {
          this.tip = '发送失败，请尝试一分钟后发送'
          this.snackbar = true
          this.loading = false
        }
      })
    },
    sendEmailReset () {
      this.loading = true
      this.axios.get(api.SENDEMAIL, {
        params: {
          email: this.formReset.email
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.tip = '发送成功，该验证码五分钟内有效，请不要重复'
          this.snackbar = true
          this.loading = false
        } else {
          this.tip = res.data.msg
          this.snackbar = true
          this.loading = false
        }
      }).catch(error => {
        if (error) {
          this.tip = '发送失败，请尝试一分钟后发送'
          this.snackbar = true
          this.loading = false
        }
      })
    },
    checkEmail () {
      if (this.formRegister.email.search(/^[^\s]+@[^\s]+\.[^\s]+$/) !== -1) {
        this.validEmail = false
      } else {
        this.validEmail = true
      }
    },
    checkEmailReset () {
      if (this.formReset.email.search(/^[^\s]+@[^\s]+\.[^\s]+$/) !== -1) {
        this.validEmailReset = false
      } else {
        this.validEmailReset = true
      }
    },
    isExist () {
      if (this.formRegister.username) {
        this.axios.post(api.ISEXISTUSER, this.qs.stringify({
          userName: this.formRegister.username
        })).then(res => {
          if (res.data.code === 200) {
            this.tip = '用户名未使用，可以注册'
            this.snackbar = true
          } else {
            this.tip = res.data.msg
            this.snackbar = true
          }
        }).catch(error => {
          if (error) {
            console.log(error)
          }
        })
      }
    },
    accountAim () {
      this.axios.get(api.GETUSERBYEMAIL, {
        params: {
          code: this.formReset.code,
          email: this.formReset.email
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.tip = '请点击需要找回密码的账号'
          this.snackbar = true
          this.validateFindEmail = false
          this.chooseAccount = true
          this.formResetPwd.code = this.formReset.code
          this.formReset = {}
          this.accounts = res.data.data
        } else {
          this.tip = res.data.msg
          this.snackbar = true
        }
      }).catch(error => {
        if (error) {
          console.log(error)
        }
      })
    },
    choosedAccount () {
      this.chooseAccount = false
      this.resetPwd = true
    },
    resetPassword () {
      if (this.surePassword === this.formResetPwd.password) {
        this.axios.post(api.FORGETPASSWORD, this.qs.stringify({
          code: this.formResetPwd.code,
          newPassword: this.formResetPwd.password,
          username: this.formResetPwd.username
        })).then(res => {
          if (res.data.code === 200) {
            this.tip = '找回密码成功'
            this.snackbar = true
            this.tab = 0
            this.resetPwd = false
            this.validateFindEmail = true
            this.formResetPwd = {}
            this.surePassword = ''
            this.validEmailReset = true
          } else {
            this.tip = res.data.msg
            this.snackbar = true
          }
        }).catch(error => {
          if (error) {
            console.log(error)
          }
        })
      } else {
        this.tip = '您两次输入的密码不一样'
        this.snackbar = true
      }
    },
    forgetPwd () {
      this.tab = 2
    },
    selectAccount (username) {
      this.validChoose = true
      this.formResetPwd.username = username
    }
  }
}
</script>

<style scoped>
.login {
  position: relative;
  /* width: 50vh;
  height: 50vh;
  position: absolute;
  left: 50% !important;
  top: 50% !important;
  transform: translate(-50%, 50%) !important;
  text-align: center;
  animation: comeon .8s linear;
  animation-fill-mode: forwards;
  overflow: hidden; */
}
.login_box {
  margin: 0 auto;
  text-align: center;
  animation: comeon .8s linear;
  animation-fill-mode: forwards;
}
@keyframes comeon {
  from {
    opacity: 0;
    transform: translateY(10%);
  }
  to {
    opacity: 1;
    transform: translateY(0%);
  }
}
.login_title {
  margin-top: 20px;
  font-size: 100px;
  font-weight: lighter;
  color: rgba(0, 0, 0, 0.87);
}
.login_container {
  width: 400px;
  height: 200px;
}
.find_container {
  width: 400px;
  height: 200px;
}
.choose_container {
  width: 400px;
}
.submit_button {
  width: 160px;
}
.forget_button {
  margin-left: 20px;
}
.submit_button_register {
  margin-top: 200px;
}
.submit_button_send {
  width: 100%;
}
.choose_button {
  margin-top: 20px;
}
@media screen and (max-width: 1000px) {
  .login_title {
    font-size: 70px;
  }
  .submit_button {
    width: 120px;
  }
  .submit_button_send {
    width: 100%;
  }
}
</style>
