<template>
  <div class="memory">
    <div class="reaction_box" @click="clickEvent">
      <div class="reaction_intro" v-show="actionCode==0">
        <img src="../assets/number.png" class="reaction_logo">
        <h3 class="reaction_title">测试记忆力</h3>
          <p class="reaction_method">
            平均每个人一次能记住七个数字，你能记住更多吗？<br>
            点击屏幕任意一处开始游戏
          </p>
      </div>
      <div class="reaction_intro" v-show="actionCode==1">
        <!-- <img src="../assets/ellipsis.png" class="reaction_logo"> -->
        <h3 class="reaction_title">{{ numBorn }}</h3>
        <div class="outer_liner">
          <div class="inner_liner" :style="per()"></div>
        </div>
          <!-- <p class="reaction_method">
            当屏幕颜色由红变绿时，尽可能快的点击屏幕<br>
            点击屏幕任意一处开始游戏
          </p> -->
      </div>
      <div class="reaction_intro" v-show="actionCode==2">
        <!-- <img src="../assets/ellipsis.png" class="reaction_logo"> -->
        <!-- <h3 class="reaction_title">请输入刚才的数字</h3> -->
        <p class="reaction_method" style="font-size: 40px;">
          Please enter the number !<br>
          <input type="text" class="number_input" v-model="numInput"><br>
          <button class="number_button" @click="submitNum">Submit</button>
        </p>
      </div>
      <div class="reaction_intro" v-show="actionCode==3">
        <p class="number_name">Number</p>
        <p class="number_req">{{ numBorn }}</p>
        <p class="number_name">Your Anwser</p>
        <p class="number_req" :style="numIsWin()">{{ numInput }}</p>
        <h3 class="level">Level {{ level }}</h3>
        <button class="number_button" v-show="!isWin" @click.stop="stopLevel">Back</button>
        <button class="number_button" v-show="isWin" @click.stop="upLevel">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    actionCode: 0,
    timeWidth: 100,
    timeOver: 2,
    numInput: '',
    numBorn: [],
    // numBornShow: '',
    level: 1,
    timer1: null,
    timer2: null,
    isWin: null
  }),
  methods: {
    enterKey (event) {
      const code = event.keyCode
        ? event.keyCode
        : event.which
          ? event.which
          : event.charCode
      if (code === 13) {
        this.submitNum()
      }
    },
    enterKeyupDestroyed () {
      document.removeEventListener('keyup', this.enterKey)
    },
    enterKeyup () {
      document.addEventListener('keyup', this.enterKey)
    },
    clickEvent () {
      switch (this.actionCode) {
        case 0:
          this.actionCode = 1
          this.bornNum()
          break
      }
    },
    per () {
      return 'width: ' + this.timeWidth + 'px;' + 'transition: all ease ' + this.timeOver + 's;'
    },
    submitNum () {
      if (this.numInput.length === 0 || this.numInput === null) {
        this.actionCode = 2
      } else {
        if (this.numInput === this.numBorn) {
          this.isWin = true
          this.actionCode = 3
        } else {
          this.isWin = false
          this.actionCode = 3
        }
      }
      this.timeWidth = 100
    },
    bornNum () {
      this.numBorn = []
      for (let i = 0; i < this.level; i++) {
        this.numBorn.push(parseInt(Math.random() * (9 - 0 + 1) + 0, 10))
      }
      this.numBorn = this.numBorn.join('')
    },
    numIsWin () {
      if (!this.isWin) {
        return 'color: black;text-decoration: line-through;'
      }
    },
    stopLevel () {
      this.numInput = ''
      this.actionCode = 0
      this.level = 1
      this.timeOver = 2
    },
    upLevel () {
      this.numInput = ''
      this.level += 1
      this.timeOver = 2 + 0.5 * this.level
      // this.timeOver = 1
      this.actionCode = 1
      this.bornNum()
    }
  },
  watch: {
  },
  updated () {
    if (this.actionCode === 1) {
      if (this.timer1 === null) {
        this.timer1 = setTimeout(() => {
          this.timeWidth = 0
          clearTimeout(this.timer1)
          this.timer1 = null
        }, 0)
      }
      if (this.timer2 === null) {
        this.timer2 = setTimeout(() => {
          this.actionCode = 2
          clearTimeout(this.timer2)
          this.timer2 = null
        }, this.timeOver * 1000)
      }
    }
  },
  mounted () {
    // 绑定enter事件
    this.enterKeyup()
  },
  destroyed () {
    // 销毁enter事件
    this.enterKeyupDestroyed()
  }
}
</script>

<style scoped>
.reaction_box {
  width: 100%;
  height: calc(100vh - 64px);
  background: #9B95BA;
}
.reaction_intro {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
}
.reaction_title {
  font-size: 80px;
  font-weight: 400;
  margin-bottom: 20px;
  -moz-user-select:none; /*火狐*/
  -webkit-user-select:none; /*webkit浏览器*/
  -ms-user-select:none; /*IE10*/
  -khtml-user-select:none; /*早期浏览器*/
  user-select:none;
}
.reaction_method {
  font-size: 25px;
  line-height: 45px;
}
.outer_liner {
  width: 100px;
  height: 5px;
  background: #226CBB;
  margin: 0 auto;
}
.inner_liner {
  height: 5px;
  background: white;
}
.number_input {
  margin-top: 40px;
  width: 1000px;
  height: 70px;
  background: #8b82bd;
  border-radius: 30px;
  text-align: center;
  color: white;
}
.number_input:focus {
  outline: none;
}
.number_button {
  margin-top: 30px;
  background: #ecd469;
  font-size: 20px;
  width: 120px;
  height: 50px;
  border-radius: 30px;
  color: #272727;
  font-weight: bold;
  transition: all ease .3s;
}
.number_button:focus {
  outline: none;
}
.number_button:hover {
  background: white;
}
.number_name {
  opacity: .6;
  font-size: 40px;
  margin-bottom: 10px;
}
.number_req {
  color: white;
  font-size: 48px;
  transition: all ease .5s;
}
.level {
  margin-top: 50px;
  font-size: 120px;
}
@media screen and (max-width: 1080px) {
  .number_input {
    width: 90vw;
  }
}
</style>
