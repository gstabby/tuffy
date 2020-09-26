<template>
  <div id="home">
    <div class="first_back">
      <div class="title_box">
        <h1 class="home_title first_title">Tuffy</h1>
        <h1 class="home_title first_title">Tuffy</h1>
      </div>
      <div class="second_back"></div>
    </div>
    <div class="upback">
      <div class="container">
        <div class="avator_box" @click="toLogin">
          <img class="avator_tuffy" src="../assets/tuffy.jpg">
        </div>
        <h2 class="home_title">Tuffy's Lair</h2>
        <h3 class="small_title">无论何时，记得勇敢</h3>
        <div class="split_line"></div>
        <p class="intro">Hello，我叫Tuffy（头像那只小老鼠也叫这个名字）职业是一名前端工作者</p>
        <div class="split_line short_line"></div>
        <p class="page_intro">这是我独立开发的个人网站，里面有我的相关信息，以及我的随笔博客，当然还有一些有趣的玩意儿，十分乐意您来探索</p>
        <div class="split_line"></div>
        <div class="route">
          <ul class="route_ul">
            <li class="route_li" @click="toBlog">随笔</li>
            <li class="route_li" @click="toResume">简历</li>
            <li class="route_li" @click="toGame">小游戏</li>
          </ul>
        </div>
        <div class="link">
          <span class="number">186-8469-8316</span>
          <v-icon class="email">{{ svgEmail }}</v-icon>
          <v-icon class="email">{{ svgTwitter }}</v-icon>
          <v-icon class="email">{{ svgWechat }}</v-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mdiEmail, mdiTwitter, mdiWechat } from '@mdi/js'
