<template>
  <div id="app">
 <router-view></router-view>
   <Tab ></Tab>
  </div> 
</template>

<script>
import Tab from '@/components/Tab.vue'
export default {
  name:'',
  components:{
    Tab
  },
  created(){
   localStorage.setItem('indexPage',0)
   localStorage.removeItem('indexList')
  },
  data() {
    return {
      btnStatus:true,
      bgc:'',
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
