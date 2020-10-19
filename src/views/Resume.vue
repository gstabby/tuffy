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
- 期望薪资：10K
- 个人网站：http://tuffy.viphk.ngrok.org/
- github：https://github.com/gstabby

### 专业技能

---

- 熟悉掌握HTML5/CSS3等网页制作技术。
- 熟悉**ES5，ES6**新特性。
- 了解**TCP/IP协议**，**HTTP协议**，**浏览器缓存**等知识。
- 熟练使用**Vue全家桶，Vue，Vue-Router，Vuex，Vue生命周期**等。
- 了解uniapp开发，能够使用HBuilderX开发小程序。
- 了解Nginx，能够通过Nginx进行前端项目部署。

### 教育经历

---

- 学校：湖南工商大学 | 2015-2019 | 本科
- 专业：计算机科学与技术

### 个人总结

---

- **1年Vue开发经验。**
- 熟悉常用的**CSS布局**，有一定的CSS动画制作能力，熟悉使用less。
- 具有一定的项目规划架构能力，能够独立完成前端项目，有个人建站能力，了解网站前端优化。
- 编程习惯良好，所有项目都使用**Eslint**进行格式规范。

### 工作经历

---

**利元亨智能装备股份有限公司 | 2019年7月-2020年5月 | 前端开发工程师**

公司简介：公司主要服务于新能源，汽车零部件，精密电子，轨道交通等相关企业，提供整体工厂自动化解决方案。

本人主要工作：一是负责公司内部办公信息化的前端工作，二是协助开发公司相关产品的数据看板。

主要参与项目：

- **宿舍预约系统**


- 项目描述：此项目解决了公司员工出差远程预约住宿，宿舍长统一管理住宿，负责人审批宿舍预订等一系列员工住宿相关问题。

- 开发内容：

  **1、员工预约界面开发**

  **2、负责人审批界面开发**

  **3、地区，宿舍，项目和合同的管理界面开发**

  **4、手机操作界面开发**

- 开发流程：整体项目使用Vue框架编写，首先对UI设计的PSD图进行切片，完成界面的代码编写，模拟用户操作，通过Vue-Router实现合理的页面跳转以及权限管理。

- 工作成果：系统经历了两次UI更新，已投入使用了一段时间。此项目主要积累了vue框架的使用经验，UI图的页面还原以及界面对于手机端的自适应能力。

- **2007（代号）数据看板**

- 项目描述：该项目主要用于展示工作车间整体运行情况，主要包括机位状态，报警系统，生产结果统计等。

- 开发内容：

  **1、项目前端负责人**，完成整个看板的前端项目架构以及使用的组件选型和前后端数据交互的api文档。

  **2、多个看板的界面开发**，整个项目包含多个看板，根据UI设计图实现1920×1080和1366×768两种分辨率下的适配。

  **3、使用Echarts组件完成看板图表开发**，项目中多处使用Echarts组件实现折线图，饼图等。

  **4、融入CSS动画**，主要是在仓位状态的切换以及图表切换等地方加入CSS动画，实现过渡平滑。

- 工作成果：该项目已交付于客户，并已经在工厂机位上使用。该项目进一步加强样式编写，对于vue组件化和项目总体设计能力。

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
