<template>
  <div class="blog" v-if="isComplete">
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <div class="box intro_box" v-if="isNoFirst">
            <div class="header_box clear-fix">
              <header class="box_title f-17"><strong>{{ tagOrType }}: {{ typeNow.title }}</strong>
                <span class="artical_total f-17">共 {{ totalNow }} 篇</span>
              </header>
            </div>
            <div class="content_box">
              <p class="content_p f-16">{{ typeNow.description }}</p>
            </div>
          </div>
          <div class="box intro_box" v-if="!isNoFirst">
            <div class="header_box clear-fix">
              <header class="box_title f-17">
                <strong>
                  <v-icon style="color: #279fc7;">{{ svgVoice }}</v-icon>
                  站长的话
                </strong>
              </header>
            </div>
            <div class="content_box">
              <p class="content_p f-16">欢迎大家评阅我的博客，这里有我对生活的看法，也有对理论的学习，有我对编程的思考，也有对问题的探索，如果您也有想对我说的话，欢迎登陆留言，登陆后还可以参与本站的小游戏排名活动哦
              </p>
            </div>
          </div>
          <div class="box blog_box f-16 media mb-1 mb-sm-2 p-2 p-lg-3" v-for="blog in blogs" :key="blog.id" @click="toLookBlog(blog.id)">
            <div class="blog_imgbox align-self-center mr-2 mr-lg-3 w-25 modal-open">
              <img :src="apiIp + '/image/' + blog.path" alt="博客图片" class="blog_img w-100 article-img">
            </div>
            <div class="blog_contentbox media-body align-self-center">
              <p class="blog_author text-muted mb-2 f-12">By <b>{{ blog.user.username }}</b> at <b>{{ blog.created }}</b></p>
              <h3 class="blog_title mt-0 font-weight-bold text-info f-17">{{ blog.title }}</h3>
              <p class="blog_content mb-2 f-15">{{ blog.description }}</p>
              <p class="blog_type mb-2 f-12">
                <v-icon style="color: #b1afaf;">{{ svgBook }}</v-icon> {{ blog.category.title }}
                <v-icon style="color: #b1afaf;">{{ svgTag }}</v-icon> <span v-for="tag in blog.tags" :key="tag.id">"{{ tag.name }}</span>
              </p>
            </div>
          </div>
          <div class="page_box" v-if="!isNoFirst">
            <v-app>
              <v-pagination
                v-model="page"
                :length="pages"
                light
              ></v-pagination>
            </v-app>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="box tools_box">
            <div class="header_box clear-fix">
              <header class="box_title f-17">
                <strong style="border-bottom: 2px solid #ED8A23;color: #ED8A23;">
                  <v-icon style="color: #ED8A23;">{{ svgSpace }}</v-icon>
                  游戏空间
                </strong>
              </header>
              <div class="game_space f-14">
                <div class="game_box game1" @click="toGame">
                  <img src="../assets/eye.svg" alt="洞察力" class="game_img">
                  <p class="game_text">洞察力</p>
                </div>
                <div class="game_box game2" @click="toGame">
                  <img src="../assets/watch.svg" alt="记忆力" class="game_img">
                  <p class="game_text">记忆力</p>
                </div>
                <div class="game_box game3" @click="toGame">
                  <img src="../assets/lightning.svg" alt="反应力" class="game_img">
                  <p class="game_text">反应力</p>
                </div>
              </div>
            </div>
          </div>
          <div class="box search_box">
            <div class="header_box clear-fix">
              <header class="box_title f-17">
                <strong>
                  <v-icon>{{ svgSearch }}</v-icon>
                  文章搜索
                </strong>
              </header>
              <form class="info_form">
                <div class="input-group mb-3">
                  <input type="text" class="form-control" placeholder="搜索博客" v-model="searchText">
                  <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="search">🔍</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="box type_box">
            <div class="header_box clear-fix">
              <header class="box_title f-17">
                <strong>
                  <v-icon>{{ svgBook }}</v-icon>
                  文章分类
                </strong>
              </header>
            </div>
            <div class="content_box">
              <ul class="type_ul">
                <li class="type_li f-16" v-for="type in types" :key="type.id" :style="chooseLi(type.id)" @click="exchangeType(type.id)">
                  {{ type.title }}<span class="type_count" :style="chooseSpan(type.id)">{{ type.blogNum }}</span>
                </li>
                <li class="type_li f-16" @click="getAll()">
                  全部<span class="type_count">{{ totalAll }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="box tag_box">
            <div class="header_box clear-fix">
              <header class="box_title f-17">
                <strong>
                  <v-icon>{{ svgCloud }}</v-icon>
                  标签云图
                </strong>
              </header>
              <div class="tag_cloud f-16">
                <a class="tag_a" v-for="tag in tags" :key="tag.id" :id="tagType()" @click="exchangeTag(tag.id)">{{ tag.name }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
  mdiGamepadSquareOutline,
  mdiPaperclip,
  mdiTagMultipleOutline,
  mdiCloudOutline,
  mdiStickerEmoji,
  mdiBookSearchOutline
} from '@mdi/js'
import api from '../common/js/api'
export default {
  data: () => ({
    svgSpace: mdiGamepadSquareOutline,
    svgTag: mdiTagMultipleOutline,
    svgBook: mdiPaperclip,
    svgCloud: mdiCloudOutline,
    svgVoice: mdiStickerEmoji,
    svgSearch: mdiBookSearchOutline,
    typeNow: {},
    blogs: [],
    types: [],
    tags: [],
    searchText: '',
    isNoFirst: false,
    totalNow: '',
    tagOrType: '文章分类',
    chooseType: false,
    totalAll: '',
    page: 1,
    pages: 1,
    isComplete: false,
    apiIp: api.ip
  }),
  mounted () {
    this.axios.get(api.GETTYPE)
      .then(res => {
        this.types = res.data.data
      })
    this.axios.get(api.GETTAGS)
      .then(res => {
        this.tags = res.data.data
      })
    if (this.$route.query.tagId) {
      this.exchangeTag(this.$route.query.tagId)
    } else if (this.$route.query.typeId) {
      this.exchangeType(this.$route.query.typeId)
    } else {
      this.axios.get(api.GETBLOG, {
        parmas: {
          current: 1
        }
      })
        .then(res => {
          this.blogs = res.data.data.records
          this.totalAll = res.data.data.total
          this.pages = res.data.data.pages
          this.isComplete = true
        })
    }
  },
  watch: {
    page () {
      this.getAllByPage()
    }
  },
  methods: {
    chooseLi (id) {
      if (id === this.typeNow.id && this.chooseType) {
        return 'color: #DB6060;border-bottom: 1px solid #DB6060;'
      }
    },
    chooseSpan (id) {
      if (id === this.typeNow.id && this.chooseType) {
        return 'background: #DB6060;'
      }
    },
    tagType () {
      const id = parseInt(Math.random() * (10 - 0 + 1) + 0, 10)
      return 'tag' + '-' + id
    },
    toLookBlog (id) {
      this.$router.push({
        path: '/blog/content',
        query: {
          id: id
        }
      })
    },
    exchangeType (id) {
      this.axios.get(api.GETBLOGBYTYPE, {
        params: {
          category: id
        }
      }).then(res => {
        this.typeNow = res.data.data.category
        this.blogs = res.data.data.blogs
        this.totalNow = res.data.data.blogs.total
        this.isNoFirst = true
        this.tagOrType = '文章分类'
        this.chooseType = true
        this.isComplete = true
      })
    },
    exchangeTag (id) {
      this.axios.get(api.GETBLOGBYTAG, {
        params: {
          tag: id
        }
      }).then(res => {
        this.typeNow = res.data.data.tag
        this.typeNow.title = res.data.data.tag.name
        this.blogs = res.data.data.blogs
        this.totalNow = res.data.data.blogs.total
        this.isNoFirst = true
        this.tagOrType = '文章标签'
        this.chooseType = false
        this.isComplete = true
      })
    },
    getAll () {
      this.axios.get(api.GETBLOG)
        .then(res => {
          this.isNoFirst = false
          this.typeNow = {}
          this.blogs = res.data.data.records
          this.pages = res.data.data.pages
          this.page = 1
        })
    },
    getAllByPage () {
      this.axios.get(api.GETBLOG, {
        params: {
          current: this.page
        }
      })
        .then(res => {
          this.isNoFirst = false
          this.typeNow = {}
          this.blogs = res.data.data.records
          this.pages = res.data.data.pages
        })
    },
    search () {
      if (this.searchText === '') {
        alert('请输入搜索内容')
      } else {
        this.axios.get(api.GETBLOGBYLIKE, {
          params: {
            key: this.searchText
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.blogs = res.data.data
            this.tagOrType = '当前搜索'
            this.typeNow.title = this.searchText
            this.isNoFirst = true
            this.totalNow = res.data.data.length
            this.typeNow.description = '根据词条 ‘' + this.searchText + '’ 搜索到的博客如下'
            this.chooseType = false
          }
        })
      }
    },
    toGame () {
      window.location.href = 'http://tuffy.viphk.ngrok.org/game/'
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
.artical_total {
  float: right;
  font-weight: normal;
  letter-spacing: 2px;
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
.type_ul {
  margin-top: 10px;
}
.type_li {
  padding: 0 2% 15px 2%;
  margin: 10px 0;
  border-bottom: 1px solid #F0F0F0;
  line-height: 16px;
  transition: all .2s ease;
  cursor: pointer;
}
.type_li:hover {
  color: #279fc7;
  border-bottom: 1px solid #279fc7;
}
.type_li:hover .type_count {
  background: #279fc7;
}
.type_count {
  width: 30px;
  height: 80%;
  background: #b1afaf;
  color: white;
  float: right;
  font-size: 8px;
  font-weight: bold;
  text-align: center;
  border-radius: 3px;
  transition: all .2s ease;
}
.type_li:last-child {
  /* padding-bottom: 0; */
  margin-bottom: -5px;
  /* border: none; */
}
.intro_box {
}
.tools_box {
}
.game_space {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
}
.game_box {
  height: 100px;
  flex: 1;
  position: relative;
}
.game_text {
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  color: #ED8A23;
  text-shadow: #ED8A23 1px 1px;
  cursor: pointer;
}
.game_img {
  width: 80px;
  height: 80px;
  transition: all .1s linear;
}
.blog_box {
  height: 230px;
  cursor: pointer;
  transition: all .5s ease;
}
.blog_box:hover {
  box-shadow: #acacac 0 0 15px;
}
.blog_imgbox {
}
.blog_img {
}
.blog_contentbox {
  text-align: left;
}
.blog_author {

}
.blog_title {
  overflow: hidden;
  text-overflow:ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.blog_content {
  overflow: hidden;
  text-overflow:ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  height: 110px;
}
.blog_type {
  color: #b1afaf;
  float: right;
  margin: 5px 3% 0 0;
}
.page_box {
  height: 50px;
  overflow: hidden;
  background: none;
}
.theme--light.v-application {
  background: none;
}
.info_form {
  margin-top: 20px;
  padding: 10px;
}
.type_box {
}
.tag_box {
}
.tag_cloud {
  width: 100%;
  display: grid;
  overflow: hidden;
  text-align: justify;
  margin: 10px auto auto auto;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
}
.tag_a {
  font-size: 1rem;
  font-weight: 500;
  border-radius: 5px;
  padding: 0 14px;
  cursor: pointer;
  text-align: center;
  box-shadow: 0 3px 5px rgba(0, 0, 0, .12);
  color: #34495e;
  transition: all .5s ease;
}
.tag_a:hover {
  background: linear-gradient(to bottom, #139F56, #4ABE31) !important;
  color: white;
}
#tag-0 {
  background: #F9EBEA;
}
#tag-1 {
  background: #F5EEF8;
}
#tag-2 {
  background: #D5F5E3;
}
#tag-3 {
  background: #E8F8F5;
}
#tag-4 {
  background: #FEF9E7;
}
#tag-5 {
  background: #F8F9F9;
}
#tag-6 {
  background: #82E0AA;
}
#tag-7 {
  background: #D7BDE2;
}
#tag-8 {
  background: #A3E4D7;
}
#tag-9 {
  background: #85C1E9;
}
#tag-10 {
  background: #F8C471;
}
.header_box {
  line-height: 37px;
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
  .tag_cloud {
    /* grid-template-columns: 1fr; */
  }
  .game_text {
    position: absolute;
    bottom: -20px;
  }
}
</style>
