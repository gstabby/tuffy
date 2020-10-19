<template>
  <div class="blog">
    <v-app style="background: #F4F4F4;">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="box timeline_box">
              <div class="header_box clear-fix">
                <header class="box_title f-17">
                <strong>
                  <v-icon>{{ svgTime }}</v-icon>
                  建站日志
                </strong>
                </header>
              </div>
              <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
                <v-timeline-item
                  v-for="(item, i) in daliys"
                  :key="i"
                  :color="item.color"
                  :icon="item.icon"
                  fill-dot
                >
                  <span slot="opposite" class="timeline_year" :style="`color: ` + item.color">{{ item.year }}</span>
                  <v-card
                    :color="item.color"
                    dark
                  >
                    <v-card-title class="title">{{ item.title }}</v-card-title>
                    <v-card-text class="white text--primary f-15" style="padding-top: 25px;">
                      <p v-for="(text, i) in item.texts" :key="i" class="daliy_text">{{ text }}</p>
                      <!-- <v-btn
                        :color="item.color"
                        class="mx-0"
                        outlined
                      >
                        Button
                      </v-btn> -->
                    </v-card-text>
                  </v-card>
                </v-timeline-item>
              </v-timeline>
            </div>
          </div>
        </div>
      </div>
    </v-app>
    <div class="footer">
      <p class="footer_text f-14">
        Copyright © 2020 <span class="footer_link">Tuffy</span>. Powered by SpringBoot<br>
        <!-- <span class="footer_link">粤ICP备17114114号-3</span> | <span class="footer_link">Sitemap</span> | <span class="footer_link">站长统计</span> | 网站已在线423天 -->
      </p>
    </div>
  </div>
</template>

<script>
import {
  mdiTimelineTextOutline
} from '@mdi/js'
// import api from '../common/js/api'
export default {
  data: () => ({
    svgTime: mdiTimelineTextOutline,
    daliys: [
      {
        color: 'purple',
        year: '2020-03-13',
        texts: ['博客主页基本完成', '博客前端主要使用了bootstrap，vuetify组件', '后端使用了springboot', '博客内容由markdown语法书写，由showdown.js转译成html'],
        title: 'Tuffy小站初步完成',
        icon: 'mdi-book-variant'
      },
      {
        color: 'green',
        year: '2020-04-10',
        texts: ['新增用户登录，注册系统', '为下一步博客功能扩展打下基石'],
        title: '新增用户系统',
        icon: 'mdi-account-outline'
      },
      {
        color: 'pink',
        year: '2019-05-30',
        texts: ['评论实现用户评论与博客的绑定', '评论楼层采取无嵌套回复模式'],
        title: '新增评论系统',
        icon: 'mdi-comment-account-outline'
      },
      {
        color: 'grey',
        year: '2020-06-20',
        texts: ['注册以及触及用户敏感信息时需要进行邮箱验证', '新增用户头像', '用户注册时随机生成github头像', '忘记密码流程参考steam账号救援'],
        title: '用户系统新增邮箱验证、头像以及忘记密码功能',
        icon: 'mdi-email-outline'
      },
      {
        color: 'orange',
        year: '2020-07-22',
        texts: ['用户系统拥有个人信息主页', '个人信息主页集成信息展示，修改信息，修改密码'],
        title: '新增用户个人相关信息页面',
        icon: 'mdi-update'
      },
      {
        color: 'red',
        year: '2020-08-12',
        texts: ['消息盒子集成于个人信息页面', '消息提示通过用户在对组件切换的时候，判断是否有新的未读消息来实现'],
        title: '新增用户消息提示以及消息盒子',
        icon: 'mdi-tooltip-plus-outline'
      },
      // {
      //   color: 'blue',
      //   year: '2020-05-12',
      //   texts: ['黑夜/白天模式切换', '禅模式基于vscode禅模式灵感'],
      //   title: '新增网页模式修改',
      //   icon: 'mdi-weather-night'
      // },
      {
        color: 'indigo',
        year: '2020-08-18',
        texts: ['游戏模块独立于项目', '与博客用户系统相关联'],
        title: '新增游戏模块',
        icon: 'mdi-gamepad-square-outline'
      }
    ]
  }),
  mounted () {
  },
  methods: {
    toLookBlog (id) {
      this.$router.push({
        path: '/blog/content',
        query: {
          id: id
        }
      })
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
  margin-bottom: 20px;
  padding: 10px;
}
.timeline_box {
  text-align: left;
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
.daliy_text {
  line-height: 15px;
}
.timeline_year {
  font-size: 20px;
  font-weight: bold;
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
  .blog_content {
    -webkit-line-clamp: 6;
  }
}
</style>
