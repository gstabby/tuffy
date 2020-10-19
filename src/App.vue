<template>
  <div id="app">
    <v-sheet class="overflow_hidden" style="position: relative;">
      <!-- <div class="head" v-show="!isHome">
        <v-icon @click.stop="drawer = !drawer">{{ svgMenu }}</v-icon>
        <div class="logo_box" @click="toHome">
          <span class="logo_text">Tuffy</span>
        </div>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </div> -->
      <nav class="navbar navbar-expand-lg navbar-light" v-show="!isHome">
        <v-icon @click.stop="drawer = !drawer">{{ svgMenu }}</v-icon>
        <a class="navbar-brand" @click="toHome" style="margin-left: 10px;cursor: pointer;">Tuffy</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" @click="toBlog">博客首页</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="toBlogTime">归档</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="toBlogTimeline">TimeLine</a>
            </li>
            <!-- <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Mode
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">Dark Mode</a>
                <a class="dropdown-item" href="#">禅模式</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item disabled" href="#">Dark：极致护眼</a>
                <a class="dropdown-item disabled" href="#">禅模式：集中一点</a>
              </div>
            </li> -->
            <li class="nav-item" v-if="!isLogin">
              <a class="nav-link" @click="toLogin">登录 / 注册</a>
            </li>
            <li class="nav-item" v-if="isLogin">
              <img
                :src="apiIp + '/avatar/' + avatar"
                class="user_avatar"
                width="40"
                height="40"
              />
            </li>
            <li class="nav-item dropdown" v-if="isLogin">
              <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                hello {{ isLogin }} ! <span v-show="unReadNum!=0" style="font-weight: bold;color: rgb(237, 138, 35);">@{{ unReadNum }}</span>
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" @click="toUser">个人信息</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" @click="destroyLogin" v-if="isLogin">点击注销</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <!-- <v-app> -->
        <router-view></router-view>
      <!-- </v-app> -->

      <v-navigation-drawer class="nav" v-model="drawer" fixed temporary>
        <v-list-item>
            <img class="avator" src="./assets/星系.png">

          <v-list-item-content>
            <v-list-item-title><span class="title">Tuffy's home</span></v-list-item-title>
          </v-list-item-content>

            <!-- <v-icon
              class="menu_drawer"
              @click.stop="menuDrawer = !menuDrawer"
              v-show="!menuDrawer"
            >{{ svgMenu }}</v-icon> -->

            <v-icon
              class="menu_close"
              @click.stop="drawer = !drawer"
            >{{ svgClose }}</v-icon>
        </v-list-item>
        <div class="mid_text menu">
          <div id="part_1">
            <v-list-item-content class="menu_list">
              <v-list-item-title @click="toHome"><span class="title">首页</span></v-list-item-title>
            </v-list-item-content>
            <v-divider id="divider_1"></v-divider>
          </div>
          <div id="part_2">
            <!-- <v-list-item-content class="menu_list">
              <v-list-item-title @click="toProject"><span class="title">项目</span></v-list-item-title>
            </v-list-item-content> -->
            <v-list-item-content class="menu_list">
              <v-list-item-title @click="toResume"><span class="title">个人简历</span></v-list-item-title>
            </v-list-item-content>
            <v-list-item-content class="menu_list">
              <v-list-item-title @click="toGame"><span class="title">小游戏</span></v-list-item-title>
            </v-list-item-content>
            <v-divider id="divider_2"></v-divider>
          </div>
          <div id="part_3">
            <v-list-item-content class="menu_list">
              <v-list-item-title @click="toBlog"><span class="title">随笔</span></v-list-item-title>
            </v-list-item-content>
            <v-divider id="divider_3"></v-divider>
          </div>
        </div>
      </v-navigation-drawer>
    </v-sheet>
  </div>
</template>

