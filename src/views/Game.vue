<template>
  <div class="game">
    <div class="game_box" v-for="game in gameArr" :key="game.id" :style="game.color" @click="toRoute(game.route)">
      <h3 class="game_title">{{ game.name }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    gameArr: [
      {
        id: 0,
        name: 'Reaction',
        color: 'background: #62C1E2',
        route: '/game/reaction'
      },
      {
        id: 1,
        name: 'Memory',
        color: 'background: #9B95BA',
        route: '/game/memory'
      },
      {
        id: 2,
        name: 'Typing',
        color: 'background: #DE628B',
        route: '/game/reaction'
      }
    ]
  }),
  methods: {
    toRoute (route) {
      this.$router.push({
        path: route
      })
    }
  }
}
</script>

<style scoped>
.game {
  display: flex;
  height: calc(100vh - 64px);
  flex-direction: column;
}
.game_box {
  position: relative;
  flex: 1;
  width: 100vw;
  transition: all ease .5s;
  cursor: pointer;
}
.game_box:hover .game_title{
  font-size: 90px;
}
.game_title {
  position: absolute;
  font-size: 80px;
  color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all ease .5s;
}
</style>
