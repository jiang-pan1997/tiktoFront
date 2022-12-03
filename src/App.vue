<template>
  <div id="app">
 <router-view></router-view>
   <button v-if="btnStatus" @click="goIndex">去主页</button>
  </div> 
</template>

<script>

export default {
  name:'',
  created(){
//  this.goIndex()
  },
  data() {
    return {
      btnStatus:true
    }
  },
  methods:{
    goIndex(){
      this.$router.push('/index')
      this.btnStatus=false
    }
  }
}
</script>

<style lang="less" scoped>
   #app{
    width: 100%;
    height: 100%;
   }
   body,html{
    width: 100%;
    height: 100%;
   }
</style>
