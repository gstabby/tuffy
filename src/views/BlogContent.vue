<template>
  <div class="blog" v-if="isComplete">
    <div class="modal fade show" aria-labelledby="exampleModalLabel" id="exampleModal" tabindex="-1" :style="isRecallShow()">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">回复框</h5>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label class="col-form-label">您回复的是:</label>
                <input type="text" class="form-control" id="recipient-name" disabled v-model="recallNow.username">
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">回复内容（最多500字）:</label>
                <textarea class="form-control" id="message-text" v-model="recallContent" rows="4" maxlength="500"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeAlert">关闭</button>
            <button type="button" class="btn btn-primary" @click="realRecall">回复</button>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <!-- <div class="col-lg-12">
          <div class="box intro_box">
          </div>
        </div> -->
        <div class="col-lg-12">
          <div class="box intro_box">
            <div class="time_box" style="background: white;">
              <h1 class="blog_title">{{ blog.title }}</h1>
            </div>
            <!-- <div class="header_box clear-fix">
              <header class="box_title f-17">
              <strong>
                <v-icon>{{ svgFile }}</v-icon>
                博客正文
              </strong>
              </header>
            </div> -->
            <div class="time_box" style="background: white;">
              <!-- <h1 class="blog_title">{{ blog.title }}</h1> -->
              <!-- <p class="blog_info">————{{ blog.created }}</p> -->
              <div class="blog_markdown" v-html="compileMarkDown(blog.content)"></div>
              <p class="publisher f-15">
                版权说明：如无特殊说明，本站所有博客均为原创，如需引用请注明出处@tuffy[www.tuffy.com]
              </p>
              <hr style="margin-bottom: 30px;">
              <div class="info_box">
                <v-icon>{{ svgTag }}</v-icon>
                <a class="tag_a f-16" v-for="tag in blog.tags" :key="tag.id" :id="tagType()" @click="toBlogByTag(tag.id)">
                  {{ tag.name }}
                </a>
                <v-icon>{{ svgType }}</v-icon>
                <a class="tag_a category_a f-16" @click="toBlogByType(blog.category.id)">
                  {{ blog.category.title }}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-12">
          <div class="box intro_box">
            <div class="header_box clear-fix">
              <header class="box_title f-17">
              <strong>
                <v-icon>{{ svgComment }}</v-icon>
                评论区
              </strong>
              </header>
            </div>
            <div class="comment_add_box_logined">
              <div class="alert alert-success alert-dismissible" v-show="alertShow">
                {{ tip }}
                <button type="button" class="close" @click="closeAlert">
                  <span>&times;</span>
                </button>
              </div>
              <div class="comment_add">
                <textarea class="form-control f-14" id="exampleFormControlTextarea1" rows="2" maxlength="500" placeholder="请输入评论（限定500字）" v-model="commentContent"></textarea>
              </div>
              <div style="text-align: right;width: 99%;">
                <button type="button" class="btn btn-outline-success btn-sm comment_btn" @click="comment">评论</button>
              </div>
              <div class="comment_mask" v-if="!isLogin">
                <p class="f-17">您尚未登录，请<span @click="toLogin" class="login_regist">登录 / 注册</span>后参与评论</p>
              </div>
            </div>
            <div class="comment_box" v-for="(comment, index) in blogComment" :key="comment.id">
              <div class="comment_img">
                <img
                  :src="'http://192.168.31.250/avatar/' + comment.owner.avatar"
                  class="comment_avatar"
                  width="40"
                  height="40"
                />
              </div>
              <div class="comment_text">
                <p class="comment_info f-18">
                  <span class="comment_name">{{ comment.owner.username }}</span>
                  <span class="comment_time f-14">{{ comment.time }}</span>
                  <span class="comment_recall f-14" @click="recall(comment.owner)">回复</span>
                  <span class="comment_index f-14">{{ index + 1 }}F</span>
                </p>
                <p class="comment_content f-15">
                  <span class="comment_recall_name" v-if="comment.target">@{{ comment.target.username }}</span>
                  {{ comment.content }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <p class="footer_text f-14">
        Copyright © 2020 <span class="footer_link">Tuffy</span>. Powered by SpringBoot<br>
        <span class="footer_link">粤ICP备17114114号-3</span> | <span class="footer_link">Sitemap</span> | <span class="footer_link">站长统计</span> | 网站已在线423天
      </p>
    </div>
  </div>
</template>

<script>
import {
  mdiFileOutline,
  mdiTimetable,
  mdiPaperclip,
  mdiTagMultipleOutline,
  mdiCommentOutline
} from '@mdi/js'
import api from '../common/js/api'
import showdown from 'showdown'
const converter = new showdown.Converter()
converter.setOption('tables', true)
export default {
  data: () => ({
    svgFile: mdiFileOutline,
    svgArrow: mdiTimetable,
    svgComment: mdiCommentOutline,
    svgTag: mdiTagMultipleOutline,
    svgType: mdiPaperclip,
    blog: {},
    blogComment: [],
    isComplete: false,
    commentContent: '',
    isLogin: localStorage.getItem('user'),
    alertShow: false,
    tip: '',
    recallShow: false,
    recallContent: '',
    recallNow: {}
  }),
  created () {
    this.axios.get(api.GETBLOGBYID, {
      params: {
        id: this.$route.query.id
      }
    }).then(res => {
      this.readAddOne(this.$route.query.id)
      this.blog = res.data.data
      this.isComplete = true
      this.getComment()
      this.axios.post(api.READMSG, this.qs.stringify({
        blogId: this.$route.query.id
      }))
    })
  },
  mounted () {
  },
  methods: {
    getComment () {
      this.axios.get(api.GETBLOGCOMMENT, {
        params: {
          bid: this.blog.id
        }
      }).then(res => {
        this.blogComment = res.data.data
        for (const i in this.blogComment) {
          const timeY = this.blogComment[i].time.split('T')[0]
          const timeD = this.blogComment[i].time.split('T')[1]
          this.blogComment[i].time = timeY + ' ' + timeD
        }
      })
    },
    compileMarkDown (value) {
      return converter.makeHtml(value)
    },
    readAddOne (id) {
      this.axios.post(api.BLOGREADCOUNT, this.qs.stringify({
        id: id
      })).then().catch()
    },
    tagType () {
      const id = parseInt(Math.random() * (10 - 0 + 1) + 0, 10)
      return 'tag' + '-' + id
    },
    comment () {
      this.axios.post(api.COMMENT, this.qs.stringify({
        BId: this.blog.id,
        content: this.commentContent
      })).then(res => {
        if (res.data.code === 200) {
          this.commentContent = ''
          this.tip = '评论成功'
          this.alertShow = true
          this.getComment()
        } else {
          this.commentContent = ''
          this.tip = res.data.msg
          this.alertShow = true
        }
      }).catch(error => {
        if (error) {
          this.tip = '您未登录或者输入了非法字符串/空字符串，请重新输入或者重新登录'
          this.commentContent = ''
          this.alertShow = true
        }
      })
    },
    isRecallShow () {
      if (this.recallShow) {
        return 'display: block;'
      } else {
        return 'display: none'
      }
    },
    recall (name) {
      this.recallNow = name
      this.recallShow = true
    },
    realRecall () {
      this.axios.post(api.COMMENT, this.qs.stringify({
        BId: this.blog.id,
        content: this.recallContent,
        CCid: this.recallNow.c_id,
        targeId: this.recallNow.id
      })).then(res => {
        if (res.data.code === 200) {
          this.recallShow = false
          this.recallContent = ''
          this.tip = '回复成功'
          this.alertShow = true
          this.getComment()
        } else {
          this.recallShow = false
          this.recallContent = ''
          this.tip = res.data.msg
          this.alertShow = true
        }
      }).catch(error => {
        if (error) {
          this.recallShow = false
          this.tip = '您未登录或者输入了非法字符串/空字符串，请重新输入或者重新登录'
          this.recallContent = ''
          this.alertShow = true
        }
      })
    },
    closeAlert () {
      this.alertShow = false
      this.recallShow = false
    },
    toLogin () {
      this.$router.push({
        path: '/login'
      })
    },
    toBlogByTag (id) {
      this.$router.push({
        path: '/blog',
        query: {
          tagId: id
        }
      })
    },
    toBlogByType (id) {
      this.$router.push({
        path: '/blog',
        query: {
          typeId: id
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
  margin: 0 auto 20px auto;
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
  margin-bottom: -20px;
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
  margin-bottom: 10px;
}
.time_box {
  padding: 1rem;
}
.blog_title {
  font-weight: bold;
  /* color: rgb(2, 153, 153); */
  color: #1C1F21;
}
.blog_info {
  float: right;
  margin-right: 10px;
}
.blog_markdown {
  text-align: left;
  overflow: hidden;
}
.publisher {
  border-left: 4px solid red;
  text-align: left;
  padding-left: 10px;
  background: #f7f7f7;
  line-height: 50px;
  font-weight: bold;
  margin-top: 15px;
}
@media screen and (max-width: 991px) {
  .publisher {
    border-left: 4px solid red;
    text-align: left;
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    background: #f7f7f7;
    line-height: 25px;
    font-weight: bold;
  }
}
.info_box {
  text-align: right;
}
.tag_a {
  font-weight: 500;
  border-radius: 5px;
  padding: 10px 14px;
  margin: 0 5px;
  cursor: pointer;
  text-align: center;
  box-shadow: 0 3px 5px rgba(0, 0, 0, .12);
  color: #333;
  transition: all .5s ease;
}
.tag_a:first-child {
  margin-left: 0;
}
.tag_a:hover {
  background: linear-gradient(to bottom, #139F56, #4ABE31) !important;
  color: white;
}
.category_a {
  background: white;
  border: 1px solid #F8C471;
  color: #F8C471;
}
.category_a:hover {
  background: #F8C471 !important;
  color: white;
}
@media screen and (max-width: 1200px) {
  .tag_a {
    padding: 8px 10px;
  }
}
@media screen and (max-width: 768px) {
  .tag_a {
    padding: 6px 8px;
  }
}
@media screen and (max-width: 576px) {
  .tag_a {
    padding: 4px 6px;
  }
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
.alert {
  width: 98%;
  margin: 5px auto;
}
.comment_add_box_logined {
  position: relative;
  margin-bottom: 15px;
}
.comment_add {
  width: 98%;
  margin: 0 auto;
  overflow: hidden;
  text-align: left;
}
.comment_btn {
  margin-top: 10px;
  /* float: right; */
}
.comment_mask {
  width: 98%;
  height: 100%;
  position: absolute;
  background: #ccc;
  z-index: 1;
  opacity: .9;
  top: 0;
  left: 1%;
}
.login_regist {
  font-weight: bold;
}
.login_regist:hover {
  text-decoration-line: underline;
}
.comment_box {
  width: 98%;
  padding: 15px 10px;
  text-align: left;
  margin: 0 auto;
  border-top: 1px solid #ccc;
  display: flex;
  flex-direction: row;
  /* border-bottom: 1px solid #ccc; */
}
.comment_img {
  margin-top: 5px;
  margin-right: 10px;
  width: 40px;
}
.comment_avatar {
}
.comment_text {
  flex: 1;
}
.comment_info {
  margin: 0;
}
.comment_name {
  color: grey;
  margin-right: 15px;
  font-weight: bold;
}
.comment_time {
  color: #ccc;
}
.comment_recall {
  margin-left: 15px;
  color: #ccc;
  cursor: pointer;
}
.comment_index {
  color: rgb(90, 90, 90);
  float: right;
  text-align: center;
  text-decoration-line: underline;
}
.comment_recall:hover {
  color: rgb(238, 80, 80);
}
.comment_content {
  margin: 5px 0 -5px 0;
  color: black;
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
}
.comment_recall_name {
  color: grey;
  /* font-weight: bold; */
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
.blog_markdown >>> table {
    padding: 0;
    word-break: initial;
}

.blog_markdown >>> table tr {
    border-top: 1px solid #dfe2e5;
    margin: 0;
    padding: 0;
}
.blog_markdown >>> table tr:nth-child(2n),
thead {
    background-color: #f8f8f8;
}
.blog_markdown >>> table tr th {
    font-weight: bold;
    border: 1px solid #dfe2e5;
    border-bottom: 0;
    margin: 0;
    padding: 6px 13px;
}
.blog_markdown >>> table tr td {
    border: 1px solid #dfe2e5;
    margin: 0;
    padding: 6px 13px;
}
.blog_markdown >>> table tr th:first-child,
table tr td:first-child {
    margin-top: 0;
}
.blog_markdown >>> table tr th:last-child,
table tr td:last-child {
    margin-bottom: 0;
}
.blog_markdown >>> code,
pre {
    font-size: 85%;
    font-family: 'Cascadia Code', Consolas, 'Courier New', monospace;
    font-weight: normal;
    -webkit-font-smoothing: initial;
    -moz-osx-font-smoothing: initial
}

.blog_markdown >>> code {
    font-size: .9em;
    color: #333333; /*  #537AA2;  */
/*    border: 1px solid #d0d0d0;  */
    font-family: 'Cascadia Code', Consolas, 'Courier New', monospace;
    padding: .3em .3em;
    border-radius: 5px;
    background: #F3F4F4; /* #F7F7F7 #F3F4F4 #F5F7FA*/
}

.blog_markdown >>> pre {
    padding: .75rem 1rem;
    line-height: 1.6;
    overflow-wrap: normal;
    border: 1px solid;
    border-color: inherit
}

.blog_markdown >>> pre pre {
    border: 0
}

.blog_markdown >>> pre code {
    background: none;
    margin: 0;
    padding: 0;
    color: inherit
}
.blog_markdown >>> li .mathjax-block, li p {
    margin: .1rem 0;
}
.blog_markdown >>> ul>li>ul>li {
    list-style-type: circle;
}

.blog_markdown >>> ul>li>ul>li>ul>li {
    list-style-type: square;
}

.blog_markdown >>> ol,
ul {
    list-style-type: circle;
    padding-left: 2em;
    line-height: 2;
}

.blog_markdown >>> ol>li {
    list-style-type: decimal
}

.blog_markdown >>> ol>li>ol>li {
    list-style-type: lower-alpha
}

.blog_markdown >>> ol>li>ol>li>ol>li {
    list-style-type: lower-roman
}
.blog_markdown >>> blockquote {
    position: relative;
    margin: 2em 0;
    padding-left: 24px
}
.blog_markdown >>> blockquote:before {
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    bottom: 0;
    background-color: currentColor;
    content: "";
    opacity: .2
}
.blog_markdown >>> ul {
  list-style-type: circle !important;
}
</style>
