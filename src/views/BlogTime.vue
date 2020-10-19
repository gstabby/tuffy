<template>
  <div class="blog">
    <div class="container" v-if="isShow">
      <div class="row">
        <div class="col-lg-12">
          <div class="box intro_box">
            <div class="header_box clear-fix">
              <header class="box_title f-17">
              <strong>
                <v-icon>{{ svgTime }}</v-icon>
                博客归档
              </strong>
              </header>
            </div>
            <!-- <div class="content_box">
              <p class="content_p f-16">欢迎大家评阅我的博客，这里有我对生活的看法，也有对理论的学习，有我对编程的思考，也有对问题的探索，如果您也有想对我说的话，欢迎登陆留言，登陆后还可以参与本站的
                <span style="color: #ED8A23;font-weight: bold;cursor: pointer;">小游戏</span>
                排名活动哦
              </p>
            </div> -->
            <div class="time_box" style="background: white;" v-for="time in times" :key="time.index">
              <h1 class="f-27">{{ time.date }}<span style="float: right;"><v-icon class="arrow">{{ svgArrow }}</v-icon></span></h1>
              <hr class="my-4">
              <div class="blog_list">
                <div class="lead f-15" v-for="blog in time.blogs" :key="blog.id" @click="toLookBlog(blog.id)">
                  <p><span style="display: inline-block;max-width: 80%;">{{ blog.title }}</span><span style="float: right;">{{ blog.created }}</span></p>
                </div>
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
  mdiClockOutline,
  mdiTimetable
} from '@mdi/js'
import api from '../common/js/api'
export default {
  data: () => ({
    svgTime: mdiClockOutline,
    svgArrow: mdiTimetable,
    times: [],
    isShow: false
  }),
  mounted () {
    this.axios.get(api.GETBLOGBYYEAR)
      .then(res => {
        this.times = res.data.data
        this.isShow = true
      })
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
.content_box {
  margin: 0 auto;
  width: 98%;
  text-align: left;
}
.content_p {
  margin-top: .5rem;
}
.header_box {
  line-height: 37px;
  margin-bottom: 20px;
}
.time_box {
  padding: 1rem;
  text-align: left;
}
.arrow:hover {
  color: #279fc7;
}
.lead {
  cursor: pointer;
}
.lead:hover {
  color: #279fc7;
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
  .blog_content {
    -webkit-line-clamp: 6;
  }
}
</style>
