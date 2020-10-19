<template>
  <div class="blog">
    <div class="container">
      <div class="row">
        <!-- <div class="col-lg-12">
          <div class="box intro_box">
          </div>
        </div> -->
        <div class="col-lg-12">
          <div class="box intro_box">
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
              <div class="blog_markdown" v-html="compileMarkDown(resume)"></div>
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
import showdown from 'showdown'
const converter = new showdown.Converter()
converter.setOption('tables', true)
export default {
  data: () => ({
    resume: `### 个人信息

---

- 姓名：葛晟
- 电话：18684698316
- 邮箱：gstabby@163.com
- 个人简介：男 | 98年 | 本科 | 长沙 | 离职 | 1年前端开发经验
- 期望岗位：前端开发工程师
- 个人网站：http://tuffy.viphk.ngrok.org/
- github：https://github.com/gstabby

### 专业技能

---

- 熟悉HTML，了解HTML5语义化。
- 熟悉常用的**CSS布局**和CSS3新属性，有一定的CSS动画制作能力，熟练使用less。
- 熟悉**ES5，ES6，ES7**新特性。
- 熟悉**TCP/IP协议**，**HTTP协议**，**浏览器缓存**等知识。
- 熟练使用**Vue全家桶，包括Vue，Vue-Router，Vuex，Vue生命周期**等。
- 了解uniapp开发，能够使用HBuilderX开发小程序。
- 了解Nginx，能够通过Nginx进行前端项目部署。
- 拥有良好的编程习惯，所有项目均使用**Eslint**进行格式规范。
- 具有一定的项目规划架构能力，能够独立完成前端项目，有个人建站能力，了解网站前端优化。

### 教育经历

---

- 学校：湖南工商大学 | 2015-2019 | 本科
- 专业：计算机科学与技术

### 工作经历

---

**利元亨智能装备股份有限公司 | 2019年7月-2020年5月 | 前端开发工程师**

公司简介：公司主要服务于新能源，汽车零部件，精密电子，轨道交通等相关企业，提供整体工厂自动化解决方案。

本人主要工作：一是负责公司内部信息化办公系统的前端开发，二是协助开发公司相关产品的数据看板。

主要参与项目：

- **宿舍预约系统**

- 项目描述：此项目用于宿舍预约，审批预订，宿舍管理等一系列员工住宿相关事宜。

- 开发重点：

  **1、负责项目架构和页面逻辑**，根据系统需求以及所给的UI图模拟用户操作流程，按照不同模块页面之间的跳转进行前端项目的初步设计。

  **2、UI设计图的还原**，整个项目包含大量页面，利用PSD切图还原UI给出的所有设计图。

  **3、优化用户体验**，在项目中几乎每一个用户操作都提供了反馈，提供了各种操作提示，对于宿舍负责人的审批，利用了轮询实现类QQ的消息红点提示功能。

  **4、使用LESS进行CSS预处理**，由于项目中使用的是UI给出的设计图，并未使用UI组件，因此为了便于样式后期维护，使用了CSS预处理语言LESS。

  **5、手机端自适应**，UI设计师针对手机和电脑作出了不同的设计稿，因此对于手机端的页面代码编写需要注重自适应效果，主要是通过rem，vh，vw等多种单位进行CSS样式编写，布局方式上大多采用弹性布局。

- 工作成果：系统经历了两次UI更新，已投入使用了一段时间。此项目主要积累了Vue框架的使用经验，UI图的页面还原以及界面对于手机端的自适应能力。

- **2007（代号）数据看板**

- 项目描述：该项目主要用于展示工作车间整体运行情况，主要包括机位状态，报警系统，生产结果统计等。

- 开发重点：

  **1、项目前端负责人**，完成整个看板的前端项目架构以及使用的组件选型和前后端数据交互的api文档。

  **2、多个看板的界面开发**，整个项目包含多个看板，根据UI设计图实现1920×1080和1366×768两种分辨率下的适配。

  **3、使用Echarts组件完成看板图表开发**，项目中多处使用Echarts组件实现折线图，饼图等。

  **4、融入CSS动画**，主要是在仓位状态的切换以及图表切换等地方加入CSS动画，实现过渡平滑。

  **5、对看板进行组件化设计**，在不同的看板之间有很多类似的样式设计，因此对看板的不同部分进行了组件化，在最外层看板的页面对后端数据进行统一管理，再通过props传参给各个子组件，组件化也便于后期维护。

- 工作成果：该项目已交付于客户，并已经在工厂机位上使用。该项目进一步加强了页面布局，响应式设计，Vue组件化和项目总体设计能力。

### 开源项目和作品

------

**个人博客系统+小游戏互动网站**
- 项目描述：主要是用于个人博客的发布，拥有博客网站的基本功能，提供用户建楼（评论），用户信息系统，博客管理等功能，小游戏互动网站与个人博客网站共享用户系统，具有聊天室，留言，游戏排名等功能，暂时只有四个小游戏供游玩，小游戏均由个人使用JS编写。
- 技术选型：Vue+Vue-Router+Vuex+Vuetify（游戏）+Bootstrap（博客）
- 项目地址：http://tuffy.viphk.ngrok.org/
- git地址：https://github.com/gstabby/tuffy，https://github.com/gstabby/tuffy_game

### 结语

---

- 感谢您的阅览，希望能与您一起共事。`
  }),
  methods: {
    compileMarkDown (value) {
      return converter.makeHtml(value)
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
.blog_markdown >>> li {
  margin: .1rem 2rem;
  list-style-type: circle !important;
}
</style>
