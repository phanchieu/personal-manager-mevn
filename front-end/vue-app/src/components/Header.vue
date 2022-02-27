<template>
  <!-- ====================================NAVBAR============================= -->
  <nav>
    <h1>
      <router-link to="/" class="logo-imagine">
        <img src="@/assets/logo.png" alt="MEVN" />
      </router-link>
    </h1>
    <div class="container" style="width: 940px">
      <ul class="menu-one">
        <li><router-link to="/">Home</router-link></li>
        <li><a href="#imagine-features">Features</a></li>
        <li>
          <a href="#about">
            About Us
            <i class="fas fa-angle-down"></i>
          </a>
          <ul class="menu-two">
            <li><a href="#">More free Templates</a></li>
            <li><a href="#our-team">Our Team</a></li>
            <li>
              <a href="#">
                More Links
                <i class="fas fa-angle-right"></i>
              </a>
              <ul class="menu-three">
                <li><a href="#">Menu One</a></li>
                <li><a href="#">Menu Two</a></li>
                <li><a href="#">Menu Three</a></li>
              </ul>
            </li>
          </ul>
        </li>
        <li><a href="#list-testimonials">Testimonials</a></li>
        <li><a href="#blog-posts">Blog</a></li>
        <li><a href="#adress">Adress Us</a></li>
        <li v-if="!isLogin"><router-link to="/sign-in" class="login-form">Login</router-link></li>
        <li v-else class="profile">
          <div class="avatar" @click="dropDownToggle()">
            <img :src="avatar" alt="" />
          </div>
          <div class="drop-down" v-show="isDropdownOpening">
            <div class="arrow"></div>
            <ul>
              <li>
                <button @click="$router.push('/profile')" style="color: #000">Profile</button>
              </li>
              <li v-if="role.name && (role.name === 'Admin' || role.name === 'Manager')">
                <button @click="$router.push('/admin')" style="color: #000">Admin</button>
              </li>
              <li><button @click="handleLogout">Sign Out</button></li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </nav>
  <!-- ====================================NAVBAR============================= -->
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isDropdownOpening: false,
      isLogin: localStorage.getItem('mevn'),
      avatar: '@/assets/avatar.png',
      role: '',
    };
  },
  created() {
    if (this.isLogin) {
      const user = JSON.parse(localStorage.getItem('mevn'));
      const avatar = user.avatarUrl || '@/assets/avatar.png';
      this.avatar = avatar;
      this.role = user.role;
    }
  },
  methods: {
    dropDownToggle() {
      this.isDropdownOpening = !this.isDropdownOpening;
    },
    handleLogin() {
      this.$router.push('/sign-in');
    },
    handleLogout() {
      localStorage.removeItem('mevn');
      this.$router.push('/sign-in');
    },
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  line-height: 1.7;
}
.container {
  width: 1109px;
  margin: 0 auto;
}
a {
  text-decoration: none;
}
li {
  list-style: none;
}
h3 {
  color: #000;
  font-size: 40px;
  font-weight: 900;
}
.btn {
  color: white;
  line-height: 1.5;
  font-size: 16px;
  font-weight: normal;
  border-radius: 30px;
  border: 2px solid #4285f4;
  padding: 15px 38px;
  border-width: 2px;
  background: #4285f4;
  position: relative !important;
  position: absolute;
  top: 0px;
}
.btn:hover {
  box-shadow: 0 5px 30px -5px rgb(66 133 244 / 70%);
  transition: ease 0.6s;
  top: -2px;
}
/* <!-- ====================================NAVBAR============================= --> */

nav {
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999999999;
  box-shadow: 6px 0 20px 0px rgb(0 0 0 / 20%);
}

nav h1 .logo-imagine {
  float: left;
  width: 90px;
  height: 68px;
  padding: 4px 0;
  margin-left: 60px;
}

h1 .logo-imagine img {
  width: 100%;
  height: 70px;
  object-fit: contain;
}
.menu-three,
.menu-two {
  box-shadow: 4px 0 20px -4px rgb(0 0 0 / 20%);
}
/* ===========menu-one=========== */
.menu-one {
  padding-left: 30px;
  display: flex;
  justify-content: space-between;
}
.menu-one > li {
  display: inline-block;
}
.menu-one > li + li {
  margin-left: 15px;
}
.menu-one > li:nth-child(3) {
  position: relative;
}
.menu-one > li:nth-child(3) a i {
  margin-left: 4px;
}
.menu-one > li:not(li:last-child) > a {
  padding: 15px 20px;
  color: #000000;
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 78px;
  text-transform: uppercase;
}
/* .menu-one >li >a:focus {
    color: #4285f4;
  } */
.menu-one > li .login-form {
  padding: 10px 25px;
  line-height: 58px;
  background-color: #4285f4;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  color: white;
  text-transform: uppercase;
  cursor: pointer;
}

/* =============sau khi loggin thành công thì hiện avatar============= */
.profile {
  position: absolute;
  right: -100px;
  top: 0;
  width: auto;
  height: 78px;
  z-index: 999999999999999;
}
.profile .avatar {
  width: 60px;
  height: 60px;
  margin: auto 0px;
  position: relative;
  position: absolute;
  top: 0;
  right: 138px;
  bottom: 0;
  cursor: pointer;
}
.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
.profile .drop-down {
  padding-top: 10px;
  width: 160px;
  height: auto;
  background-color: white;
  box-shadow: 4px 2px 20px 2px rgb(0 0 0 / 20%);
  position: absolute;
  top: calc(100% + 10px);
  right: 120px;
}
.drop-down .arrow {
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 10px solid white;
  border-top: 0px solid transparent;
  position: absolute;
  top: -10px;
  right: 32px;
}

.drop-down ul {
  text-align: center;
}

.drop-down ul li button {
  width: 100%;
  border: none;
  outline: none;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: bold;
  line-height: 60px;
  background-color: white;
}
.drop-down ul li button:hover {
  background-color: #f4f5f9;
  cursor: pointer;
}
/* =============sau khi loggin thành công thì hiện avatar============= */
.menu-one > li .login-form:hover {
  opacity: 0.9;
  color: white;
}
.menu-one > li:not(li:last-child):hover .menu-two {
  display: block;
}
/* ===========menu-two=========== */
.menu-two > li:nth-child(3) a i {
  margin-left: 40px;
}
.menu-two,
.menu-three {
  display: none;
  border-top: 2px solid #4285f4;
}
.menu-two {
  min-width: 190px;
  background-color: white;
  position: absolute;
  top: 86%;
  left: 0;
}
.menu-two > li {
  position: relative;
}
.menu-two li a {
  padding: 10px 26px 10px 20px;
  display: block;
  color: #000;
}
.menu-two > li:first-child > a {
  color: #4285f4;
}
.menu-two li a:hover {
  background-color: #f4f5f9;
}
.menu-two > li:hover .menu-three {
  display: block;
}
/* ===========menu-three=========== */
.menu-three {
  background-color: white;
  min-width: 190px;
  position: absolute;
  top: 0;
  left: 100%;
}
nav::after {
  content: ' ';
  clear: both;
}
/* <!-- ====================================NAVBAR============================= --> */
</style>
