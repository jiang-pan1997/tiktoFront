<template>
    <div>
        <h1>作者列表</h1>
       <p v-for="(author) in authorList" :key="author.id" @click="goAuthor(author.author)" >{{author.author}}</p>
    </div>
</template>

<script>
    export default {
        name:'AuthorList',
        created(){
            this.getAuthorList()
            this.$bus.$emit('tabShow',{tabShow:false})
        },
        data() {
            return {
                authorList:[]
            }
        },
        methods:{
          async  getAuthorList(){
            let {data:res}=await this.$http.get('/movie/getAllAuthor')
            this.authorList=res.data
            },
            goAuthor(author){
                localStorage.setItem('author',author)
                this.$router.push({
				name: 'author', params: {
					author: author
				}
			})
            },
        }
    }
</script>

<style lang="less" scoped>
p{
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    color: #000;
    margin: 0;
    border-bottom: 1px solid #000;
}
</style> 