// @ is an alias to /src
export default {
  name: 'Home',
  components: {},
  data () {
    return {
      svgEmail: mdiEmail,
      svgTwitter: mdiTwitter,
      svgWechat: mdiWechat
    }
  },
  methods: {
    toBlog () {
      this.$router.push({
        path: '/blog'
      })
    },
    toResume () {
      this.$router.push({
        path: '/resume'
      })
    },
    toGame () {
      this.$router.push({
        path: '/game'
      })
    },
    toLogin () {
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>

<style scoped>
#home {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
/* .back {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #AF3C29;
  opacity: .5;
  z-index: 1;
} */
.first_back {
  width: 100vw;
  height: 100vh;
  display: flex;
  background: #6ABADC;
  z-index: 10;
  position: absolute;
  animation: goout 1s linear;
  animation-delay: 2.5s;
  animation-fill-mode: forwards;
  overflow: hidden;
}
@keyframes goout {
  from {
    width: 100vw;
    /* opacity: 1; */
  }
  50% {
    /* opacity: 0.5; */
  }
  to {
    width: 0vw;
    /* opacity: 0; */
  }
}
.title_box {
  margin: 0 auto;
  position: absolute;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  z-index: 20;
  /* animation: stay 1s linear;
  animation-delay: 0.5s;
  animation-fill-mode: forwards; */
}
@keyframes stay {
  from {
    transform: translateX(0vw);
  }
  to {
    transform: translateX(50vw);
  }
}
.first_title {
  font-size: 50px;
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  animation-name: bounce, comeon;
  animation-duration: 2s, .5s;
  animation-delay: 2.5s, 0;
  animation-fill-mode: forwards, forwards;
}
@keyframes bounce {
  0% {
    transform: translate(0);
  }
  50% {
    transform: translate(-15px, -150px);
  }
  75% {
    font-size: 70px;
  }
  100% {
    font-size: 50px;
    transform: translate(-15px, -150px);
    opacity: 0;
  }
}
@keyframes comeon {
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.second_back {
  position: absolute;
  z-index: 10;
  left: 50%;
  width: 1px;
  display: flex;
  overflow: hidden;
  background: #83d6f1;
  animation-name: height, width;
  animation-duration: 1s, 1s;
  animation-delay: .5s, 1.5s;
  animation-fill-mode: forwards, forwards;
  -webkit-animation-name: height, width;
  -webkit-animation-duration: 1s, 1s;
  -webkit-animation-delay: .5s, 1.5s;
  -webkit-animation-fill-mode: forwards, forwards;
}
@keyframes height {
  from {
    top: 50%;
    height: 0;
  }
  to {
    top: 0;
    height: 100vh;
  }
}
@keyframes width {
  from {
    left: 50%;
    width: 1px;
  }
  to {
    left: 0;
    width: 100vw;
  }
}
.upback {
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to bottom left, #E55D87, #5FC3E4);
  background-size: 200% 100%;
  position: absolute;
  z-index: 5;
  animation: flow 5s linear forwards;
  display: flex;
  /*垂直排列*/
  flex-direction: column;
  align-items:center;/*由于flex-direction: column，因此align-items代表的是水平方向*/
  justify-content: center;/*由于flex-direction: column，因此justify-content代表的是垂直方向*/
}
@keyframes flow {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 0;
  }
}
.container {
  width: 40%;
  /* min-width: 734px; */
  text-align: center;
  background: rgba(255, 255, 255, 0.048) border-box;
  box-shadow: 0 0 0 1px hsla(0,0%,100%,.3) inset,0 .5em 1em rgba(0,0,0,0.6);
  text-shadow: 0 1px 1px hsla(0,0%,100%,.3);
  z-index: 5;
  opacity: 0;
  animation: comeon 1s linear;
  animation-delay: 3s;
  animation-fill-mode: forwards;
  border-radius: 10px;
}
.avator_box {
  position: relative;
  margin: 1vh auto;
  width: 74px;
  height: 74px;
  border-radius: 100%;
  border: 4px solid white;
  overflow: hidden;
}
.avator_tuffy {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  vertical-align: middle;
}
.home_title {
  color: #FFFFF5;
  margin-top: 2vh;
  /* font-size: 40px; */
  line-height: 2vh;
  font-weight: 400;
  letter-spacing: 0px;
  font-size: 50px;
}
.small_title {
  font-size: 18px;
  font-weight: 100;
  color: #dddddd;
  line-height: 7vh;
  letter-spacing: 0px;
}
.intro {
  margin: 15px 0 15px 0;
  color: #FFFFF5;
  line-height: 3vh;
}
.page_intro {
  margin: 20px 0 20px 0;
  color: #FFFFF5;
  line-height: 3vh;
}
.split_line {
  margin: 0 auto;
  width: 300px;
  height: 1px;
  background: #FFFFF5;
  opacity: .4;
}
.short_line {
  width: 100px;
}
.route {
  margin-top: 1.4vh;
}
.route_li {
  display: inline-block;
  color: #dddddd;
  margin: 0 10px 0 10px;
  width: 80px;
  height: 30px;
  line-height: 30px;
}
.route_li:hover {
  color: white;
}
.link {
  margin: 1.2vh 0 1.2vh 0;
}
.number {
  color: #FFFFF5;
  margin-right: 20px;
}
.email {
  color: white;
  transition: all .5s ease;
  margin: 0 5px 0 5px;
  cursor: pointer;
}
.email:hover {
  opacity: .6;
}
@media screen and (max-width: 1500px) {
  .container {
    width: 60%;
  }
}
@media screen and (max-width: 1160px) {
  .container {
    width: 80%;
  }
}
@media screen and (max-width: 600px) {
  .home_title {
    font-size: 7vw;
  }
}
@media screen and (max-width: 451px) {
  .container {
    width: 80%;
    font-size: 3vw;
  }
  .home_title {
    font-size: 5vw;
  }
  .small_title {
    font-size: 2vw;
  }
  .split_line {
    width: 93%;
  }
  .short_line {
    width: 50%;
  }
  .route_li {
    width: 25%;
  }
}
@media screen and (max-width: 321px) {
  .route_li {
    width: 20%;
  }
  .number {
    margin-right: 2vw;
  }
}
</style>
