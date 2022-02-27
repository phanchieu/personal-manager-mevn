<template>
  <section class="SignIn">
    <div class="home">
      <a href="/">
        <img src="../../../assets/home.png" alt="" />
      </a>
    </div>
    <div class="bgr_log">
      <div class="log">
        <div class="box">
          <div class="left"></div>
        </div>
        <div class="right">
          <form class="Form_log">
            <h1 class="textLog">Login</h1>
            <div class="user_pass">
              <input
                id="username"
                v-model="loginUser.username"
                type="username"
                placeholder="Username"
                autocomplete="off"
                required
              />

              <input
                id="password"
                v-model="loginUser.password"
                type="password"
                placeholder="Password"
                autocomplete="off"
                required
              />

              <div class="box_error">
                <transition name="fade">
                  <div class="error" v-if="error != null">{{ error }}</div>
                </transition>
              </div>
            </div>

            <button class="btn_log" @click="handleLogin">Login</button>

            <span class="sgup_now">
              Not a member?
              <router-link to="/sign-up">Register now</router-link>
            </span>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { getListUsers } from '@/apis/User.js';
  import { getListRoles } from '@/apis/Role.js';

  export default {
    name: 'SignIn',
    data() {
      return {
        roles: [],
        users: [],
        loginUser: {
          username: '',
          password: '',
        },
        error: null,
        show: true,
      };
    },
    async beforeCreate() {
      //get list users
      this.users = await getListUsers();

      //get list roles
      this.roles = await getListRoles();
    },
    methods: {
      handleLogin(e) {
        e.preventDefault();
        const { username, password } = this.loginUser;

        if (!username || !password) {
          this.error = 'Please enter an account or password!';
        } else if (username && password) {
          const existUser = this.users.find((user) => {
            if (username == user.username || username == user.email) {
              if (password != user.password) this.error = 'Account or password is incorrect!';
              else {
                this.error = null;
                return user;
              }
            }
          });

          if (!this.error) {
            if (!existUser) {
              this.error = 'Account is not resigned!';
            } else if (existUser) {
              // Xét role để lấy quyền truy cập
              const getRole = this.roles.find((role) => {
                if (existUser && role._id == existUser.role._id) return role;
              });

              if (getRole && !this.error) {
                localStorage.setItem('mevn', JSON.stringify(existUser));
                if (getRole.name == 'Employee') {
                  this.$router.push('/profile');
                } else {
                  this.$router.push('/admin');
                }
              }
            }
          }
        }
      },
    },
  };
</script>

<style scoped>
  * {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
  }
  .home a img {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 60px;
    height: 60px;
    box-shadow: 1px 3px 2px rgb(0, 0, 0, 0.2);
    border-radius: 50%;
    transition: all ease-in-out 0.3s;
    z-index: 100;
  }

  .home a img:hover {
    width: 65px;
    height: 65px;
  }

  .box_error {
    margin-top: 10px;
    height: 20px;
  }

  .error {
    color: red;
    margin-top: 0px;
    display: inline-block;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.6s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  input:focus {
    outline: none !important;
    border: 3px solid rgba(97, 62, 223, 0.7) !important;
  }
  .bgr_log {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to right, #9097c5, #e4c6de);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .box {
    overflow: hidden;
    width: 50%;
    height: 470px;
    border-radius: 2%;
    margin: 15px;
  }
  .left {
    background-image: url('../../../assets/images/img_login/img_login.jpg');
    background-size: cover;
    border-radius: 2%;
    width: 410px;
    height: 470px;
    float: left;
    animation: zoomInOut 7s linear infinite;
    z-index: -1;
  }

  @keyframes zoomInOut {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
  .Form_log {
    margin: 15px;
    float: right;
    text-align: center;
    width: 350px;
    height: 470px;
    position: absolute;
    top: 50%;
    left: 70%;
    transform: translate(-40%, -50%);
  }
  .log {
    width: 810px;
    height: 500px;
    background-color: white;
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .textLog {
    font-size: 30px;
    display: block;
  }
  .user_pass #username,
  #password {
    width: 100%;
    height: 50px;
    font-size: 17px;
    margin-top: 30px;
    outline: none;
    border: 1px solid #d3d3d3;
    border-bottom: 3px solid #d3d3d3;
    border-radius: 5px;
    padding: 0px 10px;
  }
  a {
    text-decoration: none;
  }
  .Forgot {
    float: left;
    padding: 4px 5px;
    line-height: 30px;
    color: #8000ff;
  }
  .Forgot:hover {
    color: #420fb6;
  }
  .btn_log {
    width: 100%;
    height: 50px;
    background: rgb(160, 81, 252);
    border-radius: 5px;
    color: white;
    font-size: 22px;
    border: transparent;
    margin: 20px 0px;
    cursor: pointer;
    transition: opacity 0.4s linear;
    will-change: opacity;
  }
  .btn_log:hover {
    opacity: 0.5;
  }
  .sgup_now a {
    color: #8000ff;
    padding: 10px 0px;
  }
  .sgup_now:hover a {
    color: #420fb6;
  }
  /* reponsive */
  @media only screen and (max-width: 768px) {
    .Form_log {
      margin: 0px;
      width: 500px;
      height: 600px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .left {
      display: none;
    }
    .log {
      width: 600px;
      height: 800px;
    }
  }
  @media only screen and (max-width: 640px) {
    .Form_log {
      margin: 0px;
      width: 450px;
      height: 600px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .left {
      display: none;
    }
    .log {
      width: 500px;
      height: 700px;
    }
  }
  @media only screen and (max-width: 414px) {
    .Form_log {
      width: 330px;
      height: 500px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .left {
      display: none;
    }
    .log {
      width: 350px;
      height: 550px;
    }
  }
  @media only screen and (max-width: 375px) {
    .Form_log {
      width: 330px;
      height: 500px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .left {
      display: none;
    }
    .log {
      width: 350px;
      height: 550px;
    }
  }
  @media only screen and (max-width: 320px) {
    .Form_log {
      margin: 0px;
      width: 280px;
      height: 430px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .left {
      display: none;
    }
    .log {
      width: 300px;
      height: 450px;
    }
    .user_pass #username,
    #password,
    .btn_log {
      width: 100%;
      height: 50px;
    }
  }
</style>