<script>
import { mdiTextSubject, mdiClose } from '@mdi/js'
import api from './common/js/api'
export default {
  name: 'App',
  components: {},
  data: () => ({
    svgMenu: mdiTextSubject,
    svgClose: mdiClose,
    drawer: null,
    menuDrawer: null,
    isHome: true,
    welcomeSay: '心情惬意，来看篇博客吧☕',
    avatar: localStorage.getItem('avatar'),
    unReadNum: 0,
    apiIp: api.ip
    // active: true
  }),
  watch: {
    $route (to, from) {
      if (to.path !== '/') {
        this.drawer = false
        this.isHome = false
        this.getUnReadNum()
      } else {
        this.drawer = false
        this.isHome = true
      }
      if (to.path === '/login') {
        this.isHome = true
      } else if (to.path === '/blog/manager') {
        this.isHome = true
      }
      if (to.path === '/404') {
        this.isHome = true
      }
      if (from.path === '/login' && to.path === '/blog') {
        location.reload()
      }
      if (from.path === '/blog/manager' && to.path === '/blog') {
        location.reload()
      }
    }
  },
  computed: {
    isLogin: {
      get: function () {
        return localStorage.getItem('user')
      },
      set: function () {
        if (localStorage.getItem('user')) {
          return localStorage.getItem('user')
        }
      }
    }
  },
  // beforeDestroy () {
  //   localStorage.setItem('token', null)
  // },
  methods: {
    toHome () {
      this.$router.push({
        path: '/'
      })
    },
    toLogin () {
      this.$router.push({
        path: '/login'
      })
    },
    toProject () {
      this.$router.push({
        path: '/project'
      })
      this.drawer = null
    },
    toResume () {
      this.$router.push({
        path: '/resume'
      })
      this.drawer = null
    },
    toGame () {
      window.location.href = 'http://tuffy.viphk.ngrok.org/game/'
    },
    toBlog () {
      this.$router.push({
        path: '/blog'
      })
      this.drawer = null
    },
    toBlogTime () {
      this.$router.push({
        path: '/blog/time'
      })
      this.drawer = null
    },
    toUser () {
      this.$router.push({
        path: '/user'
      })
      this.drawer = null
    },
    toBlogTimeline () {
      this.$router.push({
        path: '/blog/timeline'
      })
      this.drawer = null
    },
    toChatRoom () {
      this.$router.push({
        path: '/chatroom'
      })
      this.drawer = null
    },
    destroyLogin () {
      localStorage.clear()
      location.reload()
    },
    getUnReadNum () {
      if (localStorage.getItem('token')) {
        this.axios.get(api.GETMSG, {
          params: {
            isRead: false
          }
        }).then(res => {
          this.unReadNum = res.data.data.length
        })
      }
    }
    // reload () {
    //   this.active = false
    //   this.$nextTick(function () {
    //     this.active = true
    //   })
    // }
  },
  created () {
    this.getUnReadNum()
    if (localStorage.getItem('token')) {
      this.axios.get(api.ISEXPIRED, {
        params: {
          token: localStorage.getItem('token')
        }
      }).then(res => {
        if (res.data.data === true) {
          localStorage.clear()
        } else {
        }
      })
    }
  }
}
</script>

<style scoped>
.overflow-hidden {
  height: 100vh;
  min-height: 500px;
}
.head {
  height: 64px;
  line-height: 64px;
  padding: 0 25px 0 25px;
  box-shadow: 0px 5px 10px #dddddd;
}
.logo_box {
  margin-left: 10px;
  height: 64px;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
}
.logo_pic {
  width: 49px;
  height: 49px;
  vertical-align: middle;
}
.logo_text {
  font-size: 29px;
  font-weight: 600;
  /* vertical-align: middle; */
}
.search_box {
  float: right;
  width: 300px;
  /* display: inline-block; */
  /* vertical-align: -10px; */
  /* overflow: visible; */
  margin-top: -10px;
  transition: all ease .5s;
}
.nav {
  width: 29vw !important;
  min-width: 372px;
}
.avator {
  width: 40px;
  height: 40px;
  margin: 20px 20px 20px 20px;
}
.nav-link {
  cursor: pointer;
}
.menu_drawer {
  margin-right: 20px;
  color: #47E289 !important;
}
.menu_close {
  margin-right: 20px;
  color: #EDCD42 !important;
}
.mid_text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-45%, -50%);
  line-height: 40px;
  width: 22vw;
  min-width: calc(372px * 22 / 29);
}
.welcome {
}
.welcome_p {
  font-size: 26px;
  font-weight: bold;
}
.menu {
}
.menu_list {
  margin: 15px 0 15px 0;
}
#part_1:hover hr {
  transition: all .5s ease;
  border-color: #FF457A !important;
}
#part_2:hover hr {
  transition: all .5s ease;
  border-color: #EDCD42 !important;
}
#part_3:hover hr {
  transition: all .5s ease;
  border-color: #47E289 !important;
}
.title {
  font-weight: bold;
  font-size: 20px;
}
@media screen and (max-width: 700px) {
  .search_box {
    width: 70px;
  }
}
@media screen and (max-width: 500px) {
  .search_box:hover {
    width: 250px;
  }
  .nav {
    width: 100vw !important;
  }
  .logo_pic {
    width: 10vw;
    height: 10vw;
  }
  .logo_text {
    font-size: 6vw;
  }
}
@media screen and (max-width: 415px) {
  .search_box:hover {
    width: 150px;
  }
}
</style>
