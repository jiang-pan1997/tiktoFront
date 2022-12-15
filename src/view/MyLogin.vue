<template>
  <div class="login-app" :style="{ height: windowsHeight + 'px' }">
    <div id="loginDiv" style="height: 350px">
      <form action="" id="form">
        <h1 id="loginMsg">LOGIN IN</h1>
        <p>
          Username:<input id="username" name="username" type="text" v-model="username" />
        </p>

        <p>
          Password:<input id="password" name="password" type="password" v-model="password" />
        </p>
        <p>Remember:<input id="remember" name="remember" type="checkbox" /></p>
        <div id="subDiv">
          <input type="submit" class="button" value="登陆" @click.prevent="login" />&nbsp;&nbsp;&nbsp;
          <input type="reset" class="button" value="重置" />&nbsp;&nbsp;&nbsp;
          <a href="register.html">没有账号？</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyLogin",
  created() {
    this.$bus.$emit('tabShow',{tabShow:false})
  },
  data() {
    return {
      username: "",
      password: "",
      windowsHeight: window.innerHeight,
      windowsWidth: window.innerWidth,
    };
  },
  methods: {
    async login() {
      let param = new URLSearchParams();
      param.append("username", this.username);
      param.append("password", this.password);

      const { data: res } = await this.$http({
        method: "post",
        url: "/user/login",
        data: param,
      });
      console.log(res);
      if (res.code === 1) {
        localStorage.setItem("token", res.data);
        this.$router.push("/index");
      }

    },
  },
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}

html {
  height: 100%;
  width: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.login-app {
  overflow: hidden;
  padding: 15%;
  background: url(../assets/index.jpg) no-repeat 0px 0px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#loginDiv {
  width: 37%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 380px;
  background-color: rgba(75, 81, 95, 0.3);
  box-shadow: 7px 7px 17px rgba(52, 56, 66, 0.5);
  border-radius: 5px;
}

#name_trip {
  margin-left: 50px;
  color: red;
}

p {
  margin-top: 30px;
  margin-left: 20px;
  color: azure;
}

#remember {
  margin-left: 15px;
  border-radius: 5px;
  border-style: hidden;
  background-color: rgba(216, 191, 216, 0.5);
  outline: none;
  padding-left: 10px;
  height: 20px;
  width: 20px;
}

#username {
  width: 200px;
  margin-left: 15px;
  border-radius: 5px;
  border-style: hidden;
  height: 30px;
  background-color: rgba(216, 191, 216, 0.5);
  outline: none;
  color: #f0edf3;
  padding-left: 10px;
}

#password {
  width: 202px;
  margin-left: 15px;
  border-radius: 5px;
  border-style: hidden;
  height: 30px;
  background-color: rgba(216, 191, 216, 0.5);
  outline: none;
  color: #f0edf3;
  padding-left: 10px;
}

.button {
  border-color: cornsilk;
  background-color: rgba(100, 149, 237, 0.7);
  color: aliceblue;
  border-style: hidden;
  border-radius: 5px;
  width: 100px;
  height: 31px;
  font-size: 16px;
}

#subDiv {
  text-align: center;
  margin-top: 30px;
}

#loginMsg {
  text-align: center;
  color: aliceblue;
}

#errorMsg {
  text-align: center;
  color: red;
}

.app {
  width: 100%;
  height: 100%;
}
</style>
