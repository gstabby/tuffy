<template>
  <div class="no">
    <v-app>
      <v-banner two-line>
        <v-avatar
          slot="icon"
          color="deep-purple accent-4"
          size="40"
        >
          <v-icon
            icon="mdi-lock"
            color="white"
          >
            mdi-lock
          </v-icon>
        </v-avatar>

        抱歉您没有权限进入该系统

        <template v-slot:actions>
          <v-btn text color="deep-purple accent-4" @click="toLogin">点击返回</v-btn>
        </template>
      </v-banner>
    </v-app>
  </div>
</template>

<script>
export default {
  methods: {
    toLogin () {
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>

<style>
</style>
