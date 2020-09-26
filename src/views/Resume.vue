<template>
  <div class="resume">
    <div class="summary">
      <div class="summary_box">
        <div class="intro">
          <p class="name">葛&nbsp;&nbsp;晟</p>
          <p class="occupaion">前端开发者</p>
          <p class="webpage" @click="toHome">Tuffy's Lair(@tuffy)</p>
          <p>
            <v-icon class="contact_icon">{{ svgEmail }}</v-icon>
            <v-icon class="contact_icon">{{ svgTwitter }}</v-icon>
            <v-icon class="contact_icon">{{ svgWechat }}</v-icon>
          </p>
        </div>
        <div class="summary_part">
          <div class="summary_text">
            <h3 class="resume_title first_title">简介</h3>
            <p class="intro_text">
            <span id="year">2020</span>是葛晟从事前端工作的第二年。对于前端，他目前掌握html，css，js的相关知识和实践，熟悉前端框架vue的工作原理和运用，能够使用webpack进行项目管理，以及具备一些有利于前端开发的技能。对于后端，他能够使用python进行简单的爬虫工作，利用django搭建简单的后端项目，具有一定的数据结构和算法基础。<br>
            作为一名刚毕业的大学生，和大多数人一样，他乐于尝试新鲜事物，欣于学习前沿技术，当然也喜欢运动还有游戏。<br>
            <!-- 之前，葛晟是一名工作于<span style="color: #0195EB;">利元亨智能装备股份有限公司</span>的前端工程师。<br> -->
            现在，葛晟是一名正在寻求高就的前端工程师。</p>
          </div>
          <div class="summary_other">
            <h3 class="small_title">兴趣爱好</h3>
            <ul class="hobby">
              <li class="hobby_li">
                <v-icon>{{ svgHobby1 }}</v-icon>
                探索前端
              </li>
              <li class="hobby_li">
                <v-icon>{{ svgHobby2 }}</v-icon>
                篮球运动
              </li>
              <li class="hobby_li">
                <v-icon>{{ svgHobby3 }}</v-icon>
                资深玩家
              </li>
            </ul>
          </div>
          <div class="summary_other">
            <h3 class="small_title">教育经历</h3>
            <ul class="education">
              <li class="edu_li"><v-icon>{{ svgSchool }}</v-icon></li>
              <li class="edu_li">
                <p>计算机科学与技术，工学学士学位，2019<br>
                <span class="school">湖南工商大学</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="skills">
      <div class="summary_box">
        <div class="intro">
          <h3 class="resume_title">相关技能</h3>
        </div>
        <div class="summary_part">
          <h3 class="small_title">Vue</h3>
          <p class="skill_intro">
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
          <h3 class="small_title">Less</h3>
          <p class="skill_intro">
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
          <h3 class="small_title">Webpack</h3>
          <p class="skill_intro">
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
          </p>
          <h3 class="small_title">Django</h3>
          <p class="skill_intro">
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
          </p>
        </div>
      </div>
    </div>
    <div class="project">
      <div class="summary_box">
        <div class="intro">
          <h3 class="resume_title">项目精选</h3>
        </div>
        <div class="summary_part">
          <h3 class="small_title">EsportsGrade</h3>
          <p class="skill_intro">
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
          <h3 class="small_title">Dormitory Reservation</h3>
          <p class="skill_intro">
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
          <h3 class="small_title">DashBoard</h3>
          <p class="skill_intro">
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
          </p>
          <h3 class="small_title">Mini Game</h3>
          <p class="skill_intro">
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
          </p>
        </div>
      </div>
    </div>
    <div class="workexp">
      <div class="summary_box">
        <div class="intro">
          <h3 class="resume_title">工作经历</h3>
        </div>
        <div class="summary_part">
          <h3 class="small_title">前端开发工程师</h3>
          <p class="skill_intro">
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
          </p>
        </div>
      </div>
    </div>
    <div class="contact">
      <div class="summary_box">
        <div class="intro">
          <h3 class="resume_title">联系方式</h3>
        </div>
        <div class="summary_part">
          <h3 class="small_title">email</h3>
          <p class="skill_intro">
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
          <h3 class="small_title">phone</h3>
          <p class="skill_intro">
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
          <h3 class="small_title">github</h3>
          <p class="skill_intro">
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mdiEmail,
  mdiTwitter,
  mdiWechat,
  mdiBasketball,
  mdiSend,
  mdiGamepad,
  mdiSchool
} from '@mdi/js'
export default {
  data () {
    return {
      svgEmail: mdiEmail,
      svgTwitter: mdiTwitter,
      svgWechat: mdiWechat,
      svgHobby1: mdiSend,
      svgHobby2: mdiBasketball,
      svgHobby3: mdiGamepad,
      svgSchool: mdiSchool
    }
  },
  methods: {
    toHome () {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style scoped>
.summary {
  width: 100%;
}
.summary_box {
  width: 90%;
  text-align: center;
  margin: 100px auto 40px auto;
  overflow-x: hidden;
  overflow-y: hidden;
}
.intro {
  width: 400px;
  display: inline-block;
  text-align: center;
  vertical-align: top;
  margin-top: 150px;
}
.summary_part {
  width: 800px;
  display: inline-block;
  text-align: left;
  vertical-align: top;
}
.name {
  font-size: 35px;
}
.occupaion {
  font-size: 23px;
  color: #B0B0B0;
  line-height: 50px;
}
.webpage {
  font-size: 20px;
  color: #47E289;
  margin-bottom: 10px;
  transition: all .5s ease;
}
.webpage:hover {
  color: #FF457A;
  text-decoration: underline;
}
.contact_icon {
  color: #47E289;
  margin: 0 8px 0 8px;
  transition: all .5s ease;
}
.contact_icon:hover {
  color: #FF457A;
}
.summary_text {

}
.resume_title {
  font-size: 45px;
  font-weight: 400;
  color: #444444;
}
#year {
  font-size: 25px;
}
.intro_text {
  margin-top: 15px;
  font-size: 20px;
  font-weight: thin;
  line-height: 30px;
  color: #555555;
  text-align: justify;
}
.summary_other {
  display: inline-block;
  vertical-align: top;
  margin: 40px 0 0 0;
}
.summary_other:last-child {
  margin-left: 30%;
}
.small_title {
  font-size: 25px;
  font-weight: 600;
  color: #444444;
}
.hobby {
  margin-top: 15px;
  padding-left: 7px;
}
.hobby_li {
  line-height: 30px;
  color: #555555;
}
.education {
  margin-top: 15px;
}
.edu_li {
  display: inline-block;
  color: #555555;
  vertical-align: top;
  margin: 0 5px 0 5px;
}
.school {
  font-size: 15px;
  color: #B0B0B0;
}
.skills {
  /* background: #F7F7F7; */
  /* padding: 100px 0 100px 0; */
}
.skill_intro {
  font-size: 20px;
  margin: 10px 0 20px 0;
}
.workexp {
  /* background: #F7F7F7; */
  /* padding: 100px 0 100px 0; */
}
@media screen and (max-width: 1350px) {
  .intro {
    margin-top: 0;
  }
  .summary_box {
    margin-top: 0;
  }
  .first_title {
    display: none;
  }
  .intro {
    margin-bottom: 1vh;
  }
}
@media screen and (max-width: 910px) {
  .summary_part {
    width: 100%;
  }
}
@media screen and (max-width: 747px) {
  .summary_other {
    width: 100%;
  }
  .summary_other:last-child {
    margin-left: 0;
  }
  .hobby_li {
    display: inline;
    margin: 0 7px 0 7px;
  }
}
@media screen and (max-width: 499px) {
  .summary_other {
    width: 100%;
  }
  .summary_other:last-child {
    margin-left: 0;
  }
  .hobby_li {
    display: inline;
    margin: 0 7px 0 7px;
    font-size: 3vw;
  }
  .edu_li {
    font-size: 3vw;
  }
  .hobby_li:first-child {
    margin-left: 0;
  }
  .intro {
    width: 100%;
  }
  .name {
    font-size: 10vw;
  }
  .occupaion {
    font-size: 6vw;
  }
  .webpage {
    font-size: 4.5vw;
  }
  .resume_title {
    font-size: 8vw;
  }
  .intro_text {
    font-size: 4vw;
    line-height: 6vw;
  }
  #year {
    font-size: 6vw;
  }
  .small_title {
    font-size: 5vw;
  }
  .school {
    font-size: 2.8vw;
  }
  .skill_intro {
    font-size: 4vw;
  }
}
</style>
