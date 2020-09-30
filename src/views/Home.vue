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
        <div class="col-xl-4 col-lg-6">
          <h3 class="welcome_text">WELCOME</h3>
          <h2 class="tuffy_text">TUFFY's LAIR</h2>
          <p class="tuffy_intro f-17">嗨，你好，我是tuffy，一名前端工作者，欢迎来到我的个人网站，这里有我的求职简历，个人博客，以及一些有趣的小玩意，祝您在此探索愉快,嗨，你好，我是tuffy，一名前端工作者，欢迎来到我的个人网站，这里有我的求职简历，个人博客，以及一些有趣的小玩意，祝您在此探索愉快,嗨，你好，我是tuffy，一名前端工作者，欢迎来到我的个人网站，这里有我的求职简历，个人博客，以及一些有趣的小玩意，祝您在此探索愉快</p>
          <button class="enter_button f-17" :style="currentTopic.buttonColor" @click="toLink(currentTopic.link)">{{ currentTopic.buttonText }}</button>
        </div>
        <div class="col-xl-4 col-lg-6" style="text-align: right;">
          <img :src='currentTopic.src' />
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
        bgColor: 'background: #1F1E1F',
        buttonColor: 'color: #1F1E1F',
        src: require('../assets/blog.svg'),
        buttonText: '心情愉悦，来读篇博客吧',
        link: '/blog'
      },
      exs: [
        {
          bgColor: 'background: #1F1E1F',
          buttonColor: 'color: #1F1E1F',
          src: require('../assets/blog.svg'),
          buttonText: '心情愉悦，来读篇博客吧',
          link: '/blog'
        },
        {
          bgColor: 'background: #0261BF',
          buttonColor: 'color: #0261BF',
          src: require('../assets/resume.svg'),
          buttonText: '心情愉悦，来阅批简历吧',
          link: '/resume'
        },
        {
          bgColor: 'background: indigo',
          buttonColor: 'color: indigo',
          src: require('../assets/ninja.svg'),
          buttonText: '心情愉悦，来玩个游戏吧',
          link: '/blog'
        }
      ]
    }
  },
  methods: {
    changeTopic (ex) {
      this.currentTopic = ex
    },
    toLink (lk) {
      this.$router.push({
        path: lk
      })
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
  animation: circle-in 1s 1s linear forwards;
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
}
.welcome_text {
  font-size: 150px;
  line-height: 100px;
  color: transparent;
  -webkit-text-stroke: #4E474F 1px;
  animation: color-in 2s 3s ease forwards;
}
.tuffy_text {
  font-size: 90px;
  font-weight: bolder;
  color: transparent;
  -webkit-text-stroke: #4E474F 1px;
  animation: color-in 2s 4s ease forwards;
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
  transform: translateX(-50%);
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
@keyframes bowen {
  0%, 100% {
    clip-path: polygon(0% 50%, 9% 42%, 23% 34%, 33% 36%, 41% 44%, 50% 54%, 57% 63%, 68% 68%, 79% 67%, 88% 63%, 98% 54%, 100% 100%, 0% 100%);
  }
  50% {
    clip-path: polygon(0% 50%, 11% 59%, 21% 67%, 32% 73%, 41% 70%, 47% 60%, 55% 50%, 65% 42%, 76% 34%, 90% 39%, 99% 54%, 100% 100%, 0% 100%);
  }
}
</style>
