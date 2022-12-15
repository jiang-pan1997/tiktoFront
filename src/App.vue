<template>
  <div id="app">
 <router-view></router-view>
   <Tab v-show="tabShow" :select="select" ></Tab>
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
   this.$bus.$on('tabShow',({tabShow,select})=>{
    this.tabShow=tabShow,
    this.select=select
   })
  },
  data() {
    return {
      btnStatus:true,
      bgc:'',
      tabShow:true,
      select:0,
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
