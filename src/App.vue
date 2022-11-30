<template>
  <div id="app">
 <first-nav></first-nav>
 <Tab></Tab>
 <Index></Index>
  </div>
</template>

<script>
import Tab from '@/components/Tab.vue'
import FirstNav from '@/components/FirstNav.vue'
import Index from '@/view/Index.vue'
export default {
  name:'',
  components:{
    Tab,
    FirstNav,
    Index,
  },
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
