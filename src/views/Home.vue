<template>
  <div id="home">
    <div class="start_box">
      <div class="start_title_box">
        <h1 class="start_title start_title_on">Tuffy</h1>
        <h1 class="start_title start_title_back">Tuffy</h1>
      </div>
    </div>
    <div class="home_box container-fluid" :style="currentTopic.bgColor">
      <div class="row row-vertical-center justify-content-center" style="height: 100vh;">
        <div class="col-xl-4 col-lg-4 col-sm-7">
          <h3 class="welcome_text">WELCOME</h3>
          <h2 class="tuffy_text">TUFFY's LAIR</h2>
          <p class="tuffy_intro f-17">嗨，您好，我是tuffy，一名前端工作者，欢迎来到我的个人网站，这里有我的求职简历，个人博客，以及一些有趣的玩意，祝您在此探...，哦！还有，差点忘了，点击下方的星球（它们分别是地球，土星和太阳）可以进入我的个人网站不同的区域，请尽情探索这片“星系”吧，如果愿意的话，欢迎注册游玩！</p>
          <button class="enter_button f-17" :style="currentTopic.buttonColor" @click="toLink(currentTopic.link)">{{ currentTopic.buttonText }}</button>
        </div>
        <div class="col-xl-4 col-lg-4 col-sm-2" style="text-align: right;">
          <img :src='currentTopic.src' class="big_img" />
        </div>
      </div>
      <div class="exchange_box">
        <ul class="exchange_ul">
          <li class="exchange_li" v-for="(ex, index) in exs" :key="index" @click="changeTopic(ex)">
            <img :src="ex.src" class="exchange_img" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data () {
    return {
      currentTopic: {
        bgColor: 'background: #115920',
        buttonColor: 'color: #115920',
        src: require('../assets/地球.svg'),
        buttonText: '心情愉悦，来读篇博客吧',
        link: '/blog'
      },
      exs: [
        {
          bgColor: 'background: #115920',
          buttonColor: 'color: #115920',
          src: require('../assets/地球.svg'),
          buttonText: '心情愉悦，来读篇博客吧',
          link: '/blog'
        },
        {
          bgColor: 'background: #914C12',
          buttonColor: 'color: #914C12',
          src: require('../assets/土星.svg'),
          buttonText: '心情愉悦，来阅批简历吧',
          link: '/resume'
        },
        {
          bgColor: 'background: #FD7C2E',
          buttonColor: 'color: #FD7C2E',
          src: require('../assets/太阳.svg'),
          buttonText: '心情愉悦，来玩个游戏吧',
          link: 'game'
        }
      ]
    }
  },
  methods: {
    changeTopic (ex) {
      this.currentTopic = ex
    },
    toLink (lk) {
      if (lk === 'game') {
        window.location.href = 'http://tuffy.viphk.ngrok.org/game/'
      } else {
        this.$router.push({
          path: lk
        })
      }
    }
  }
}
</script>

