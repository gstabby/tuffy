<template>
  <div class="reaction">
    <div class="reaction_box" :style="colorAction(actionCode)" @click="clickEvent">
      <div class="reaction_intro" v-show="actionCode==0">
        <img src="../assets/lightning.png" class="reaction_logo">
        <h3 class="reaction_title">测试反应力</h3>
          <p class="reaction_method">
            当屏幕颜色由红变绿时，尽可能快的点击屏幕<br>
            点击屏幕任意一处开始游戏
          </p>
      </div>
      <div class="reaction_intro" v-show="actionCode==1">
        <!-- <img src="../assets/ellipsis.png" class="reaction_logo"> -->
        <h3 class="reaction_title">等待绿色...</h3>
          <!-- <p class="reaction_method">
            当屏幕颜色由红变绿时，尽可能快的点击屏幕<br>
            点击屏幕任意一处开始游戏
          </p> -->
      </div>
      <div class="reaction_intro" v-show="actionCode==2">
        <!-- <img src="../assets/ellipsis.png" class="reaction_logo"> -->
        <h3 class="reaction_title">点击!!!</h3>
          <!-- <p class="reaction_method">
            当屏幕颜色由红变绿时，尽可能快的点击屏幕<br>
            点击屏幕任意一处开始游戏
          </p> -->
      </div>
      <div class="reaction_intro" v-show="actionCode==3">
        <img src="../assets/exclamatory.png" class="reaction_logo">
        <h3 class="reaction_title">你点的太快啦!!!</h3>
          <!-- <p class="reaction_method">
            当屏幕颜色由红变绿时，尽可能快的点击屏幕<br>
            点击屏幕任意一处开始游戏
          </p> -->
      </div>
      <div class="reaction_intro" v-show="actionCode==4">
        <img src="../assets/time.png" class="reaction_logo">
        <h3 class="reaction_title">{{ reactionTime }}ms</h3>
        <p class="reaction_method">
          点击屏幕继续测试<br>
          平均成绩: {{ average }}ms
          测试次数: {{ times }} / 5
        </p>
      </div>
      <div class="reaction_intro" v-show="actionCode==5">
        <img src="../assets/lightning.png" class="reaction_logo">
        <h3 class="reaction_title">测试完成!!!</h3>
        <p class="reaction_method">
          您的平均反应时间为{{ average }}ms<br>
          再次点击屏幕返回游戏初始界面<br>
          下图是您的反应力测试曲线
        </p>
        <v-sparkline
          style="margin-top: 20px;"
          :value="reactionTime_arr"
          :gradient="gradient"
          :smooth="radius || false"
          :padding="padding"
          :line-width="width"
          :stroke-linecap="lineCap"
          :gradient-direction="gradientDirection"
          :fill="fill"
          :type="type"
          :auto-line-width="autoLineWidth"
          :show-labels="true"
          label-size="11"
          auto-draw
        ></v-sparkline>
      </div>
    </div>
  </div>
</template>

<script>
const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea'],
  ['#ffffff']
]
export default {
  data: () => ({
    actionCode: 0,
    timer: null,
    startTime: null,
    endTime: null,
    reactionTime: null,
    reactionTime_arr: [],
    average: null,
    all: null,
    times: 0,
    width: 1,
    radius: 10,
    padding: 8,
    lineCap: 'round',
    gradient: gradients[6],
    gradientDirection: 'top',
    gradients,
    fill: false,
    type: 'trend',
    autoLineWidth: false
  }),
  methods: {
    colorAction (actionCode) {
      switch (actionCode) {
        case 0:
          return 'background: #62C1E2'
        case 1:
          return 'background: #CC4436'
        case 2:
          return 'background: #4BDB6A'
        case 3:
          return 'background: #62C1E2'
        case 4:
          return 'background: #62C1E2'
        case 5:
          return 'background: #E55D87'
      }
    },
    clickEvent () {
      switch (this.actionCode) {
        case 0:
          this.actionCode = 1
          break
        case 1:
          this.actionCode = 3
          break
        case 2:
          this.endTime = new Date().getTime()
          this.reactionTime = this.endTime - this.startTime
          this.reactionTime_arr.push(this.reactionTime)
          this.all = 0
          for (const i of this.reactionTime_arr) {
            this.all = this.all + i
          }
          this.times = this.reactionTime_arr.length
          this.average = parseInt(this.all / this.reactionTime_arr.length)
          this.actionCode = 4
          break
        case 3:
          this.actionCode = 1
          break
        case 4:
          this.reactionTime_arr.length < 5 ? this.actionCode = 1 : this.actionCode = 5
          break
        case 5:
          this.reactionTime_arr = []
          this.actionCode = 0
          break
      }
    }
  },
  watch: {
    actionCode () {
      const randomTime = parseFloat(Math.random() * (10 - 3 + 1) + 3, 10) * 200
      if (this.actionCode === 1) {
        this.timer = setTimeout(() => {
          this.actionCode = 2
          this.startTime = new Date().getTime()
        }, randomTime)
      }
      if (this.actionCode !== 1) {
        clearTimeout(this.timer)
        this.timer = null
      }
    }
  }
}
</script>

<style scoped>
.reaction_box {
    -moz-user-select:none; /*火狐*/
    -webkit-user-select:none; /*webkit浏览器*/
    -ms-user-select:none; /*IE10*/
    -khtml-user-select:none; /*早期浏览器*/
    user-select:none;
    width: 100%;
    height: calc(100vh - 64px);
    background: #2B87D1;
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
}
.reaction_method {
    font-size: 25px;
    line-height: 45px;
}
</style>