<style scoped>
button:focus {
  outline: 0;
}
.start_box {
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 1000;
  background: #39323A;
  color: white;
  display: flex;
  justify-content: center;
  animation: circle-out ease-in-out 2s 1.3s forwards;
}
.start_title_box {
  align-self: center;
  justify-self: center;
  width: 220px;
  height: 110px;
  animation: up-in .8s linear;
}
.start_title {
  font-weight: bolder;
  font-size: 90px;
  user-select: none;
  -webkit-user-select: none;
  position: absolute;
}
.start_title_on {
  color: transparent;
  -webkit-text-stroke: #4E474F 1px;
}
.start_title_back {
  clip-path: circle(0% at 0% 0%);
  animation: circle-in 1.7s .5s linear forwards;
}
@keyframes up-in {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes circle-in {
  0% {
    clip-path: circle(0% at 0% 0%);
  }
  /* 50% {
    clip-path: circle(150% at 0% 0%);
  } */
  100% {
    clip-path: circle(150% at 0% 0%);
  }
}
@keyframes circle-out {
  0% {
    clip-path: circle(100% at 50% 50%);
  }
  /* 80% {
    clip-path: circle(3% at 50% 50%);
  }
  90% {
    clip-path: circle(10% at 50% 50%);
  } */
  100% {
    clip-path: circle(0% at 50% 50%);
  }
}
.home_box {
  height: 100vh;
  color: white;
  /* font-family: Helvetica; */
  transition: background 1s ease;
}
.row-vertical-center {
  display: flex;
  align-items: center;
  cursor: default;
}
.welcome_text {
  font-size: 150px;
  line-height: 100px;
  color: transparent;
  /* -webkit-text-stroke: #4E474F 1px; */
  animation: color-in 2s 3s ease forwards;
  cursor: default;
  transition: all ease .5s;
}
.tuffy_text {
  font-size: 90px;
  font-weight: bolder;
  color: transparent;
  /* -webkit-text-stroke: #4E474F 1px; */
  animation: color-in 2s 4s ease forwards;
  cursor: default;
  transition: all ease .5s;
}
@keyframes color-in {
  0% {
    color: transparent;
    /* clip-path: circle(200% at 50% 50%); */
  }
  100% {
    color: white;
    /* clip-path: circle(0% at 50% 50%); */
  }
}
.tuffy_intro {
  width: 800px;
  text-align: justify;
  margin: 30px 0;
  transition: all ease .5s;
}
.enter_button {
  padding: 10px 30px;
  border: none;
  background: white;
  color: #1F1E1F;
  border-radius: 40px;
  font-weight: bold;
  letter-spacing: 1px;
  transition: color 1s ease;
}
.exchange_box {
  position: absolute;
  bottom: 30px;
  margin: 0 auto;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  text-align: center;
}
.exchange_li {
  display: inline-block;
  margin: 0 20px;
  transition: all .7s ease;
  cursor: pointer;
}
.exchange_li:hover {
  transform: translateY(-20px);
}
.exchange_img {
  width: 90px;
  height: 90px;
}
.big_img {
  animation: upordown ease 7s infinite forwards;
}
@keyframes upordown {
  0% {
    transform: translateY(-100px) scale(1);
  }
  50% {
    transform: translateY(0) scale(.95);
  }
  100% {
    transform: translateY(-100px) scale(1);
  }
}
@media screen and (max-width: 1900px) {
  .welcome_text {
    font-size: 120px;
    line-height: 90px;
  }
  .tuffy_text {
    font-size: 80px
  }
  .tuffy_intro {
    width: 700px;
  }
  .big_img {
    width: 800px;
    height: 800px;
  }
}
@media screen and (max-width: 1600px) {
  .welcome_text {
    font-size: 110px;
    line-height: 80px;
  }
  .tuffy_text {
    font-size: 60px
  }
  .tuffy_intro {
    width: 600px;
  }
  .big_img {
    width: 700px;
    height: 700px;
  }
}
@media screen and (max-width: 1400px) {
  .welcome_text {
    font-size: 90px;
    line-height: 70px;
  }
  .tuffy_text {
    font-size: 60px
  }
  .tuffy_intro {
    width: 500px;
  }
  .big_img {
    width: 600px;
    height: 600px;
  }
}
@media screen and (max-width: 1200px) {
  .welcome_text {
    font-size: 80px;
    line-height: 60px;
  }
  .tuffy_text {
    font-size: 50px
  }
  .tuffy_intro {
    width: 450px;
  }
  .big_img {
    width: 500px;
    height: 500px;
  }
}
@media screen and (max-width: 1030px) {
  .welcome_text {
    font-size: 70px;
    line-height: 50px;
  }
  .tuffy_text {
    font-size: 40px
  }
  .tuffy_intro {
    width: 400px;
    font-size: 10px;
  }
  .big_img {
    width: 500px;
    height: 500px;
  }
}
@media screen and (max-width: 575px) {
  .welcome_text {
    font-size: 70px;
  }
  .tuffy_text {
    font-size: 40px;
  }
  .tuffy_intro {
    width: 100%;
    font-size: 10px;
  }
  .big_img {
    width: 500px;
    height: 500px;
    display: none;
  }
  .exchange_img {
    width: 70px;
    height: 70px;
  }
}
@media screen and (max-width: 350px) {
  .welcome_text {
    font-size: 50px;
    line-height: 30px;
  }
  .tuffy_text {
    font-size: 30px;
  }
  .exchange_img {
    width: 50px;
    height: 50px;
  }
}
</style>
